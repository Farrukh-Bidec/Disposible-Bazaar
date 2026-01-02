"use client";
import React, { useEffect, useState } from 'react'
import CustomHeroSection from '../components/CustomHeroSection'
import { CiSearch } from 'react-icons/ci';
import { Assets_Url, Image_Url } from '../const';
import axios from '../Utils/axios';
import Link from 'next/link';
import { RiFilter3Line } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { Loader } from '../components/Loader';
import { GrNext, GrPrevious } from "react-icons/gr";
import CustomDetailSeo from '../components/CustomDetailSeo';
import CustomSeo from '../components/CustomSeo';
import ErrorPage from './ErrorPage';

function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch blogs with pagination
    const fetchData = async (page = 1, category = selectedCategory) => {
        setIsLoading(true);
        setHasError(false); // Reset error state
        try {
            const url = category ? `blogs/category_wise/${category}` : "blogs/index";
            const response = await axios.public.get(url, {
                params: { page, category },
            });

            // ✅ Check if API response contains warning/error
            if (
                response.data.status === "error" ||
                response.data.status === "warning"
            ) {
                setHasError(true);
                setErrorMessage(response.data.message || "Something went wrong");
                setBlogs([]);
                return;
            }

            setBlogs(response.data.data);
            setTotalPages(response.data.pagination.last_page);
        } catch (error) {
            console.log("Error fetching blogs:", error);
            setHasError(true);
            setErrorMessage("Failed to load blogs. Please try again later.");
            setBlogs([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [selectedCategory, currentPage]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        setIsSidebarOpen(false);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    // ✅ FIXED: All conditional returns moved AFTER all hooks
    if (isLoading) return <Loader />

    if (hasError) {
        return <ErrorPage message={errorMessage} />;
    }

    return (
        <div className="relative py-16">
            <CustomSeo id={10} />
                <CustomHeroSection heading='Hot Topics' path='Blog ' bgImage="CustomHeroAssets/banners.png" />
            <div className="lg:hidden flex justify-end p-4">
                <button
                    onClick={toggleSidebar}
                    className="text-white text-xl flex justify-center items-center bg-[#1E7773] p-2 rounded-full"
                >
                    <RiFilter3Line />
                </button>
            </div>
            <div className='flex w-full  text-white'>
                <div className='lg:ml-10 md:w-1/4 w-3/2'>
                    <BlogSidebar blogs={blogs} onCategorySelect={handleCategoryChange} toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                </div>
                <section>
                    <div className='w-full flex flex-wrap justify-center gap-10'>
                        {blogs.length > 0 ? (
                            blogs.map((data) => (
                                <div className='max-w-[380px] w-[270px] md:w-[350px]' key={data.id}>
                                    <Link href={`/${data.slug}`} data-aos="fade-up" className="flex flex-col gap-2 py-4 justify-center items-start" aria-label="Blog">
                                        <img className="rounded-xl w-[270px] h-[270px] md:w-[350px] md:h-[350px] object-cover" src={`${Assets_Url}${data.main_image}`} alt={data.title} />
                                        <p className="md:text-md text-[12px] md:text-sm text-start text-[#898989]">{data.category} | {new Date(data.date).toDateString()}</p>
                                        <p className="md:text-xl text-xs text-start font-semibold">{data.title}</p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No blogs found</p>
                        )}
                    </div>
                    {/* Pagination Controls */}
                    {blogs.length > 0 && (
                        <div className='flex justify-center items-center space-x-2 mt-4'>
                            <button
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                                className={`text-white px-4 py-2 rounded-lg transition duration-300 ${currentPage === 1 ? ' cursor-not-allowed' : ''}`}
                            >
                                <GrPrevious />
                            </button>

                            {/* Page numbers */}
                            <div className='flex space-x-1'>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-3 py-1 rounded-lg transition duration-300 ${currentPage === index + 1 ? 'text-white' : 'text-gray-300'}`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={`text-white px-4 py-2 rounded-lg transition duration-300 ${currentPage === totalPages ? ' cursor-not-allowed' : ''}`}
                            >
                                <GrNext />
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Blog;


export const BlogSidebar = ({ onCategorySelect, toggleSidebar, isSidebarOpen, blogs }) => {
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.public.get('product/category');
                setCategories(response.data.data);
                setFilteredCategories(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filtered = categories.filter((category) =>
            category.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCategories(filtered);
    };

    const instagram = [
        "HomeAssets/InstaFeed/instaImg01.svg",
        "HomeAssets/InstaFeed/instaImg02.svg",
        "HomeAssets/InstaFeed/instaImg01.svg",
        "HomeAssets/InstaFeed/instaImg02.svg",
        "HomeAssets/InstaFeed/instaImg01.svg",
        "HomeAssets/InstaFeed/instaImg02.svg",
    ];

    return (
        <div
            className={`fixed lg:static lg:block bg-[#33333F] lg:bg-transparent top-0 left-0 w-2/3 lg:w-full h-auto overflow-y-scroll lg:overflow-y-auto text-white p-4 lg:rounded-lg transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}
        >
            {/* Close button for mobile */}
            <div className="lg:hidden flex justify-end">
                <button
                    onClick={toggleSidebar}
                    className="text-white text-xl p-2"
                >
                    <RxCross2 />
                </button>
            </div>

            {/* Search bar */}
            <div className='flex justify-between bg-[#33333F] items-center rounded-lg p-1 py-2 px-2 mb-6'>
                <input
                    type="text"
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={handleSearch}
                    className='bg-[#33333F] focus:outline-none'
                />
                <CiSearch />
            </div>

            {/* Categories Section */}
            <div className="mb-6 p-4 bg-[#33333F] rounded-lg">
                <h2 className="text-lg font-semibold mb-4">CATEGORIES</h2>
                <ul className="h-[300px] lg:h-auto overflow-y-scroll lg:overflow-y-auto">
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category) => (
                            <li
                                key={category.id}
                                className="text-base hover:text-gray-400 cursor-pointer border-b border-gray-500 py-4"
                                onClick={() => onCategorySelect(category.id)}
                            >
                                {category.name}
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-400">No categories found</p>
                    )}
                </ul>
            </div>

            {/* Top Posts Section */}
            <div className='mb-2 p-4 bg-[#33333F] rounded-lg'>
                <h2 className="text-lg font-semibold mb-4">TOP POSTS</h2>
                <ul className="h-[300px] lg:h-auto overflow-y-scroll lg:overflow-y-auto">
                    {blogs.slice(0, 2).map((post) => (
                        <li key={post.id} className="text-sm border-b border-gray-500 py-4">
                            <div className="flex space-x-2">
                                <span className="text-sm font-semibold">{post.id}</span>
                                <div>
                                    <h3 className="font-medium text-sm">{post.title}</h3>
                                    <p className="text-xs text-gray-400">Categories: {post.category} - {post.date}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Instagram Section */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4 p-4 pb-2">INSTAGRAM</h2>
                <div className="flex flex-wrap">
                    {instagram.map((insta, index) => (
                        <img key={index} src={`${Image_Url}${insta}`} alt="" className='w-[80px] h-[80px] my-1' />
                    ))}
                </div>
            </div>
        </div>
    );
};