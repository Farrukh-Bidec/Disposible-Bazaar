"use client";
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../Custom.css';

import { Pagination, Navigation } from 'swiper/modules';
import { Assets_Url, Image_Not_Found, Image_Url } from '../../const';
import AOS from "aos";
import 'aos/dist/aos.css';
import Link from 'next/link';

function CategorySlider({ products }) {
    console.log(products);

    useEffect(() => {
        AOS.init({ duration: 1000, delay: 0 });
    }, []);

    return (
        <>
            <Swiper
                breakpoints={{
                    320: {
                        slidesPerView: 2, // Show 2 slides on mobile
                    },
                    768: {
                        slidesPerView: 2, // Show 2 slides on tablet
                    },
                    1200: {
                        slidesPerView: 2, // Show 2 slides at 1200px width
                    },
                    1300: {
                        slidesPerView: 3, // Show 3 slides on larger screens
                    },
                }}
                spaceBetween={30}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper min-w-full min-h-[300px] md:min-h-[490px]"
            >
                {products.map((data, index) => (
                    <SwiperSlide key={index}>
                        <div className="mobileVeiw relative group hover:border-2 hover:border-[#1E7773] bg-[#32303e] p-3 md:pb-10 flex flex-col justifycenter items-center gap-3 w-full md:w-[250px] lg:w-[350px] h-[230px] hover:h-[270px] md:h-[407px] hover:md:h-[450px] text-white rounded-xl"
                            style={{ transition: 'height 0.5s ease, opacity 0.5s ease 0.3s' }}>

                            {/* Image and title container */}
                            <div className='flex flex-col items-center justifycenter w-full h-full'>
                                <Link href={`/product/${data.slug}`}>
                                    <div className=" flex justify-center items-center w-[150px] h-[150px] md:w-[250px] md:h-[250px]">
                                        <img
                                            className="w-full h-full block group-hover:hidden rounded-xl object-cover"
                                            src={`${Assets_Url}${data.product_image[0]?.image}`}
                                            alt={data.name}
                                            style={{ transition: 'opacity 0.5s ease 0.3s' }}
                                            loading='lazy'
                                            onError={(e) => {
                                                e.currentTarget.src = Image_Not_Found; // Path to your dummy image
                                            }}
                                        />
                                        <img
                                            className="w-full h-full hidden group-hover:block rounded-xl object-cover"
                                            src={`${Assets_Url}${data.product_image[1]?.image}`}  // Replace with hover image if available
                                            alt={data.name}
                                            style={{ transition: 'opacity 0.5s ease 0.3s' }}
                                            loading='lazy'
                                            onError={(e) => {
                                                e.currentTarget.src = Image_Not_Found; // Path to your dummy image
                                            }}
                                        />
                                    </div>
                                </Link>
                                <h3 className="font-bold w-full text-center text-sm md:text-xl mt-3">{data.name}</h3>
                            </div>


                            {/* Button with smooth scaling */}
                            <Link
                                href={`/product/${data.slug}`}
                                className="absolute bottom-3 flex justify-center  transform scale-0 opacity-0 group-hover:opacity-100 group-hover:scale-100 duration-500 bg-[#1E7773] p-3 w-4/5 rounded-xl text-xs md:text-xl"
                                style={{ transition: 'opacity 0.5s ease, transform 0.5s ease' }}
                            >
                                <button
                                >
                                    SHOP NOW
                                </button>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom navigation buttons */}
            <div className="absolute z-10 w-full hidden lg:block -mt-20">
                <div
                    className="custom-prev swiper-button-prev px-4 "
                    style={{
                        backgroundColor: '#1E7773',  // Green background
                        color: '#FFFFFF',  // White text color
                        borderRadius: '100%',
                        left: '25px',
                        width: '2.5rem',
                    }}
                >
                </div>
                <div
                    className="custom-next swiper-button-next px-4"
                    style={{
                        backgroundColor: '#1E7773',
                        color: '#FFFFFF',
                        borderRadius: '100%',
                        right: '25px',
                        width: '2.5rem',
                    }}
                >
                </div>
            </div>
        </>
    );
}

export default CategorySlider;
