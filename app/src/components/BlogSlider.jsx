"use client";
import React, { useEffect } from 'react';
import { Assets_Url, Image_Url } from '../const';
import Aos from 'aos';
import 'aos/dist/aos.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required Swiper modules
import { Pagination, Navigation } from 'swiper/modules';
import Link from 'next/link';

function BlogSlider({ blogsCategories }) {
    useEffect(() => {
        Aos.init({ duration: '2000', delay: '0' });
    }, []);

    // Ensure blogsCategories is not null or undefined
    if (!blogsCategories || !Array.isArray(blogsCategories)) {
        return <p>Loading blogs...</p>;
    }

    return (
        
        <div className="md:p-20 px-4 py-10 w-full text-white relative">
            <h3 data-aos='fade-right' className='md:text-6xl text-center md:text-start text-4xl font-bazaar'>
                Recommended Blogs
            </h3>

            {/* Swiper Component */}
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={4}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 20 }, // Mobile screens
                    768: { slidesPerView: 2, spaceBetween: 30 }, // Tablet screens
                    1024: { slidesPerView: 3, spaceBetween: 40 } // Desktop screens
                }}
                className="py-10"
            >
                {blogsCategories.map((data, index) => (
                    <SwiperSlide key={index}>
                         <Link href={`/${data.slug}`}>
                        <div data-aos='fade-up' className="flex flex-col gap-2 py-4 justify-center items-start">
                            <img className='rounded-xl w-full h-full' src={`${Assets_Url}${data.image}`} alt={data.title} />
                            <p className='md:text-md text-sm text-start text-[#898989] '>
                                {data.product_category.name} | {data.date}
                            </p>
                            <p className='md:text-xl text-xs text-start font-semibold'>{data.title}</p>
                        </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <img data-aos='fade-left' src={`${Image_Url}HomeAssets/Blogs/blogsBgImg.svg`} className='absolute hidden md:block top-0 right-0 w-32' alt="" />
        </div>
        
    );
}

export default BlogSlider;
