"use client";
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import '../Custom.css'


import { Pagination, Navigation } from 'swiper/modules';
import { Assets_Url, Image_Not_Found, Image_Url } from '../../const';
import axios from '../../Utils/axios';
import { Loader } from '../Loader';
// import { Link } from 'react-router-dom';
import Link from 'next/link';


// Premium Section
function Premium() {
    return (

        <div className="md:p-20 md:pb-0 py-10 relative">
            <div className="flex md:flex-row md:flex-row flex-col justify-start md:gap-10 gap-2 my-16 text-white items-center">
                <h3 data-aos='fade-right' className='md:w-1/2 w-11/12 md:text-start text-center font-bazaar md:text-6xl text-4xl'>Plastic Containers</h3>
                <p data-aos='fade-left' className='md:w-1/3 w-11/12 md:text-start text-center md:text-lg text-sm'>Discover our versatile range of high-quality plastic containers. Perfect for all your storage needs, combining style and functionality.</p>
            </div>
            <img data-aos='fade-left' src={`${Image_Url}HomeAssets/PremiumAssets/shoper.svg`} className='absolute hidden md:block top-0 right-0 w-32' alt="" />
            <img data-aos='fade-left' src={`${Image_Url}HomeAssets/PremiumAssets/shoper2.svg`} className='absolute md:hidden block top-0 right-0 w-24' alt="" />

            <Slider />

        </div>
    )
}

export default Premium


// Slider Component

function Slider() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    // const products = [
    //     { img: `${Image_Url}HomeAssets/PremiumAssets/premiumBoxImg.svg`, title: 'Styrofoam Large Burger', name: 'Box PP-09' },
    //     { img: `${Image_Url}HomeAssets/PremiumAssets/premiumBoxImg.svg`, title: 'Styrofoam Large Burger', name: 'Box PP-09' },
    //     { img: `${Image_Url}HomeAssets/PremiumAssets/premiumBoxImg.svg`, title: 'Styrofoam Large Burger', name: 'Box PP-09' },
    //     { img: `${Image_Url}HomeAssets/PremiumAssets/premiumBoxImg.svg`, title: 'Styrofoam Large Burger', name: 'Box PP-09' },
    //     { img: `${Image_Url}HomeAssets/PremiumAssets/premiumBoxImg.svg`, title: 'Styrofoam Large Burger', name: 'Box PP-09' },
    //     { img: `${Image_Url}HomeAssets/PremiumAssets/premiumBoxImg.svg`, title: 'Styrofoam Large Burger', name: 'Box PP-09' },
    //     { img: `${Image_Url}HomeAssets/PremiumAssets/premiumBoxImg.svg`, title: 'Styrofoam Large Burger', name: 'Box PP-09' },
    //     { img: `${Image_Url}HomeAssets/PremiumAssets/premiumBoxImg.svg`, title: 'Styrofoam Large Burger', name: 'Box PP-09' },
    //     { img: `${Image_Url}HomeAssets/PremiumAssets/premiumBoxImg.svg`, title: 'Styrofoam Large Burger', name: 'Box PP-09' },
    //     { img: `${Image_Url}HomeAssets/PremiumAssets/premiumBoxImg.svg`, title: 'Styrofoam Large Burger', name: 'Box PP-09' },
    //     // Add more products as needed
    // ];


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.public.get('home/popular/product/get')
                setProducts(response.data.data)
            } catch (error) {
                console.log(error);

            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    if (isLoading) return <Loader />

    return (
        <>
            <Swiper
                breakpoints={{

                    320: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1000: {
                        slidesPerView: 4,
                    },
                }}
                spaceBetween={30}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper min-h-[280px] md:min-h-[500px] min-w-full"
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className="mobileVeiw group hover:border-2 hover:border-[#1E7773] bg-[#32303e] p-3 flex flex-col justify-center gap-3 items-center w-full md:w-[250px] lg:w-[350px] h-[200px] hover:h-[260px] md:h-[407px] hover:md:h-[450px] text-white rounded-xl"
                            style={{ transition: 'height 0.5s ease, opacity 0.5s ease 0.3s' }}>
                            {/* <div className="relative flex justify-center items-center w-[150px] h-[150px] md:w-[250px] md:h-[250px]">
                                <img
                                    className="absolute w-full block group-hover:hidden rounded-xl object-cover"
                                    src={`${Assets_Url}${product.product_image[0]?.image}`}
                                    alt={product.name}
                                    style={{ transition: 'opacity 0.5s ease 0.3s' }}
                                    loading='lazy'
                                />
                                <img
                                    className="absolute w-full hidden group-hover:block rounded-xl object-cover"
                                    src={`${Assets_Url}${product.product_image[1]?.image}`}  // Replace with hover image if available
                                    alt={product.name}
                                    style={{ transition: 'opacity 0.5s ease 0.3s' }}
                                    loading='lazy'
                                />
                            </div> */}
                            <div className='flex flex-col items-center justifycenter w-full h-full'>
                                <Link href={`/product/${product.slug}`}>
                                <div className="relative p-5 flex justify-center items-center w-[150px] h-[150px] md:w-[250px] md:h-[250px]">
                                    <img
                                        className=" w-full h-full block group-hover:hidden rounded-xl object-cover"
                                        src={`${Assets_Url}${product.product_image[0]?.image}`}
                                        alt={product.name}
                                        style={{ transition: 'opacity 0.5s ease 0.3s' }}
                                        loading='lazy'
                                        onError={(e) => {
                                            e.currentTarget.src = Image_Not_Found; // Path to your dummy image
                                          }}
                                    />
                                    <img
                                        className=" w-full h-full hidden group-hover:block rounded-xl object-cover"
                                        src={`${Assets_Url}${product.product_image[1]?.image}`}  // Replace with hover image if available
                                        alt={product.name}
                                        style={{ transition: 'opacity 0.5s ease 0.3s' }}
                                        loading='lazy'
                                        onError={(e) => {
                                            e.currentTarget.src = Image_Not_Found; // Path to your dummy image
                                          }}
                                    />
                                </div>
                                </Link>
                            </div>
                            <h2 className="font-bold text-center text-sm md:text-lg ">{product.name}</h2>
                            <Link
                                href={`/product/${product.slug}`}
                                className="transform scale-0 flex justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 duration-500 bg-[#1E7773] p-3 w-4/5 rounded-xl md:my-4 text-xs md:text-xl"
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
            </Swiper >

            {/* Custom navigation buttons */}
            <div className="absolute z-10 top-[30rem] w-full left-0 hidden lg:block">
                <div
                    className="custom-prev swiper-button-prev px-4"
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
    )
}


