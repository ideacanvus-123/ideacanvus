'use client';

import React, { useState, useEffect } from "react";
import Headertop from '@/components/headertop';
import Footer from '@/components/footer';
import Image from "next/image";
import './about-us.css';
import Counter from '@/components/counter';
import { LoaderSpinner } from '@/components/loader';
import { ABOUT_US_FETCH } from "@/constants/constants";
import '../media_screen.css';

interface AboutUsPoints {
    title: string;
    count: number;
}
  
interface AboutUs {
    content: string;
    title: string;
    image: string;
    about_us_points: AboutUsPoints[];
}

export default function Page() {
    const [aboutUs, setAboutUs] = useState<AboutUs | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchAboutUs() {
            try {
                const response = await fetch(ABOUT_US_FETCH);

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const res = await response.json();
                setAboutUs(res.data);
            } catch (error) {
                console.error("Error fetching about us:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchAboutUs();
    }, []);

    return (
        <>
            <Headertop />
            <div className="subpage_header">
                <Image
                    width={1920}
                    height={400}
                    src="/images/subpage_header.jpg"
                    alt="Subpage header"
                    className="w-full h-60 object-cover"
                />
            </div>

            <div className="w-full py-8 md:py-14 float-start">
                <div className="container mx-auto p-4">
                    <h2 className="text-2xl md:text-3xl lg:text-5xl text-primary">About us</h2>

                    <div className="flex flex-wrap w-full mt-5">
                        <div className="w-full md:w-1/2">
                            <Image
                                width={500}
                                height={500}
                                src={aboutUs?.image || "/images/about_img.jpg"}
                                alt="About us"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-0 md:p-8 my-10 flex flex-col justify-center">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4">
                                {aboutUs?.title || "Best Agency For Your Pet"}
                            </h2>
                            {loading ? (
                                <div><LoaderSpinner /></div>
                            ) : (
                                <p
                                    className="text-gray-600 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: aboutUs?.content || "Content not available." }}
                                ></p>
                            )}
                        </div>
                    </div>

                    <div className="p-10 rounded-lg flex flex-col md:flex-row justify-around text-center text-white mt-14 about_count_area_bg">
                        {aboutUs?.about_us_points?.map((point, index) => (
                            <div key={index} className="mb-6 md:mb-0">
                                <p className="text-2xl md:text-3xl lg:text-5xl font-extrabold">
                                    <Counter from={1} to={point.count} />
                                </p>
                                <p className="uppercase tracking-wide">{point.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
