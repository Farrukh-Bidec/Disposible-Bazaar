"use client";
import React, { useEffect, useState } from 'react';
import { Assets_Url, Image_Not_Found, Image_Url } from '../../const';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from '../../Utils/axios';
import Link from 'next/link';
import { Loader } from '../Loader';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [visibleItems, setVisibleItems] = useState(3);
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    // Initialize AOS animations
    useEffect(() => {
        Aos.init({ duration: 2000, delay: 0 });
    }, []);

    // Fetch blog data from the API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.public.get('blogs/index');
                // Assuming response.data.data contains the list of blogs
                // const filteredBlogs = response.data.data.filter(blog => blog.status === 1);

                // Set the filtered blogs
                setBlogs(response.data.data);
            } catch (error) {
                console.log('Error fetching blogs:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Detect screen size and update visible items accordingly
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setVisibleItems(2); // Show 2 items on mobile
        } else {
            setVisibleItems(3); // Show 3 items on larger screens
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Call it once on component mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isLoading) return <Loader />; // Show loader during data fetch

    return (
        <div className="md:p-20 px-4 py-10 w-full text-white relative">
            <h3 data-aos='fade-right' className='md:text-6xl text-center md:text-start text-4xl font-bazaar'>Our Latest Blog</h3>

            <div className="grid grid-cols-2 lg:grid-cols-3 justify-center items-center md:gap10 gap-4 md:py-10 py-5">
                {blogs.slice(0, visibleItems).map((data, index) => (
                    <Link href={`/${data.slug}`} key={index} data-aos="fade-up" className="flex flex-col gap-2 py-4 w-[180px] md:w-[380px] justify-center items-start" aria-label={`Read ${data.title}`}>
                        <img className="rounded-2xl w-[180px] h-[180px] md:w-[380px] md:h-[380px]" src={`${Assets_Url}${data.main_image}`} alt={data.title}
                            onError={(e) => {
                                e.currentTarget.src = Image_Not_Found; // Path to your dummy image
                            }}
                        />
                        <p className="my-2 md:text-md text-[12px] md:text-sm text-start text-[#898989]">{data.category} | {new Date(data.date).toDateString()}</p>
                        <p className="md:text-xl text-xs text-start font-semibold">{data.title}</p>
                    </Link>
                ))}
            </div>

            <div data-aos='fade-up' className="flex justify-center md:pt-10">
                <Link href='/blog/' aria-label="Read all latest blog posts">
                    <button className='font-bazaar bg-[#1E7773] text-white  p-3 pt-3 rounded-lg cursor-pointer px-5 md:mt-5'>READ MORE</button>
                </Link>
            </div>

            {/* Background Image with AOS */}
            <img
                data-aos='fade-left'
                src={`${Image_Url}HomeAssets/Blogs/blogsBgImg.svg`}
                className='absolute hidden md:block top-0 right-0 w-32'
                alt="Blog Background"
            />
        </div>
    );
}

export default Blogs;
