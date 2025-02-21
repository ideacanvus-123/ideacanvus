'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";
import ModalWrapper from '@/components/locationModals';
import Logout from '@/components/logoutModal';
import { LoaderSpinner } from '@/components/loader';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useToast from '@/hooks/helperToast';

export default function Headertop() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();
  const { showInfoToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token")
    const image = localStorage.getItem("profileImage")
    if (image) {
      setProfileImage(image)
    }
    if (token) {
      setIsLoggedIn(true)
    }
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)


    const handleProfileImageUpdate = () => {
      const updatedImage = localStorage.getItem("profileImage")
      if (updatedImage) {
        setProfileImage(updatedImage)
      }
    }

    window.addEventListener("profileImageUpdated", handleProfileImageUpdate)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("profileImageUpdated", handleProfileImageUpdate)
    }
  }, [])
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  const isActive = (route: string) => pathname === route;

  const handleComingSoon = () => {
    showInfoToast("Coming soon");
  };


  return (
    <div className="header_top_section">
      <div className="container mx-auto px-4">
        <div className="header_top">
          <div className="left">
            {/* <p>
              <ModalWrapper />
            </p> */}
          </div>
          <div className="right">
          

            {isLoggedIn && (
              <>
                <Link href="#" className="top_notification_section">
                  <i className="fas fa-bell"></i>
                  <span className="count">01</span>
                </Link>

                <div className="top_profile_section">
                  <Image src={profileImage} alt="US Flag" width={30} height={30} className="img_area" />
                  <p><i className="fa-solid fa-angle-down"></i></p>
                  <div className="profile_drop">
                    <ul>
                      <li><Link href="/profile"><i className="fas fa-user"></i> Profile</Link></li>
                      <li><Logout /></li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={`header_nevigation_section bg-white transition-all duration-300 rounded-full ${isSticky ? ' shadow-md fixed top-0 left-0 right-0 py-2 rounded-none bg-transparent ' : 'bg-transparent py-4'
          }`}>
          <Navbar fluid rounded className="navbar">
            <NavbarBrand href="/">
              <Image src="../images/icon.jpg" className="NavbarBrand w-20" width={500} height={500} alt="Logo" />
            </NavbarBrand>
 
            <NavbarToggle />

            <NavbarCollapse className="Navbar_edit">
              <Link href="/" className={isActive('/') ? 'active' : ''}>
                Home
              </Link>
              <Link href="/about-us" className={isActive('/about-us') ? 'active' : ''}>
                About Us
              </Link>
              {/* <Link href="/my-pets" className={isActive('/my-pets') ? 'active' : ''}>
                My Pets
              </Link>
              <Link href="/appointment" className={isActive('/appointment') ? 'active' : ''}>
                Appointment
              </Link> */}
              {/* <Link href="/contact-us" className={isActive('/contact-us') ? 'active' : ''}>
                Contact Us
              </Link> */}

           
              <button onClick={handleComingSoon} className="hover:text-black-2000 font-bold">
                Contact Us
              </button>

              {/* {!isLoggedIn && (
                <Link href="/signin">
                  <Button className="nav_login_but">Login</Button>
                </Link>
              )} */}
            </NavbarCollapse>
          </Navbar>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
