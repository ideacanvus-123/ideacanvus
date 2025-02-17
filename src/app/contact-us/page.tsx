'use client';

import React, { useEffect, useState } from "react";
import Headertop from '@/components/headertop';
import Footer from '@/components/footer';
import Image from "next/image";
import { LoaderSpinner } from '@/components/loader';
import ContactUsForm from '@/components/ContactUsForm';
import { ADMIN_CONTACT_DETAILS } from "@/constants/constants";
import './contact-us.css';
import '../media_screen.css';

interface adminContactData {
    id: number,
    contact_email: string,
    address: string,
    phone: string,
    linkedin_link: string,
    behance_link: string,
    twitter_link: string,
}

export default function Page() {
    const [adminContactData, setAdminContact] = useState<adminContactData | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        fetch(ADMIN_CONTACT_DETAILS)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch footer data. Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log(data.data,"sssss")
              
                    setAdminContact(data.data);
                    console.log(adminContactData,"s")
            
                
            })
            .catch((err) => {
                setError(err.message);
                console.log(error)
            });
    }, []);

    return (
        <body>
            <Headertop />
            <div className="subpage_header">
                <Image width={500} height={500} src="../images/subpage_header.jpg" alt="image" className="w-full h-60 object-cover" />
            </div>
            <div className="w-full py-8 md:py-14 float-start">
                <div className="container mx-auto p-4 pb-0">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-primary">Contact Us </h2>

                    <div className="flex flex-col md:flex-row bg-white rounded-lg gap-6 mt-4">
                        <div className="flex-1">
                            <h2 className="text-2xl mb-6">Stay Connected</h2>


                            <div className="flex space-x-4 mb-6">
                              
                                <a href={adminContactData?.linkedin_link} target="_blank" rel="noopener noreferrer" className="bg-button text-white w-10 h-10 rounded-full flex items-center justify-center">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a href={adminContactData?.twitter_link} target="_blank" rel="noopener noreferrer" className="bg-button text-white w-10 h-10 rounded-full flex items-center justify-center">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href={adminContactData?.behance_link} target="_blank" rel="noopener noreferrer" className="bg-button text-white w-10 h-10 rounded-full flex items-center justify-center">
                                    <i className="fas fa-basketball-ball"></i>
                                </a>
                            </div>


                            <div className="space-y-4">
                                <div className="bg-white p-4 rounded-lg flex items-center shadow-lg border border-[#d0d0d0]">
                                    <div className="bg-[#E4F3D4] text-button w-10 h-10 rounded-full flex items-center mr-4 justify-center">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl">Our Address</p>
                                        <p className="text-sm">{adminContactData?.address}</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg flex items-center shadow-lg  border border-[#d0d0d0">
                                    <div className="bg-[#E4F3D4] text-button w-10 h-10 rounded-full flex items-center mr-4 justify-center">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl">Our Email</p>
                                        <p className="text-sm">{adminContactData?.contact_email}</p>
                                    </div>
                                </div>

                                <div className="bg-white p-4 rounded-lg flex items-center shadow-lg  border border-[#d0d0d0">
                                    <div className="bg-[#E4F3D4] text-button w-10 h-10 rounded-full flex items-center mr-4 justify-center">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl">Our Phone</p>
                                        <p className="text-sm">{adminContactData?.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <iframe
                                className="w-full h-96 rounded-lg shadow"
                                src={`https://maps.google.com/maps?q=${encodeURIComponent(adminContactData?.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>

                    </div>
                    <ContactUsForm />
                </div>
            </div>
            <div className="contact_bottom">
                <Image width={500} height={500} src="../images/contact_bottom.jpg" alt="image" className="w-full h-66 min-h-60 object-cover" />
            </div>

            <Footer />
        </body>
    );
}

