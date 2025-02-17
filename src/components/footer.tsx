'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
// import useToast from "@/hooks/helperToast";

interface Location {
  latitude: number;
  longitude: number;
  address: string;
  zip_code: number;
  city: string;
}


interface FooterData {
  data: {
    stateList: {
      id: number;
      state_name: string;
      latitude: string;
      longitude: string;

    }[];
    adminContactInfo: {
      id: number;
      full_name: string;
      contact_email: string;
      address: string;
      phone: string;
    };
    scanners: {
      google_scanner: string;
      apple_scanner: string;
      google_play_link:string;
      app_store_link:string;  
    };
    petServices: {
      id: number
    }
  };
}

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // const { showInfoToast } = useToast();

  // useEffect(() => {
  //   fetch(FOOTER_ENDPOINT)
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(`Failed to fetch footer data. Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setFooterData(data);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //     });
  // }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!footerData) {
    return <div></div>;
  }

  const handleStatesFind = (state) => {

   
    const location: Location = {
      latitude: state.latitude,
      longitude: state.longitude,
      city: state.state_name,
      address: state.state_name,
      zip_code: 0
    }

    console.log(footerData.data.petServices.id)
    if (typeof window !== "undefined") {
      localStorage.setItem("city", state.state_name)
      localStorage.setItem("location", JSON.stringify(location))
      if (!localStorage.getItem('service_id')) {
        localStorage.setItem("service_id", JSON.stringify(footerData.data.petServices.id))
      }
    }

    // window.location.reload()
    window.dispatchEvent(new CustomEvent("filterApplied", { detail: location }))
    router.push('/see-all')


  }

  // const handleComingSoon = () => {
  //   showInfoToast("Coming soon");
  // };


  const { stateList, adminContactInfo, scanners } = footerData.data;

  return (
    <div className="footer">
      <div className="container mx-auto px-4">
        <div className="footer_top_section">
          <div className="size-full">
            <h2 className="text-2xl md:text-2xl lg:text-3xl text-[#ffffff] inline-block">
              Thousands of pet sitters across the United States
              <Image src="../images/us.svg" alt="US Flag" width={30} height={30} className="inline-block ms-2" />
            </h2>
          </div>

          <div className="size-full">
            <div className="box1">
              <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-2 gap-y-0">
                {stateList.map((state) => (
                  <li key={state.id}>
                    <div onClick={() => handleStatesFind(state)} >{state.state_name}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer_bottom_section">
          <div className="size-full">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="box1">
                <h2 className="text-2xl md:text-2xl lg:text-3xl">Our Pages</h2>
                <ul className="mt-3">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/about-us">About Us</Link>
                  </li>
                  <li>
                    <Link href="/my-pets">My pets</Link>
                    {/* <button onClick={handleComingSoon} className="hover:text-black-2000 font-bold">
                      My pets
                    </button> */}
                  </li>
                  <li>
                    <Link href="/appointment">Appointments</Link>
                    {/* <button onClick={handleComingSoon} className="hover:text-black-2000 font-bold">
                      Appointments
                    </button> */}
                  </li>
                  <li>
                    <Link href="/contact-us">Contact Us</Link>
                    {/* <button onClick={handleComingSoon} className="hover:text-black-2000 font-bold">
                      Contact Us
                    </button> */}
                  </li>
                </ul>
              </div>

              <div className="box2">
                <h2 className="text-2xl md:text-2xl lg:text-3xl">Contact</h2>
                <ul className="mt-3">
                  <li>
                    <i className="fa-solid fa-phone" /> {adminContactInfo.phone}
                  </li>
                  <li>
                    <Link href={`mailto:${adminContactInfo.contact_email}`}>
                      <i className="fa-solid fa-envelope" /> {adminContactInfo.contact_email}
                    </Link>
                  </li>
                  <li>
                    <i className="fa-solid fa-location-dot" /> {adminContactInfo.address}
                  </li>
                </ul>
              </div>

              <div className="box3 col-span-1 md:col-span-2">
                <h2 className="text-2xl md:text-2xl lg:text-3xl">Join as a service provider</h2>

                <div className="footer_qr_section">
                  <div className="box1">
                    <div className="qr">
                      <a href={scanners.google_play_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" >
                        <Image src={scanners.google_scanner} alt="Google QR" width={50} height={50} />
                      </a>
                    </div>
                    <div className="app_link_but">
                      <Link href="#">

                        <Image src="/images/google_play_but.svg" alt="Google Play" width={100} height={50} />

                      </Link>
                    </div>
                  </div>
                  <div className="box1">
                    <div className="qr">
                    <a href={scanners.app_store_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" >
                      <Image src={scanners.apple_scanner} alt="Apple QR" width={50} height={50} />
                      </a>
                    </div>
                    <div className="app_link_but">
                      <Link href="#">
                        <Image src="/images/app_stor_but.svg" alt="App Store" width={100} height={50} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer_copy_section">
          <p>Copyright © 2025 IdeaCanvus. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
