'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Headertop from '@/components/headertop';
import Image from 'next/image';
// import { Carousel } from 'flowbite-react';
import PetServicesTabs from '@/components/PetServicesTabs';
import { LoaderSpinner } from '@/components/loader';
import { HOME_PAGE_DETAILS_ENDPOINT } from '@/constants/constants';
import LocalSittersSection from '@/components/LocalSittersSection';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const HomePageComponent = () => {


  // if (loading) {
  //   return (
  //     <div>
  //       <LoaderSpinner />
  //       <p>Loading homepage data...</p>
  //     </div>
  //   );
  // }



  return (
    <>
      <Headertop />
      <section className="homepage_slider_section">
        <div className="h-screen">
          {/* <Carousel slide={true} indicators={true} > */}
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay
            autoPlaySpeed={3000}

          >

            <div key={1} className="block relative h-full items-center">
              <div className="carousel-caption">
                <h2 className="text-3xl md:text-4xl lg:text-7xl text-blue">Turning ideas into reality</h2>
              </div>
              <Image width={200} height={200} src={"/images/homebanner.jpg"} alt="" loading="lazy" />
            </div>
            <div key={1} className="block relative h-full items-center">
              <div className="carousel-caption">
                <h2 className="text-3xl md:text-4xl lg:text-7xl text-blue">Your ideas our responsiblity</h2>
              </div>
              <Image width={200} height={200} src={"/images/itindustry.jpg"} alt="" loading="lazy" />
            </div>

            <div key={1} className="block relative h-full items-center">
              <div className="carousel-caption">
                <h2 className="text-3xl md:text-4xl lg:text-7xl text-blue">Bringing your brand to life.</h2>
              </div>
              <Image width={200} height={200} src={"/images/sitters_deails_header.jpg"} alt="" loading="lazy" />
            </div>

          </Carousel>
        </div>
      </section>

      <section className="home_about_section">
        <div className="container mx-auto px-4">
          <div className="homepage_from_section">
            {/* <ModalWrapperProps data={filterData} /> */}
          </div>

          <div className="w-full flex flex-col-reverse md:flex-row items-center mt-10 float-start">
            <div className="home_about_text md:w-2.5/4 text-center md:text-start">
              <h3>About us</h3>
              <h2 className="text-3xl md:text-3xl lg:text-6xl">Who We Are<br /></h2>
              <p>Welcome to <b>Ideacanvus</b>, your trusted partner for innovative software solutions and professional logo design. We specialize in crafting cutting-edge software that streamlines business operations, enhances user experiences, and drives growth. Whether you're a startup or an established enterprise, our team is dedicated to delivering tailored solutions that meet your unique needs. In addition to software development, we offer top-tier logo design services to help businesses establish a strong brand identity.</p>
              <p>At <b>Ideacanvus</b>, we believe in quality, efficiency, and customer satisfaction. Let’s bring your ideas to life with smart technology and impactful designs.</p>
              <ul>
                <li>Innovate</li>
                <li>Build</li>
                <li>Transform</li>
                <li>Digitalise</li>
              </ul>  
            </div>

            <div className="home_about_img_area md:w-1.5/4 content-center">
              <Image width={600} height={600} src={"/images/aboutus.jpg"} layout="intrinsic" alt="About Us Image" />
            </div>
          </div>
        </div>
      </section>

      <section className="home_service_section">
        <div className="container mx-auto px-4">
          <div className="size-full text-center">
            <h2 className="text-2xl md:text-3xl lg:text-5xl text-[#ffffff]">Our Services</h2>
          </div>
          {/* <PetServicesTabs petServices={petServices} /> */}
        </div>
      </section>

      {/* <section className="home_download_section">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="home_download_img_area md:w-6/12 text-center md:text-start">
              <Image src={"/placeholder.svg"} alt="" width={500} height={500} loading="lazy" />
            </div>

            <div className="home_about_text md:w-6/12 text-center md:text-start">
              <div className="home_download_text_area">
                <h2 className="text-3xl md:text-3xl lg:text-5xl">Download the app and use <span className="text-[#A084E8]">Pet D Agogy</span> anywhere</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="mt-4 text-center">
                  <div className="home_download_qr_box1">
                    <a href={homePageScanners.google_play_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" >
                      <Image src={homePageScanners.google_scanner || "/placeholder.svg"} loading="lazy" alt="" className="qr" width={500} height={300} />
                      <button type="button" className="w-full inline-block">
                        <Image width={500} height={300} src="/images/google_play_but.svg" alt="" className="qr_link_but" />
                      </button>
                    </a>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <div className="home_download_qr_box1">
                    <a href={homePageScanners.app_store_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" >
                      <Image src={homePageScanners.apple_scanner || "/placeholder.svg"} alt="" className="qr" width={500} height={300} loading="lazy" />
                      <button type="button" className="w-full inline-block">
                        <Image width={500} height={300} src="/images/apple_play_but.svg" alt="" className="qr_link_but" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* {localSitters.length > 0 && (
        <LocalSittersSection localSitters={localSitters} totalLocalSitters={totalLocalSitters} />
      )}

      {localSitters.length > 0 && (
        <VideoSection sitterVideos={sitterVideos} totalVideos={totalVideos} />
      )} */}
    </>
  );
};

export default HomePageComponent;

