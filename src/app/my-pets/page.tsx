"use client"

import { useEffect, useState } from "react"
import Headertop from "@/components/headertop"
import Footer from "@/components/footer"
import Image from "next/image"
import "./my-pets.css"
import { LoaderSpinner } from "@/components/loader"
import { MY_PET_LIST, PET_DELETE } from "@/constants/constants"
import useAuthCheck from "@/hooks/authentication"
import { useRouter } from "next/navigation"
import useToast from "@/hooks/helperToast"
import Link from "next/link"
import useInfiniteScroll from "react-infinite-scroll-hook"
import { Modal } from 'flowbite-react';
import '../media_screen.css'

export default function Page() {
  useAuthCheck()

  const router = useRouter()
  const { showSuccessToast, showErrorToast } = useToast()
  const [pets, setPets] = useState([])
  const [totalPets, setTotalPets] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [petToDelete, setPetToDelete] = useState(null)

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      console.log("Loading more pets...")
      if (!loading && hasNextPage) {
        fetchPets(page)
      }
    },
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  })

  useEffect(() => {
    setLoading(true)
    fetchPets(1)
  }, [])

  const fetchPets = async (pageNumber) => {
    if (pageNumber > 1 && !hasNextPage) return;

    console.log(totalPets, rootRef, infiniteRef);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        return;
      }

      const queryParams = new URLSearchParams({
        page: `${pageNumber}`,
        perPage: "10",
      });

      const response = await fetch(`${MY_PET_LIST}?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pet list");
      }

      const res = await response.json();
      if (res.status === 200) {
        if (res.meta) {
          setTotalPets(res.meta);
          const currentTotal = pets.length;
          const newTotal = currentTotal + (res.data?.length || 0);
          setHasNextPage(newTotal < res.meta);
        }

        if (res.data && res.data.length > 0) {
          setPets((prevPets) => (pageNumber === 1 ? res.data : [...prevPets, ...res.data]));
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasNextPage(false);
        }
      }
    } catch (err) {
      setError(err.message);
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (petId) => {
    try {
      const jsonData = {
        id: petId.toString(),
      }
      const token = localStorage.getItem("token")
      if (!token) {
        showErrorToast("No token found")
        return
      }

      const response = await fetch(`${PET_DELETE}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })

      if (!response.ok) {
        throw new Error("Failed to delete pet")
      }

      const result = await response.json()
      if (result.status === 200) {
        showSuccessToast(result.msg)
        setPets(pets.filter((pet) => pet.id !== petId))
        setShowDeletePopup(false)
      } else {
        showErrorToast(result.msg)
        setShowDeletePopup(false)
      }
    } catch (err) {
      console.error("Error deleting pet:", err)
      setError("Failed to delete pet.")
    }
  }

  return (
    <>
      <Headertop />
      <div className="subpage_header">
        <Image
          width={500}
          height={500}
          src="/images/subpage_header.jpg"
          alt="image"
          className="w-full h-60 object-cover"
        />
      </div>

      <div className="w-full py-8 md:py-14 float-start">
        <div className="container mx-auto p-4">
          <h2 className="text-2xl md:text-3xl lg:text-5xl text-primary mb-5">My Pets</h2>

          <div className="w-full">
            <div className="text-right mb-6">
              <button className="bg-button hover:bg-green-700 text-white px-6 py-2 rounded-full"
                onClick={() => router.push('/add-pet')}
              >
                Add Pet
              </button>
            </div>

            {loading ? (
              <LoaderSpinner />
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : pets.length === 0 ? (
              <div className="flex justify-center items-center flex-col">
                <Image
                  src="/images/no-data-found.png"
                  alt="No pets found"
                  width={200}
                  height={200}
                  className="mb-4"
                />
                <p>No pets found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pets.map((pet) => (
                  <div key={pet.id} className="bg-white border shadow-lg p-4 rounded-lg flex flex-wrap md:flex-nowrap items-center justify-between pets-box1">
                    <div className="flex items-center space-x-0 md:space-x-4 flex-wrap md:flex-nowrap w-full md:w-auto md:justify-between justify-center">
                      <Image
                        src={pet.pet_profile_image || "/images/default-pet.jpg"}
                        alt={pet.pet_name}
                        className="w-36 h-24 rounded-lg object-cover"
                        width={100}
                        height={100}
                      />
                      <div className='w-full md:w-auto text-center md:text-left'>
                        <p className="text-xl font-bold">{pet.pet_name}</p>
                        <p>{pet.breed} | {pet.gender} | {pet.size.size}</p>
                      </div>
                    </div>
                    <div className="w-full md:w-auto mt-2 md:mt-0 flex items-center space-x-2 md:justify-between justify-center">
                      <Link
                        href={`/pet-details?id=${btoa(String(pet.id))}`}
                      >
                        <button className="cursor-pointer flex items-center justify-center bg-[#69D400] w-10 h-10 text-white rounded-full hover:bg-green-700">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                      </Link>

                      <Link
                        href={`/edit-pet?id=${btoa(String(pet.id))}`}
                      >
                        <button className="cursor-pointer flex items-center justify-center bg-[#69D400] w-10 h-10 text-white rounded-full hover:bg-green-700">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </Link>
                      <button
                        className="cursor-pointer flex items-center justify-center bg-red-500 w-10 h-10 text-white rounded-full hover:bg-red-700"

                        onClick={() => {
                          setPetToDelete(pet.id)
                          setShowDeletePopup(true)
                        }}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {hasNextPage && (
              <div ref={infiniteRef}>
                {loading && <LoaderSpinner />}
              </div>
            )}

          </div>
        </div>
      </div>

      <Modal show={showDeletePopup} size='md' onClose={() => setShowDeletePopup(false)}>
        <Modal.Header className='py-2 close_but'>Delete pet</Modal.Header>
        <Modal.Body>
          <div className="logout_modal_text">
            <p>Are you sure you want<br /> to delete?</p>
          </div>

          <div className="logout_modal_button_area">
            <button onClick={() => setShowDeletePopup(false)} className="but_style1_line mx-1">No</button>
            <button onClick={() => handleDelete(petToDelete)} className="but_style1 mx-1">Yes</button>
          </div>
        </Modal.Body>
      </Modal>

      <Footer />
    </>
  );
}