"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// interface PetCategory {
//   id: number;
//   pet_name: string;
//   image: string;
//   slug: string;
// }

interface PetService {
  id: number;
  service_name: string;
  description: string;
  image: string;
}

interface Props {
  petServices: PetService[];
 // petCategory: PetCategory[];
}

export default function PetServicesTabs({ petServices }: Props) {

  // const [activeTab, setActiveTab] = useState<number>(petCategory[0]?.id || 0);

  //localStorage.setItem("pet_id",JSON.stringify(petCategory[0]?.id));

  // const handleSelect = (id: number) => {
  //   setActiveTab(id);
  //   localStorage.setItem("pet_id", JSON.stringify(id));
  //   console.log(activeTab, id)
  // };


  const handleSelectedService = (petServices: PetService[], selectedService: PetService) => {
    if (localStorage.getItem('services')) {
      localStorage.removeItem('services');
    }
    localStorage.removeItem("pet_id");
    localStorage.setItem("services", JSON.stringify(petServices));
    localStorage.setItem("service_id", String(selectedService.id));
  };
  

  return (
    <div className="w-full service_tab_section">
      {/* Tabs Navigation */}
      {/* <div className="flex justify-center nav-pills">
        {petCategory.map((pets) => (
          <button
            key={pets.id}
            id={`tab${pets.id}`}
            className={`tab-button px-4 py-2 text-sm font-medium text-gray-600 flex items-center space-x-2 ${activeTab == pets.id ? "active" : ""
              }`}
            onClick={() => handleSelect(pets.id)}
          >
            <span>{pets.pet_name}</span>
            <Image
              src={pets.image}
              alt={pets.pet_name}
              width={50}
              height={30}
            />
          </button>
        ))}
      </div> */}

      {/* Tab Content */}
      <div className="tab-content mt-4">
        <div
          id="content"
          className="content-active"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {petServices.map((service) => (
              <Link
                href="/search"
                key={service.id}
                className="home_service_box1"
                onClick={() => handleSelectedService(petServices,service)}
              >
                <div className="img_area">
                  <Image
                    src={service.image}
                    alt={service.service_name}
                    width={500}
                    height={300}
                  />
                </div>
                <div className="text_area">
                  <h2>{service.service_name}</h2>
                  <p>{service.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
