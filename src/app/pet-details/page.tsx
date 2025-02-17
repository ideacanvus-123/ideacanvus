'use client'
import React, { Suspense, useState, useEffect } from 'react';
import Headertop from '@/components/headertop';
import Footer from '@/components/footer';
import Image from 'next/image';
import './pet-details.css';
import Gallery from "@/components/Gallery";
import { useSearchParams } from 'next/navigation';
import { PET_DETAILS } from '@/constants/constants';
import { LoaderSpinner } from '@/components/loader';
import '../media_screen.css'

interface PetDetails {
    pet_info: {
        pet_name: string;
        breed: string;
        gender: string;
        type: string;
        size: { size: string };
        dob: string;
        pet: { pet_name: string };
        adoption_date: string;
        description: string;
        pet_profile_image: string;
    };
    gallery: { file: string }[];
}

function fetchPetDetailsData(encodedId: string | null): Promise<PetDetails | null> {
    return new Promise(async (resolve, reject) => {
        try {
            if (!encodedId) {
                reject('Invalid Pet ID');
                return;
            }

            const id = atob(encodedId);
            const token = localStorage.getItem('token');

            if (!token) {
                reject('Authentication token not found');
                return;
            }

            const queryParams = new URLSearchParams({ id }).toString();
            const res = await fetch(`${PET_DETAILS}?${queryParams}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch pet details');
            }

            const data = await res.json();

            if (data.status === 200 && data.data) {
                resolve(data.data);
            } else {
                reject('Failed to fetch pet details');
            }
        } catch (err) {
            reject(err instanceof Error ? err.message : 'An error occurred');
        }
    });
}

const PetDetailsWrapper = () => {
    const searchParams = useSearchParams();
    const encodedId = searchParams.get('id');

    const [petDetails, setPetDetails] = useState<PetDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const details = await fetchPetDetailsData(encodedId);
                setPetDetails(details);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load pet details');
            } finally {
                setLoading(false);
            }
        };

        if (encodedId) {
            fetchDetails();
        }
    }, [encodedId]);

    if (loading) {
        return <LoaderSpinner />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!petDetails) {
        return <div>Pet not found</div>;
    }

    return <PetDetailsPage pet={petDetails} />;
};

const PetDetailsPage = ({ pet }: { pet: PetDetails }) => {
    return (
        <Suspense fallback={<LoaderSpinner />}>
        <div>
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
                    <h2 className="text-2xl md:text-3xl lg:text-5xl text-primary">{pet.pet_info.pet_name}</h2>
                    <div className="w-full mt-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1">
                                <div className="w-full h-64 bg-gray-300 rounded-lg relative flex items-center justify-center">
                                    <Image
                                        width={500}
                                        height={500}
                                        src={pet.pet_info.pet_profile_image || "/placeholder.svg"}
                                        alt={pet.pet_info.pet_name}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-6">
                                <div className="w-full">
                                    <div className="flex justify-between items-center mb-4">
                                        <p className="text-xl font-semibold text-black">
                                            {pet.pet_info.breed}
                                            <span className="text-black border-l-2 border-l-secondary pl-2 ml-2">
                                                {pet.pet_info.gender}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <p className="text-gray-800 text-2xl font-extrabold">Description</p>
                                        <p className="text-gray-600 text-sm mt-2">{pet.pet_info.description}</p>
                                    </div>

                                    <div className="border-t border-b border-gray-200 py-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                                            <span>Gender</span>
                                            <span className="font-medium text-gray-800">{pet.pet_info.gender}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                                            <span>Pets</span>
                                            <span className="font-medium text-gray-800">{pet.pet_info.pet.pet_name}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                                            <span>Size</span>
                                            <span className="font-medium text-gray-800">{pet.pet_info.size.size}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                                            <span>Breed</span>
                                            <span className="font-medium text-gray-800">{pet.pet_info.breed}</span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                                            <span>DOB</span>
                                            <span className="font-medium text-gray-800">
                                                {new Date(pet.pet_info.dob).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>Adoption Date</span>
                                            <span className="font-medium text-gray-800">
                                                {new Date(pet.pet_info.adoption_date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    <Gallery images={pet.gallery} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
        </Suspense>
    );
};

export default function Page() {
   
    return (
        <Suspense fallback={<LoaderSpinner />}>
            <PetDetailsWrapper />
        </Suspense>
    );
}
