"use client";
import React, { useEffect, useState } from 'react';
import { Image_Url } from '../../const';

import AOS from "aos";
import 'aos/dist/aos.css';

function HeroSection() {
    const [visibleItems, setVisibleItems] = useState('');
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setVisibleItems('HomeAssets/HeroSecton/HeroSectionBg.svg'); // Show 2 items on mobile
        } else {
            setVisibleItems('HomeAssets/HeroSecton/HeroSectionBg.png'); // Show 3 items on larger screens
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Call it once on component mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        AOS.init({ duration: '1000', delay: '0' });
    }, []);


    return (
        <div
            className="flex w-screen h-[600px] md:h-[700px] bg[#FFFDD0] overflow-y-hidden"
            style={{
                backgroundImage: visibleItems ? `url('${Image_Url}${visibleItems}')` : 'none',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className='w-full md:w-1/2 p-12 md:p-32 pt-20  md:text-start text-center text-[#20202c]'>
                <h3 className='text-5xl md:text-7xl font-bazaar md:mb-12'>Elevate Your <br /> Disposable Needs</h3>
                <h2 className='font-semibold mb-4 md:text-2xl text-xl'>Quality you can trust, delivered to your doorstep</h2>
                <h2 className='md:text-xl lg:w-3/4 mb-6'>Explore our wide range of eco-friendly disposable products perfect for every occasion.</h2>
                <button className='px-6 py-3 bg-[#1e7773] rounded-xl text-white'>Explore Products</button>
            </div>
            <div className='max-w-1-2'>
                <img src={`${Image_Url}HomeAssets/HeroSecton/emptycup.svg`} alt="" className='hidden md:block absolute top-30' />
                <img src={`${Image_Url}HomeAssets/HeroSecton/basket.svg`} alt="" className='hidden md:block absolute right-[15%] top-60' />
                <img src={`${Image_Url}HomeAssets/HeroSecton/box.svg`} alt="" className='hidden md:block absolute right-[40%] bottom-1/2' />
                <img src={`${Image_Url}HomeAssets/HeroSecton/cup.svg`} alt="" className='hidden md:block absolute w-1/3 right-25 bottom-[0%]' />
                <img src={`${Image_Url}HomeAssets/HeroSecton/plate.svg`} alt="" className='hidden md:block absolute lg:w-72 -right-0 top-[25%]' />
                <img src={`${Image_Url}HomeAssets/HeroSecton/shoper.svg`} alt="" className='hidden md:block absolute right-[15%] bottom-1/4' />
            </div>
        </div>
    );
}

export default HeroSection;
