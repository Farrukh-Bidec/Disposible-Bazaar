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
import { useCart } from '../../Context/CartContext';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
// import { Link } from 'react-router-dom';
import Link from 'next/link';


// Premium Section
function RcmdProduct({ products, setIsCartModalOpen }) {
    const { addToCart } = useCart();  // Add parentheses to invoke the hook
    const [cartLoader, setCartLoader] = useState(null);

    const handleAddCart = (product) => {


        const product_id = product.id;
        const product_name = product.name;

        // Check if product_variants exists and has at least one item
        if (!product.product_variants || product.product_variants.length === 0) {
            // console.error("Product variants are not available.");
            // toast.error("Product variants are not available.");
            return; // Exit the function if variants are not available
        }

        // Now it's safe to access the first variant
        const pack_size = Number(product.product_variants[0].pack_size);
        const product_quantity = 1;
        const total_pieces = product_quantity * pack_size;

        const price_per_piece = Number(product.product_variants[0].price_per_piece);
        // const product_total = (price_per_piece * total_pieces).toFixed(2);
                  // Calculate base total
  const baseTotal = (price_per_piece * total_pieces);

  // Apply discount if available
  let finalTotal = baseTotal;
  const discountPercentage = parseFloat(product?.activeDiscount?.discount_percentage);
  if (!isNaN(discountPercentage) && discountPercentage > 0) {
    finalTotal = baseTotal - (baseTotal * (discountPercentage / 100));
  }
  const product_total = finalTotal.toFixed(2);

        const product_img = product.image_path;
        const product_variants = product.product_variants;

        // Add the product to the cart
        addToCart(product_id, product_name, product_quantity, pack_size, total_pieces, price_per_piece, product_img, product_total, product_variants);
        setCartLoader(product_id); // Show "Item Added" message
        setIsCartModalOpen(true)
        setTimeout(() => {
            setCartLoader(null); // Hide the message after 3 seconds
        }, 3000); // Adjust the timeout as needed (3 seconds here)
        // Show success toast
        // toast.success(`${product.name} added to cart`);
    };


    return (
        <>

            <div className="md:p-20 md:pb-0 py-10  relative">
                <h3 className='text-center text-4xl md:text-6xl font-bazaar pb-10'>Related Product</h3>

                <Slider products={products} handleAddCart={handleAddCart} cartLoader={cartLoader} />
            </div>
        </>
    )
}

export default RcmdProduct

function Slider({ products, handleAddCart, cartLoader }) {


    return (
        <>

            <Swiper
                breakpoints={{

                    420: {
                        slidesPerView: 1,
                    },
                    520: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1000: {
                        slidesPerView: 3,
                    },
                }}
                spaceBetween={10}
                navigation={{
                    nextEl: '.custom-next',
                    prevEl: '.custom-prev',
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper min-h-[280px] md:min-h-[500px] min-w-full"
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <div className="group border border-[#1E7773] bg-[#32303e] p-3 flex flex-col justify-center gap-3 items-start w-full md:w-[250px] lg:w-[350px]   text-white rounded-2xl"
                        // style={{ transition: 'height 0.5s ease, opacity 0.5s ease 0.3s' }}
                        >
                            <Link href={`/product/${product.slug}`}>
                                {/* <img src={product.image_path === null ? `${Assets_Url}${product.product_image[0]?.image}` : `${Image_Url}defaultImage.svg`} alt="" className='block w-[350px] h-[350px] group-hover:hidden'
                                    onError={(e) => {
                                        e.currentTarget.src = Image_Not_Found; // Path to your dummy image
                                    }} /> */}
                                <img src={product.product_image[0]?.image === null ? `${Image_Url}defaultImage.svg` : `${Assets_Url}${product.product_image[0]?.image}`} alt="" className='block w-[350px] h-[350px] group-hover:hidden'
                                    onError={(e) => {
                                        e.currentTarget.src = Image_Not_Found; // Path to your dummy image
                                    }} />
                                <img src={product.product_image[1]?.image === null ? `${Image_Url}defaultImage.svg` : `${Assets_Url}${product.product_image[1]?.image}`} alt="" className='hidden w-[350px] h-[350px] group-hover:block'
                                    onError={(e) => {
                                        e.currentTarget.src = Image_Not_Found; // Path to your dummy image
                                    }} />
                            </Link>
                            <h2 className="font-bold  text-sm md:text-lg ">{product.name}</h2>
                            <h2 className="font-semibold text-sm md:text-lg">
                                {product.product_variants && product.product_variants.length > 0 ? (
                                    <>
                                        Rs {parseFloat(product.product_variants[0].price).toFixed(2)} -
                                        Rs {parseFloat(product.product_variants[product.product_variants.length - 1].price).toFixed(2)}
                                    </>
                                ) : (
                                    <>Rs NaN</>
                                )}
                            </h2>

                            <button
                                className=" duration-500 bg-[#1E7773] font-bazaar p-3 w-full rounded-lg text-xs md:text-lg"
                                onClick={() => handleAddCart(product)}
                            >
                                {cartLoader === product.id ? 'ITEM ADDED TO CART' : 'ADD TO CART'}
                            </button>
                            {/* </div> */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper >

            {/* Custom navigation buttons */}
            <div className="absolute z-10 top-[20rem]  w-full left-0 hidden lg:block">
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


