"use client";
import React , {useEffect, useRef} from 'react';
import Headertop from '@/components/header';
import Footer from '@/components/footer';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Modal } from "flowbite-react";
import { useState } from "react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import Image from 'next/image';
import {HOME} from '@/constants/constants'
import useToast from "../hooks/helperToast";
import { useRouter } from 'next/navigation';
import LoaderSpinner from '@/components/loader';
import Hls from 'hls.js';

const customTheme: CustomFlowbiteTheme = {
  modal: {
    header: {
      base: "flex bg-white items-start justify-between rounded-t-md dark:border-gray-600 border-b p-2 px-4",
      title: "text-xl text-[#000] dark:text-white",
      close: {
        base: "ml-auto inline-flex items-center rounded-full bg-[#FBAD18] p-1.5 text-sm text-white hover:bg-[#0C3C4A] hover:text-[#fff] dark:hover:bg-gray-600 dark:hover:text-white",
        icon: "h-5 w-5",
      },
    },
  },
};


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};


const responsive2 = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface HomeData {
  data: {
    banners: {
      id: number;
      description: string;
      image: string;
    }[];
    recentlyPlayedVideoCount:number;
    recentlyPlayedVideos: {
      id: number;
      videoId: string;
      thumbnail: string;
      videoName: string;
      vimeoLink: string;
      programName: string;
    }[];
    popularProgramCount: number;
    popularPrograms: {
      id: number;
      programId: number;
      languageId: number;
      programName: string;
      image: string;
      languageName: string;
      videoCount: number;
      
    }[];
    newReleaseProgramCount: number;
    newReleasePrograms: {
      id: number;
      programId: number;
      languageId: number;
      programName: string;
      image: string;
      languageName: string;
      videoCount: number;
      
    }[];
    homeSectionForWeb:{
      id: number;
      appDownloadText: string;
      googlePlayLink: string;
      googlePlayImage: string;
      appStoreLink: string;
      appStoreImage: string;

    }
  };
}

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  // const [video, setVideo] = useState(null);
  const { showErrorToast } = useToast();
  const router = useRouter();
  const [video, setVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const token = localStorage.getItem('token');
  
        const response = await fetch(
          `${HOME}?videoPage=1&videoPage=1&newReleasePage=1`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );
  
        if (!response.ok) {
          // Optionally clear localStorage or handle unauthorized access here
          throw new Error(`Failed to fetch home data. Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data.status === 200) {
          setHomeData(data);
        } else if (data.status === 401) {
          showErrorToast(data.msg);
          router.push('/signin');
          localStorage.clear()
        } else {
          console.log('data', data);
          showErrorToast(data.msg);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching home data:', err.message);
        } else {
          console.error('Error fetching home data:', err);
        }      
      }
    };
  
    fetchHomeData();
  }, []);
  
  useEffect(() => {
    console.log('video',video)
    if (video) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(video); // Ensure `video` contains a valid .m3u8 URL
        hls.attachMedia(videoRef.current!);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('video some')
          videoRef.current!.play().catch((err) => {
            console.error('Error playing the video:', err);
          });
        });
  
        return () => hls.destroy(); // Cleanup
      } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari (which supports HLS natively)
        videoRef.current.src = video;
        console.log( videoRef.current,' videoRef.curren=======')
        videoRef.current.play().catch((err) => {
          console.error('Error playing the video:', err);
        });
      } else {
        console.error('HLS not supported in this browser');
      }
    }
  }, [video]);
  


     if (!homeData) {
      return <><Headertop /><div className='home_body'>
      <div className='container'><LoaderSpinner /></div></div>;  </>

    }
    
     const { banners, recentlyPlayedVideoCount, recentlyPlayedVideos, popularProgramCount, popularPrograms, newReleaseProgramCount,newReleasePrograms } = homeData.data;


  

     return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Videoe</Modal.Header>
          <Modal.Body>
          {video ? (
             <div className="video_modal_area">
              <video
               type='application/vnd.apple.mpegurl'
                ref={videoRef}
                src={video}
                width="100%"
                height="100%"
                title="Vimeo Video"
                className="rounded-lg sitter_video_size"
            />
            </div>)
            : (
              <p>No video selected.</p>
            )}
          </Modal.Body>
        </Modal>
      </Flowbite>
      <Headertop />

      <div className='home_slider'>
          <div className='w-full'>
            <Carousel className='header_slider'
              responsive={responsive2}
              swipeable={true}
              draggable={true}
              showDots={true}
              infinite={true} // Loop disabled
              autoPlay={true}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              itemClass="carousel-item-spacing" // Add spacing class
            >
              
            {banners.map((banner:any)=>(
              <div className="carousel-item" key={banner.id}>
                <div className='home_slider_full'>
                    <Image src={banner.image} alt=''  height={50} width={50} />
                    <div className='carousel-caption'>
                      <div className='container'>
                        <h2>{banner.description}</h2>
                      </div>
                    </div>
                </div>
              </div>
              ))}
            </Carousel>
          </div>
      </div>

      {recentlyPlayedVideoCount > 0 &&  (
      <div className='home_section1'>
        <div className='container'>
          <div className='full-w flex md:flex-nowrap justify-between items-center'>
            <div className='page-heading'>Recently Played</div>
            {recentlyPlayedVideoCount > 14 && (<p className='all_but whitespace-nowrap font-extrabold text-themeyellow cursor-pointer'>View all</p>)}
          </div>

          <div className='w-full mt-3'>
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              infinite={false} // Loop disabled
              autoPlay={true}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              itemClass="carousel-item-spacing" // Add spacing class
            >
              {recentlyPlayedVideoCount > 0 && recentlyPlayedVideos.map((recentlyPlay:any) => (
              <div className="carousel-item" key={recentlyPlay.id}>
                <div className="overflow-hidden">
                  <div className='relative'>
                    <Image src={recentlyPlay.thumbnail} alt="Program Image" className="rounded-lg w-full h-48 object-cover" height={50} width={50} />
                    <button className='play_but' 
                    onClick={() => {
                            setVideo('https://player.vimeo.com/external/1051023830.m3u8?s=6e865c4fcb1b622925a340f35d19ab8cdeb4ff31&logging=false');
                            setOpenModal(true); // Open modal when video is selected
                          }}><Image src='../images/play.svg' alt='' height={50} width={50} /></button>
                  </div>
                  <div className="py-4">
                    <h3 className="text-lg font-extrabold">{recentlyPlay.programName}</h3>
                    <h4 className="text-md text-[#005895] font-extrabold">{recentlyPlay.videoName}</h4>
                  </div>
                </div>
              </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
      )}

      
      <div className='home_body'>
        <div className='container'>
        {newReleaseProgramCount > 0 &&  ( <>
          <div className='full-w flex md:flex-nowrap justify-between items-center'>
            <div className='page-heading'>New Release</div>
            {newReleaseProgramCount > 14 &&  ( <p className='all_but whitespace-nowrap font-extrabold text-themeyellow cursor-pointer'>View all</p>)}
          </div>
          <div className='w-full mt-3'>
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              infinite={false} // Loop disabled
              autoPlay={true}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              itemClass="carousel-item-spacing" // Add spacing class
            >

              {newReleasePrograms.map((newRelease:any)=>(
              <div className="carousel-item" key={newRelease.id}>
                <div className="overflow-hidden cursor-pointer">
                  <Image src={newRelease.image} alt="Program Image" className="rounded-lg w-full h-48 object-cover" height={50} width={50}/>
                  <div className="py-4">
                    <h3 className="text-lg font-extrabold">{newRelease.programName}</h3>
                    <p className="text-gray-600 text-sm flex items-center mt-1">
                      <span>{newRelease.languageName}</span> <span className="mx-1 text-themeyellow">•</span> <span>{newRelease.videoCount} Lessons</span>
                    </p>
                  </div>
                </div>
              </div>
              ))}
              
            </Carousel>
          </div>
          </> )}

          {popularProgramCount > 0 &&  ( <>
          <div className='full-w flex md:flex-nowrap justify-between items-center mt-5'>
            <div className='page-heading'>Popular Program </div>
            {popularProgramCount > 14 && (<p className='all_but whitespace-nowrap font-extrabold text-themeyellow cursor-pointer'>View all</p>)}
          </div>
          <div className='w-full mt-3'>
            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              infinite={false} // Loop disabled
              autoPlay={true}
              autoPlaySpeed={2000}
              keyBoardControl={true}
              transitionDuration={500}
              containerClass="carousel-container"
              itemClass="carousel-item-spacing" // Add spacing class
            >

           {popularPrograms.map((popular:any)=>(
              <div className="carousel-item" key={popular.id}>
                <div className="overflow-hidden cursor-pointer">
                  <Image src={popular.image} alt="Program Image" className="rounded-lg w-full h-48 object-cover" height={50} width={50}/>
                  <div className="py-4">
                    <h3 className="text-lg font-extrabold">{popular.programName}</h3>
                    <p className="text-gray-600 text-sm flex items-center mt-1">
                      <span>{popular.languageName}</span> <span className="mx-1 text-themeyellow">•</span> <span>{popular.videoCount} Lessons</span>
                    </p>
                  </div>
                </div>
              </div>
           ))}
            </Carousel>
          </div>
          </>)}

          <div className="bg-themeyellow text-white text-center p-6 md:py-12 md:px-16 rounded-lg mt-8 grid md:grid-cols-2 items-center">
              <h2 className="text-xl md:text-5xl font-semibold">Download the app and use <span className="font-extrabold">Incredible years</span> anywhere</h2>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                  <Image src="../images/qr.svg" alt="QR Code Google" className="w-24 h-24 bg-white p-4 rounded-lg" height={50} width={50}/>
                  <a href="#" className="mt-4">
                    <Image src="../images/play_but.svg" alt="Google Play" className="w-40" height={50} width={50}/>
                  </a>
                </div>
                <div className="flex flex-col items-center">
                <Image src="../images/qr.svg" alt="QR Code Google" className="w-24 h-24 bg-white p-4 rounded-lg" height={50} width={50}/>
                  <a href="#" className="mt-4">
                    <Image src="../images/store_but.svg" alt="Google Play" className="w-40" height={50} width={50}/>
                  </a>
                </div>
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
     );
}
