import React from 'react';
import Headertop from '@/components/headertop';
import Footer from '@/components/footer';
import HomePageComponent from '@/components/HomePageComponent';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default async function Page() {

  return (
    <>
      <Headertop />
      <HomePageComponent/>
      <Footer />  
      <ToastContainer />
    </>
  );

}   
