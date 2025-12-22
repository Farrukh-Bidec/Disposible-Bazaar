import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { Image_Url } from '../const';

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-transparent py-8">
      {/* Main error section */}
      <div className="relative flex justify-center items-center gap-20">
        {/* Large '4' on the left */}
        <h4 className="text-[230px] sm:text-[300px] md:text-[350px] lg:text-[400px] xl:text-[450px] text-[#1e7773]">4</h4>
        
        {/* Image and text */}
        <div className="absolute w-[180px] sm:w-[260px] md:w-[300px] lg:w-[350px] xl:w-[450px]">
          <img 
            src={`${Image_Url}ErrorPlate.png`} 
            alt="Page not found" 
            className="w-full" 
          />
          {/* <h4 className="absolute text-sm sm:text-lg md:text-xl lg:text-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Page not found fsfsfsf
          </h4> */}
        </div>

        {/* Large '4' on the right */}
        <h4 className="text-[230px] sm:text-[300px] md:text-[350px] lg:text-[400px] xl:text-[450px] text-[#1e7773] ml-5 sm:ml-10 lg:ml-[120px]">4</h4>
      </div>

      {/* Error text and button */}
      <div className="flex flex-col justify-evenly items-center ">
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-600 mb-2">
          The page you are looking for could not be found.
        </h3>
        <Link href='/' className="bg-[#1e7773] text-black text-sm sm:text-base md:text-lg font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full flex items-center">
          Go Home
          <FaArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

