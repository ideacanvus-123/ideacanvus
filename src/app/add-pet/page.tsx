'use client';
import React, { useEffect, useState } from 'react';
import * as z from 'zod';
import Headertop from '@/components/headertop';
import Footer from '@/components/footer';
import Image from 'next/image';
import { PET_ADD_REQUIREMENT_LIST, PET_ADD_UPDATE, PET_PROFILE_IMAGE, PET_GALLERY_IMAGE } from '@/constants/constants';
import useAuthCheck from "@/hooks/authentication";
import { useRouter } from "next/navigation";
import useToast from "@/hooks/helperToast";
import './add-pet.css';
import { Datepicker } from 'flowbite-react';
import '../media_screen.css';
// import moment from 'moment';


const schema = z.object({
  id: z.string().optional(),
  pet_name: z.string()
    .min(1, { message: "Pet's name is required" })
    .regex(/^[a-zA-Z0-9]+([ ]?[a-zA-Z0-9]+)*$/, { message: "Pet's name cannot start with a space or contain special characters" })
    .max(150, { message: 'Pet name cannot be more than 150 characters' }),
  pet_id: z.string().min(1, { message: "Pet type is required" }),
  breed: z.string()
    .min(1, { message: "Breed is required" })
    .regex(/^[a-zA-Z0-9]+([ ]?[a-zA-Z0-9]+)*$/, { message: "Breed cannot start with a space or contain special characters" })
    .max(150, { message: 'Breed cannot be more than 150 characters' }),
  gender: z.string().min(1, { message: "Gender is required" }),
  pet_size_id: z.string().min(1, { message: "Size is required" }),
  dob: z.date().nullable().refine(date => date !== null && date.getTime() !== new Date(0).getTime(), {
    message: "Date of birth is required",
  }),
  adoption_date: z.date().nullable().refine(date => date !== null && date.getTime() !== new Date(0).getTime(), {
    message: "Adoption date is required",
  }),

  description: z.string().min(1, { message: "Description is required" }).max(250, { message: 'Description cannot be more than 250 words' }),
  profile_image: z.string().min(1, { message: "Profile image is required" }),
  gallery_images: z.array(z.string()).min(1, { message: "At least one gallery image is required" }).max(10, { message: "Maximum 10 gallery images allowed" }),
});


type FormData = z.infer<typeof schema>;

export default function Page() {
  useAuthCheck();
  const router = useRouter();
  const { showSuccessToast, showErrorToast } = useToast();
  const [pets, setPets] = useState([]);
  const [sizes, setPetSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingGallery, setuploadingGallery] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    pet_name: "",
    pet_id: "",
    breed: "",
    gender: "",
    pet_size_id: "",
    dob: null,
    adoption_date: null,
    description: "",
    profile_image: "",
    gallery_images: [],
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    const fetchRequirementList = async () => {
      try {
        const response = await fetch(`${PET_ADD_REQUIREMENT_LIST}`);
        if (!response.ok) {
          throw new Error('Failed to fetch pet list');
        }
        const res = await response.json();
        if (res.status == 200 && res.data) {
          setPets(res.data.petCategory);
          setPetSizes(res.data.petSizes);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequirementList();
  }, []);

  const validateForm = (): boolean => {
    const result = schema.safeParse(formData);
    if (!result.success) {
      const errors = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      setFormErrors(errors);
      return false;
    }
    setFormErrors({});
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    const jsonData = {
      ...formData,
      gallery_images: formData.gallery_images || []
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(PET_ADD_UPDATE, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });

      if (!response.ok) {
        throw new Error('Failed to add/update pet');
      }

      const result = await response.json();
      if (result.status == 200) {
        showSuccessToast(result.msg);
        router.push("/my-pets");
      } else {
        showErrorToast(result.msg);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));

  // };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: undefined }))
  }


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'profile_image' | 'gallery_images') => {
    if (e.target.files && e.target.files.length > 0) {
      if (field === 'gallery_images' && e.target.files.length > 10) {
        showErrorToast('You can upload a maximum of 10 images.');
        return;
      }

      if (e.target.files && (field === 'gallery_images' && e.target.files.length > 10 || Array.from(e.target.files).some(file => !['jpg', 'jpeg', 'png', 'webp'].includes(file.name.split('.').pop()?.toLowerCase() || '')))) {
        return showErrorToast('Only JPG, JPEG, PNG, WEBP allowed.');
      }


      setuploadingGallery(true);
      setError(null);

      const formData = new FormData();

      if (field === 'profile_image') {
        formData.append('file', e.target.files[0]);
      } else {
        Array.from(e.target.files).forEach((file) => {
          formData.append('pet_gallery_image', file);
        });
      }

      try {
        const token = localStorage.getItem('token');
        const endpoint = field === 'profile_image' ? PET_PROFILE_IMAGE : PET_GALLERY_IMAGE;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${field === 'profile_image' ? 'profile image' : 'gallery images'}`);
        }

        const result = await response.json();
        if (result.status === 200 && result.data) {
          if (field === 'profile_image') {
            setFormData(prev => ({ ...prev, [field]: result.data }));
            setFormErrors((prev) => ({ ...prev, [field]: undefined }))
          } else {
            setFormData(prev => ({
              ...prev,
              [field]: [...prev[field], ...result.data]
            }));
            setFormErrors((prev) => ({ ...prev, [field]: undefined }))
          }
        } else {
          throw new Error(result.message || `Failed to upload ${field === 'profile_image' ? 'profile image' : 'gallery images'}`);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setuploadingGallery(false);
      }
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== index)
    }));

  };

  return (
    <body>
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
          <h2 className="text-2xl md:text-3xl lg:text-5xl text-primary mb-5">Add Pet</h2>

          <form onSubmit={onSubmit}>
            <div className="w-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="w-full h-64 bg-gray-300 rounded-lg relative flex items-center justify-center">
                    <Image
                      width={500}
                      height={500}
                      src={formData.profile_image || "/images/default-pet.jpg"}
                      alt="Pet Profile"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <label htmlFor="profile_image" className="absolute top-4 right-4 bg-button w-10 h-10 rounded-full text-white hover:bg-green-700 flex items-center justify-center cursor-pointer">
                      <i className="fa-solid fa-camera"></i>
                    </label>
                    <input
                      type="file"
                      id="profile_image"
                      onChange={(e) => handleFileChange(e, 'profile_image')}
                      className="hidden"
                      accept="image/*"

                    />
                  </div>
                  {formErrors.profile_image && <p className="text-red-500 mt-1">{formErrors.profile_image}</p>}
                </div>

                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-2xl text-button">Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium">Pet  Name*</label>
                      <input
                        name="pet_name"
                        value={formData.pet_name}
                        onChange={handleInputChange}
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                        placeholder="Name"
                        maxLength={150}
                        autoComplete='off'
                      />
                      {formErrors.pet_name && <p className="text-red-500 mt-1">{formErrors.pet_name}</p>}
                    </div>

                    <div>
                      <label className="block font-medium">Pets*</label>
                      <select
                        name="pet_id"
                        value={formData.pet_id}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                      >
                        <option value="" selected hidden disabled>Select Pet</option>
                        {pets.map(pet => (
                          <option key={pet.id} value={pet.id}>{pet.pet_name}</option>
                        ))}
                      </select>
                      {formErrors.pet_id && <p className="text-red-500 mt-1">{formErrors.pet_id}</p>}
                    </div>

                    <div>
                      <label className="block font-medium">Breed*</label>
                      <input
                        name="breed"
                        value={formData.breed}
                        onChange={handleInputChange}
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                        placeholder="Breed"
                        maxLength={150}
                        autoComplete='off'
                      />
                      {formErrors.breed && <p className="text-red-500 mt-1">{formErrors.breed}</p>}
                    </div>

                    <div>
                      <label className="block font-medium">Gender*</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                      >
                        <option value="" selected hidden disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="trans-gender">Trans-gender</option>
                      </select>
                      {formErrors.gender && <p className="text-red-500 mt-1">{formErrors.gender}</p>}
                    </div>

                    <div>
                      <label className="block font-medium">Size*</label>
                      <select
                        name="pet_size_id"
                        value={formData.pet_size_id}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-3 mt-1"
                      >
                        <option value="" selected hidden disabled>Select Size</option>
                        {sizes.map(size => (
                          <option key={size.id} value={size.id}>{size.size}</option>
                        ))}
                      </select>
                      {formErrors.pet_size_id && <p className="text-red-500 mt-1">{formErrors.pet_size_id}</p>}
                    </div>
                  </div>

                  <h2 className="text-2xl text-button">Description</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium">DOB*</label>
                      <div className="relative">
                        {/* <input
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          type="date"
                          max={new Date().toISOString().split("T")[0]}  
                          className="w-full border border-gray-300 rounded-lg p-3"
                          
                        /> */}

                        <Datepicker
                          name="dob"
                          value={formData.dob && formData.dob.getTime() !== 0 ? formData.dob : null}
                          onChange={(date) => {
                            setFormData((prev) => ({
                              ...prev,
                              dob: date || null, 
                            }))
                            setFormErrors((prev) => ({
                              ...prev,
                              dob: undefined, 
                            }))
                          }}
                          className="input w-full"
                          maxDate={new Date()}
                          showTodayButton={false}
                          showClearButton={false}
                          placeholder="Select Date of Birth"
                        />

                      </div>
                      {formErrors.dob && <p className="text-red-500 mt-1">{formErrors.dob}</p>}
                    </div>


                    <div>
                      <label className="block font-medium">Adoption Date*</label>
                      <div className="relative">
                        {/* <input
                          name="adoption_date"
                          value={formData.adoption_date}
                          onChange={handleInputChange}
                          type="date"
                          max={new Date().toISOString().split("T")[0]}
                          className="w-full border border-gray-300 rounded-lg p-3"
                        /> */}

                        <Datepicker
                          name="dob"
                          value={formData.adoption_date && new Date(formData.adoption_date) !== new Date(0) ? new Date(formData.adoption_date) : null}
                          // value={null || new Date(formData.adoption_date)}
                          // onChange={(date) => setFormData(prev => ({ ...prev, adoption_date: date ? date.toISOString() : '' }))}
                          onChange={(date) => {
                            setFormData((prev) => ({
                              ...prev,
                              adoption_date: date || null, 
                            }))
                            setFormErrors((prev) => ({
                              ...prev,
                              adoption_date: undefined,
                            }))
                          }}


                          className="input w-full"
                          maxDate={new Date()}
                          showTodayButton={false}
                          showClearButton={false}
                          placeholder="Select Adoption date"

                        />



                      </div>
                      {formErrors.adoption_date && <p className="text-red-500 mt-1">{formErrors.adoption_date}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-medium">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg p-3 mt-1 h-32"
                        placeholder="Description"
                        maxLength={250}
                      ></textarea>
                      {formErrors.description && <p className="text-red-500 mt-1">{formErrors.description}</p>}
                    </div>
                  </div>

                  <h2 className="text-2xl text-button">Gallery</h2>

                  <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {formData.gallery_images.map((imagePath, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={imagePath || "/placeholder.svg"}
                            alt={`Gallery Image ${index + 1}`}
                            width={100}
                            height={100}
                            className="w-full h-36 md:h-36 object-contain rounded-lg shadow border"
                          />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 text-sm"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      ))}

                      {formData.gallery_images && formData.gallery_images.length == 0 && <span className="text-black-500 mt-1">No images added</span>}

                    </div>

                    {formData.gallery_images.length < 10 && (
                      <div className="mt-2 flex items-center justify-end">
                        <label htmlFor="gallery_images" className="flex items-center text-button font-extrabold px-6 py-2 rounded-lg cursor-pointer">
                          {uploadingGallery ? (
                            'Uploading.....'
                          ) : (
                            <>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M16 12l-4-4m0 0l-4 4m4-4v12" />
                              </svg>
                              Upload New Image
                            </>
                          )}
                        </label>

                        <input
                          type="file"
                          id="gallery_images"
                          onChange={(e) => handleFileChange(e, 'gallery_images')}
                          className="hidden"
                          accept="image/*"
                          multiple
                        />
                      </div>
                    )}
                    {formErrors.gallery_images && <p className="text-red-500 mt-1">{formErrors.gallery_images}</p>}

                    <div className="mt-6 flex items-center justify-between">
                      <button
                        type="submit"
                        className="bg-button text-white px-6 py-2 rounded-full shadow hover:bg-primary"
                        disabled={loading}
                      >
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                    </div>

                    {error && (
                      <div className="mt-4 text-red-500">
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </body>
  );
}

