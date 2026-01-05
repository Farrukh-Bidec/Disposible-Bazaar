"use client";

import React, { useEffect, useState } from 'react'
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
        } else {
          console.log("No categories found in API response.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchData();
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
        <CategorySliderTop categories={categories} category={category} handleCategory={handleCategory} />
      </div>
      <div className="pt-10">
        <div className="flex justify-center items-center px-2 lg:px-20">
          {isLoading ? (
            <Loader />
          ) : categoryList.length > 0 ? (
            <CategorySlider products={categoryList} />
          ) : (
            <p className="text-gray-400 text-lg font-medium">
              No products found
            </p>
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
    <div className="relative w-[70%]">
      <Swiper
        breakpoints={{
          120: { slidesPerView: 1 },
          620: { slidesPerView: 2 },
        }}
        navigation={{
          nextEl: '.custom-next-top',
          prevEl: '.custom-prev-top',
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper w-[80%]"
      >
        { }

        {categories.map((product) => (
          <SwiperSlide key={product.id}>
            <button
              onClick={() => handleCategory(product)}
              className={`w-80 text-center text-lg md:text-base font-medium py-4 border-b-2 border-transparent hover:text-gray-300 hover:border-b-gray-300 duration-300 ${category === product.name.trim().toLowerCase()
                ? 'text-white border-b-white'
                : 'text-[#9F9F9F]'
                }`}
            >
              {product.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full justify-between px-6 z-10">
        <div className="custom-prev-top swiper-button-prev mr-32" />
        <div className="custom-next-top swiper-button-next" />
      </div>
    </div>
  );
}
