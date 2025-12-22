"use client";

import React, { useEffect, useRef, useState } from 'react'
import '../Custom.css'
import axios from '../../Utils/axios';
import CategorySlider from './CategorySlider';
import { Loader } from '../Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import AOS from "aos";
import 'aos/dist/aos.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import '../Custom.css';

import { Pagination, Navigation } from 'swiper/modules';

function Categories() {
    const [category, setCategory] = useState('aluminium containers');  // Default empty
    const [categories, setCategories] = useState([
        { id: 15, name: 'Transparent Containers' },
        { id: 17, name: 'Plastic Containers (Black Edition)' },
        // { id: 20, name: 'Thin Plastic' },
        { id: 21, name: 'Juice Cup' },
        { id: 22, name: 'Coffee Cup' },
    ]);  // List of categories
    const [categoryList, setCategoryList] = useState([]);  // Products for the selected category
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    // State for drag functionality
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const scrollRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2;  // Adjust scroll speed
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch categories from the API
                const response = await axios.public.get("product/category?sectionName=productsSliderTop");
                const categoryData = response.data.data;

                setCategories(categoryData);

                // Set default category as the first one and fetch its products
                if (categoryData.length > 0) {
                    const firstCategory = categoryData[0];  // First category
                    setCategory(firstCategory.name.trim().toLowerCase());  // Set the first category name
                    fetchCategoryProducts(firstCategory.id);  // Fetch products for the first category
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false)
            }
        };
        fetchData();

        // Clean up mouse events
        const handleMouseLeave = () => setIsDragging(false);
        window.addEventListener('mouseup', handleMouseLeave);
        return () => window.removeEventListener('mouseup', handleMouseLeave);
    }, []);

    const fetchCategoryProducts = async (categoryId) => {
        setIsLoading(true)
        try {
            const response = await axios.public.get(`home/category/${categoryId}/product`);
            setCategoryList(response.data.data);  // Set the products for the selected category
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    };
    useEffect(() => {
        fetchCategoryProducts(18);
    }, []);
    const handleCategory = (selectedCategory) => {
        fetchCategoryProducts(selectedCategory.id);  // Fetch products for the clicked category
        setCategory(selectedCategory.name.trim().toLowerCase());  // Set the selected category
    };

    // if (isLoading) return <Loader />

    return (
        <div className="pt-10 ">
            <div className="flex justify-center items-center w-full">
                <ul
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className="flex text-white cursor-pointer gap-5 text-lg justify-start items-center w-2/3 md:w-1/2 overflow-x-auto whitespace-nowrap scrollbar-hide"
                    style={{ scrollbarWidth: '2px' }}
                >
                    <CategorySliderTop categories={categories} category={category} handleCategory={handleCategory} />
                </ul>
            </div>
            <div className="pt-10">
                <div className="flex justify-center items-center px-2 lg:px-20">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <CategorySlider products={categoryList} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Categories;

function CategorySliderTop({ categories, category, handleCategory }) {
    useEffect(() => {
        AOS.init({ duration: 1000, delay: 0 });
    }, []);

    return (
        <div className="relative w-full">
            <Swiper
                breakpoints={{
                    120: {
                        slidesPerView: 1,
                    },
                    620: {
                        slidesPerView: 2,
                    },
                }}
                spaceBetween={0}
                navigation={{
                    nextEl: '.custom-next-top',
                    prevEl: '.custom-prev-top',
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper w-[80%]"
            >
                {categories.map((product) => (
                    <SwiperSlide key={product.id}>
                        <li
                            onClick={() => handleCategory(product)}
                            className={`cursor-pointer list-none text-center text-lg md:text-base font-medium py-4 border-b-2 border-transparent hover:text-gray-300 hover:border-b-gray-300 duration-300 ${category === product.name.trim().toLowerCase()
                                ? 'text-white border-b-white'
                                : 'text-[#9F9F9F]'
                                }`}
                        >
                            {product.name}
                        </li>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom navigation buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full justify-between px-6 z-10">
                <div
                    className="custom-prev-top swiper-button-prev mr-32"
                    style={{
                        // backgroundColor: '#1E7773',
                        color: '#F5F5F5',
                        borderRadius: '100%',
                        width: '1.5rem',
                        height: '1.5rem',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                </div>
                <div
                    className="custom-next-top swiper-button-next"
                    style={{
                        // backgroundColor: '#1E7773',
                        color: '#F5F5F5',
                        borderRadius: '100%',
                        width: '1.5rem',
                        height: '1.5rem',
                        display: 'flex',
                       
                        justifyContent: 'center',
                    }}
                >
                </div>
            </div>
        </div>
    );
}
