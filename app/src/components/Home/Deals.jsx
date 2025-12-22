"use client";
import React from 'react'
import { Image_Url } from '../../const'
// import { Link } from 'react-router-dom'
import Link from 'next/link';

function Deals() {
    return (
        <div className="flex justify-center md:py-20">
            <div className="flex md:items-start items-center  md:py-24 md:w-[85%] w-[95%] md:h-[75vh] h-[250px]  justify-end relative rounded-2xl" style={{
                backgroundImage: `url(${Image_Url}HomeAssets/Deals/Banner.png)`,
                backgroundSize: 'cover',        // Cover the entire element
                backgroundRepeat: 'no-repeat',  // Prevent repeating the image
                backgroundPosition: 'center',   // Center the image in the element
                // height: '75vh',                // Full viewport height
                // width: '85%',
            }}>
                <div
                    // data-aos='fade-left'
                    className="flex flex-col md:gap-3 gap-2 mt-14 items-start justify-center text-black md:pl-10 pl-5 md:pr-10 pr-2 w-1/2">
                    <h3 className='md:text-4xl leading-7 text-[30px] font-bazaar text-white'>Coming Soon</h3>
                    <p className='hidden md:block md:text-sm text-xs text-white'>Exciting offers are on the way at Disposable Bazaar! Get ready to explore our upcoming collection of premium paper cups at amazing prices. Stay tuned — something great is coming soon!</p>
                    <p className='md:hidden block md:text-lg text-xs'>Enjoy incredible savings on our top-quality plastic containers!
                    </p>
                    <Link href='/shop/'>
                    <button className=' font-bazaar bg-[#1E7773] text-white md:w-44 md:text-[16px] text-xs p-3 cursor-pointer rounded-lg px5 mt5'>EXPLORE OFFERS   </button>
                    </Link>

                </div>
                <img data-aos='fade-up-right' src={`${Image_Url}HomeAssets/Deals/fork.svg`} className='absolute top-4 md:-left-14 -left-4 md:w-36 w-16' alt="" />
                <img data-aos='fade-up-left' src={`${Image_Url}HomeAssets/Deals/spoon.svg`} className='absolute -bottom-14 md:right-[43%] right-[130px] md:w-36 w-16 ' alt="" />
            </div >
        </div>
    )
}

export default Deals
