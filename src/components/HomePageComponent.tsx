'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Headertop from '@/components/headertop';
import VideoSection from '@/components/videoModal';
import ModalWrapperProps from '@/components/homepageFilter';
import Image from 'next/image';
// import { Carousel } from 'flowbite-react';
import PetServicesTabs from '@/components/PetServicesTabs';
import { LoaderSpinner } from '@/components/loader';
import { HOME_PAGE_DETAILS_ENDPOINT } from '@/constants/constants';
import LocalSittersSection from '@/components/LocalSittersSection';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface HomePageData {
  data: {
    homepageBanners: {
      id: number;
      image: string;
      context: string;
    }[];
    homePageAboutUs: {
      id: number;
      header: string;
      context: string;
      skill_one: string;
      skill_two: string;
      skill_three: string;
      skill_four: string;
      image: string;
    };
    homePageScanners: {
      id: number;
      image: string;
      context: string;
      google_scanner: string;
      apple_scanner: string;
      google_play_link: string;
      app_store_link: string;
    };
    petCategory: {
      id: number;
      pet_name: string;
      image: string;
      slug: string;
    }[];
    petServices: {
      id: number;
      service_name: string;
      description: string;
      image: string;
    }[];
    localSitters: {
      id: number;
      latitude: string;
      longitude: string;
      full_name: string;
      profile_image: string;
      is_active: string;
      address: string;
      distance: string;
      average_rating: string;
      total_reviews: number;
      slug: string;
    }[];
    totalLocalSitters: number;
    sitterVideos: {
      id: number;
      full_name: string;
      profile_image: string;
      video: string;
      thumbnail: string;
    }[];
    totalVideos: number;
  };
  metaData: {
    filterData: {
      services: string[];
      rating: string[];
      serviceTimes: string[];
      boardingNear: string;
      startDate: Date;
      endDate: Date;
      days: {
        id: number;
        week_day: string;
      }[];
      timesSlots: string[];
      petCategory: {
        id: number;
        pet_name: string;
        image: string;
        slug: string;
      }[];
      petServices: {
        id: number;
        service_name: string;
        image: string;
        time_type: string;
      }[];
      petSizes: {
        id: number;
        size: string;
      }[];
    };
  };
}

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
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  localStorage.removeItem('bookedService');
  localStorage.removeItem('choosenbookingservice');


  useEffect(() => {
    const fetchHomePageData = async () => {
      setLoading(true);
      setError(null);
      try {
        const savedLocation = Cookies.get('location');
        let queryParams = new URLSearchParams();

        if (savedLocation) {
          try {
            const parsedLocation = JSON.parse(savedLocation);
            queryParams = new URLSearchParams({
              latitude: parsedLocation.latitude.toString(),
              longitude: parsedLocation.longitude.toString()
            });

            localStorage.setItem(
              "userLocation",
              JSON.stringify({
                address: parsedLocation.address,
                house_or_flat_no:'',
                landmark: '',
                latitude: parsedLocation.latitude.toString(),
                longitude: parsedLocation.longitude.toString(),
                zip_code: parsedLocation.zip_code,
                address_id: '0'
              }),
            )
          } catch (error) {
            console.error('Error parsing location cookie:', error);
            await fetchDefaultLocation(queryParams);
          }
        } else {
          await fetchDefaultLocation(queryParams);
        }

        const res = await fetch(`${HOME_PAGE_DETAILS_ENDPOINT}?${queryParams}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.status == 200) {
          setHomePageData(data);
        }

      } catch (error) {
        console.error('Error fetching home page data:', error);
        setError('Failed to fetch home page data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHomePageData();
  }, []);

  const fetchDefaultLocation = async (queryParams: URLSearchParams) => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      queryParams.set('latitude', data.latitude.toString());
      queryParams.set('longitude', data.longitude.toString());
      const address = `${data.city}${data.region ? ', ' + data.region : ''}, ${data.country_name}`;


      Cookies.set('location', JSON.stringify({
        latitude: data.latitude,
        longitude: data.longitude,
        address: address
      }), { expires: 10 });
    } catch (error) {
      console.error('Error fetching default location:', error);

      queryParams.set('latitude', '40.7128');
      queryParams.set('longitude', '-74.0060');


      Cookies.set('location', JSON.stringify({
        latitude: 40.7128,
        longitude: -74.0060,
        address: 'New York, USA'
      }), { expires: 10 });
    }
  };

  if (loading) {
    return (
      <div>
        <LoaderSpinner />
        <p>Loading homepage data...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!homePageData) {
    return <div>No data available</div>;
  }

  const { homepageBanners, homePageAboutUs, petServices, homePageScanners, localSitters, sitterVideos } = homePageData.data;
  const { filterData } = homePageData.metaData;
  const totalLocalSitters = homePageData.data.totalLocalSitters;
  const totalVideos = homePageData.data.totalVideos;

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
            {homepageBanners.map((banner) => (
              <div key={banner.id} className="block relative h-full items-center">
                <div className="carousel-caption">
                  <h2 className="text-3xl md:text-4xl lg:text-7xl text-white">{banner.context}</h2>
                </div>
                <Image width={500} height={500} src={banner.image || "/placeholder.svg"} alt={`Banner ${banner.id}`} loading="lazy" />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="home_about_section">
        <div className="container mx-auto px-4">
          <div className="homepage_from_section">
            <ModalWrapperProps data={filterData} />
          </div>

          <div className="w-full flex flex-col-reverse md:flex-row items-center mt-10 float-start">
            <div className="home_about_text md:w-2.5/4 text-center md:text-start">
              <h3>About us</h3>
              <h2 className="text-3xl md:text-3xl lg:text-6xl">{homePageAboutUs.header}<br /></h2>
              <p>{homePageAboutUs.context}.</p>
              <ul>
                <li>{homePageAboutUs.skill_one}</li>
                <li>{homePageAboutUs.skill_two}</li>
                <li>{homePageAboutUs.skill_three}</li>
                <li>{homePageAboutUs.skill_four}</li>
              </ul>
            </div>

            <div className="home_about_img_area md:w-1.5/4 content-center">
              <Image width={500} height={500} src={homePageAboutUs.image || "/placeholder.svg"} layout="intrinsic" alt="About Us Image" />
            </div>
          </div>
        </div>
      </section>

      <section className="home_service_section">
        <div className="container mx-auto px-4">
          <div className="size-full text-center">
            <h2 className="text-2xl md:text-3xl lg:text-5xl text-[#ffffff]">Our Services</h2>
          </div>
          <PetServicesTabs petServices={petServices} />
        </div>
      </section>

      <section className="home_download_section">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="home_download_img_area md:w-6/12 text-center md:text-start">
              <Image src={homePageScanners.image || "/placeholder.svg"} alt="" width={500} height={500} loading="lazy" />
            </div>

            <div className="home_about_text md:w-6/12 text-center md:text-start">
              <div className="home_download_text_area">
                <h2 className="text-3xl md:text-3xl lg:text-5xl">Download the app and use <span className="text-[#63A027]">Pet D Agogy</span> anywhere</h2>
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
      </section>

      {localSitters.length > 0 && (
        <LocalSittersSection localSitters={localSitters} totalLocalSitters={totalLocalSitters} />
      )}

      {localSitters.length > 0 && (
        <VideoSection sitterVideos={sitterVideos} totalVideos={totalVideos} />
      )}
    </>
  );
};

export default HomePageComponent;

