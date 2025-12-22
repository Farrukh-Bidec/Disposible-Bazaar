
"use client";
import React, { useEffect } from 'react'
import { Image_Url } from '../const'
import Blogs from '../components/Home/Blogs'
import Aos from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import CustomSeo from '../components/CustomSeo';


function AboutUs() {
    
useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";

    Aos.init({ duration: '2000', delay: '0' });

    return () => {
        document.body.style.overflowX = "auto";
        document.documentElement.style.overflowX = "auto";
    };
}, []);
    return (
        
        <div className="py-28 relative  ">
            <CustomSeo id={8} />
            {/* <CustomHeroSection heading='Disposable Bazaar' title='Redefining Disposable Excellence' path='About Us' /> */}
            {/* CustomHeroSection */}
            <div className="flex justify-start items-center text-black relative min-h-[450px]" style={{
                background: `url('${Image_Url}CustomHeroAssets/banners.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '25rem',
            }}>
                <div className='md:w-[50%] md:pl-20 pl-10'>
                    <h3 className='md:text-6xl text-5xl font-bazaar text-white'>Disposable Bazaar </h3>

                    <p className='md:text-5xl text-4xl font-bazaar text-white'>Redefining Disposable Excellence</p>
                    <p className='text-lg text-white'><Link href='/'> Home </Link> / About Us</p>
                </div>
                <img data-aos='fade-left' src={`${Image_Url}CustomHeroAssets/rightCup.svg`} className='absolute hidden md:block -bottom-60 right-0 w-35' alt="" />
                <img data-aos='fade-down' src={`${Image_Url}CustomHeroAssets/glass.svg`} className='absolute top-6 md:right-36 right-0 w-35' alt="" />
                <img data-aos='fade-left' src={`${Image_Url}CustomHeroAssets/shopper.svg`} className='absolute md:bottom-16 bottom-8 right-0 w-35' alt="" />
                <img data-aos='fade-up' src={`${Image_Url}CustomHeroAssets/basket.svg`} className='absolute hidden md:block bottom-16 right-[30rem] w-35' alt="" />
                <img data-aos='fade-right' src={`${Image_Url}CustomHeroAssets/shoper.svg`} className='absolute hidden md:block -bottom-44 left-24 w-25' alt="" />
            </div>
            <div className='w-full mt-20 text-white'>
                {/* About Section */}

                <div className='flex flex-wrap justify-center items-center'>
                    <img src={`${Image_Url}AboutUs/About1.png`} alt="About Image" className='w-4/5 md:w-[500px] mb-8 md:mb-0' />
                    <div className='lg:m-12 m-4 lg:w-2/5 text-center flex flex-col justify-center lg:items-start items-center lg:text-left'>
                        <h1 className="text-2xl my-4 text-[#1E7773] font-bazaar">About Us</h1>
                        <h2 className="text-3xl md:text-5xl mb-4 text-white font-bazaar">Everyone Deserves Great Quality</h2>
                        <p className='md:w-3/4 mx-auto md:mx-0'>
                            Food storage is a concern that many households face, especially mommies and wives who work tirelessly to make delicious food for their lovely children and husbands. A similar problem that restaurants face when they have to prepare meals and deliver them to the customer, their first priority is to ensure the safety of the food while keeping it warm. This exact problem is what surged us to bring you Disposable Bazar, a pioneer in disposable food containers and other storage accessories for food items in E-commerce, the first of a kind in Pakistan.
                        </p>
                        <Link href='/contact-us/'>
                            <button
                                type="submit"
                                className='w-fit py-3 pt-4 bg-[#1E7773] text-xl mt-6 px-10 text-white rounded-lg transition duration-300 font-bazaar'
                            >
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Core Values Section */}
                <div className='w-full my-12 '>
                    <h2 className="text-2xl text-center my-4 text-[#1E7773] font-bazaar">Our Values</h2>
                    <h3 className="text-3xl text-center md:text-5xl text-white font-bazaar">Our Core Principles</h3>

                    <div className='flex flex-wrap items-start justify-center'>
                        <div className='text-center flex flex-col justify-center items-center m-8 md:mx-12'>
                            <img src={`${Image_Url}AboutUs/principle1.png`} alt="" className='h-20 w-20' />
                            <h3 className='mt-4 text-2xl font-bazaar'>Exceptional Quality</h3>
                            <p className='w-72 text-sm'>High-grade materials ensure durability and reliability.</p>
                        </div>

                        <div className='text-center md:mt-40 flex flex-col justify-center items-center m-8 md:mx-12'>
                            <img src={`${Image_Url}AboutUs/principle2.png`} alt="" className='h-20 w-20' />
                            <h3 className='mt-4 text-2xl font-bazaar'>Sustainable Choices</h3>
                            <p className='w-72 text-sm'>Eco-friendly and biodegradable options for responsible use.</p>
                        </div>

                        <div className='text-center flex flex-col justify-center items-center m-8 md:mx-12'>
                            <img src={`${Image_Url}AboutUs/principle3.png`} alt="" className='h-20 w-20' />
                            <h3 className='mt-4 text-2xl font-bazaar'>Customer-Centric Service</h3>
                            <p className='w-72 text-sm'>Dedicated support for a seamless shopping experience.</p>
                        </div>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className='w-full pt-20 relative' style={{
                    background: `url('${Image_Url}AboutUs/AboutBg.png')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}>
                    <img data-aos='fade-right' src={`${Image_Url}AboutUs/plate.svg`} className='absolute hidden md:block top-0 left-0 w-18' alt="" />
                    <img data-aos='fade-left' src={`${Image_Url}AboutUs/cup.svg`} className='absolute hidden md:block top-0 right-4 w-18' alt="" />
                    <img data-aos='fade-left' src={`${Image_Url}AboutUs/platter1.svg`} className='absolute hidden md:block bottom-0 right-0 w-18' alt="" />
                    <img data-aos='fade-right' src={`${Image_Url}AboutUs/platter2.svg`} className='absolute hidden md:block -bottom-80 left-0 w-18' alt="" />
                    <h2 className="text-2xl text-center my-4 text-[#1E7773] font-bazaar">Why Choose Us</h2>
                    <h3 className="text-3xl text-center md:text-6xl text-white font-bazaar">Experience the Disposable <br /> Bazaar Difference</h3>

                    <div className='flex lg:flex-row flex-col justify-center lg:items-start items-center w-full mt-12'>
                        <p className='w-4/5 text-base lg:text-start text-center lg:w-1/4 lg:py-10 md:mb-0'>Starting with merely three product variants, Disposable Bazar has helped major businesses in Pakistan while still catering to the need. We now have more than seventy-five product variants and are taking a step further to give our customers a better buying experience. Hence, we at Disposable Bazar are delighted to present to you our e-store with an aim to provide you with premium quality boxes and containers to ensure the mommies, wives, and chefs do not have to worry about storing the food or missing the timely delivery.</p>

                        <img src={`${Image_Url}AboutUs/About2.svg`} alt="About Image" className='w-4/5 md:w-3/5 lg:w-[400px] mx-6 mb-6 md:mb-0' />

                        <p className='w-4/5 text-base lg:text-start text-center lg:w-1/4 lg:py-10'>In 2020 when COVID-19 broke across the earth and the world stopped, restaurants were at a task to fulfill the food needs of the majority of individuals, especially those who couldn’t cook. A sudden rise in demand for restaurant deliveries resulted in the need for disposable boxes and containers to safely deliver the food to customers ensuring it’s warm. While someone had to fill the demand gap, Disposable Bazar emerged as an idea to help restaurants across the country conveniently fulfill orders and satisfy the end consumer.</p>
                    </div>
                </div>

                {/* Final Section */}
                <div className='flex flex-wrap justify-center items-center my-12'>

                    <div className='m-12 md:w-2/5 text-center md:text-left'>
                        <h3 className="text-3xl md:text-6xl mb-4 text-white font-bazaar">35 Years of Trusted Quality in Plastic Industry</h3>
                        <p className='md:w-3/4'>Being associated with the plastic industry for 35+ years, we find high-quality and sustainably manufactured plastic products to ensure complete safety for consumers. Industry experience is what we now celebrate with you by providing premium products at an affordable price range. Our vision is to entail Disposable Bazar as the biggest disposable items online store in Pakistan with the most low-priced and highest-quality products.</p>

                    </div>
                    <img src={`${Image_Url}AboutUs/About3.png`} alt="About Image" className='w-4/5 md:w-3/5 lg:w-[500px]' />
                </div>

                <Blogs />
            </div>
        </div>
    );
}

export default AboutUs;
