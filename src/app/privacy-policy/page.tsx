"use client";
import { useState, useEffect } from "react";
import Headertop from "@/components/headertop";
import Footer from "@/components/footer";
import Image from "next/image";
import "./privacy-policy.css";
import { LoaderSpinner } from '@/components/loader';
import { CMS_DETAILS } from "@/constants/constants";
import '../media_screen.css'


export default function Page() {

    const [privacypolicyContent, setTermsContent] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchPrivacyPolicy() {
            try {
                const response = await fetch(`${CMS_DETAILS}?type=privacy_policy`);

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const res = await response.json();
                console.log(res.data?.content)
                setTermsContent(res.data?.content);
            } catch (error) {
                console.error("Error fetching privacy policy:", error);
                setTermsContent("Error loading content.");
            } finally {
                setLoading(false);
            }
        }

        fetchPrivacyPolicy();
    }, []);

    return (
        <body>
            <Headertop />
            <div className="subpage_header">
                <Image width={500} height={500} src="/images/subpage_header.jpg" alt="image" className="w-full h-60 object-cover" />
            </div>

            <div className="w-full py-8 md:py-14 float-start">
                <div className="container mx-auto p-4 privacy_policy_body">
                    <h2 className="text-2xl md:text-3xl lg:text-5xl text-primary">Privacy Policy</h2>


                    {loading ? (
                        <div><LoaderSpinner /></div>
                    ) : (
                        <p dangerouslySetInnerHTML={{ __html: privacypolicyContent }}></p>
                    )}


                </div>
            </div>

            <Footer />
        </body>
    );
}
