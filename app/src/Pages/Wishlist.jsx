"use client";
import React, { useEffect, useState } from 'react'
import { Assets_Url, Image_Url } from '../const';
import Hamburger from '../components/Hamburger';
import { RxCross2 } from 'react-icons/rx';
import { HiShoppingCart } from 'react-icons/hi';
import axios from '../Utils/axios';
import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
// import dynamic from "next/dynamic";
import CustomSeo from '../components/CustomSeo';




function Wishlist() {
    // const CustomSeo = dynamic(() => import("../components/CustomSeo"), { ssr: false });

    const [wishlist, setWishList] = useState([])
    const { removeFromWishlist } = useWishlist();  // Access the addToWishlist function from context
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.protected.get('user/wishlist/get');
                setWishList(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

  




    const handleDelete = async (wishlistId) => {
        try {
            // Replace '1' with the dynamic wishlistId passed as a prop
            const response = await axios.protected.post(`user/wishlist/delete/${wishlistId}`);
            console.log('Wishlist item deleted:', response.data);
            if (wishlistId) {
                removeFromWishlist();
            }

            // Update the wishlist by removing the deleted item (assuming setWishlist updates the state)
            setWishList((prevWishlist) => prevWishlist.filter(item => item.id !== wishlistId));
        } catch (error) {
            console.error('Error deleting wishlist item:', error);
        }
    };



    // const handleDelete = async (wishlistId) => {
    //     try {
    //         await axios.protected.post(`user/wishlist/delete/${wishlistId}`);
    //         removeFromWishlist();
    //         setWishList((prev) => prev.filter((item) => item.id !== wishlistId));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };





    // const handleAddCart = (product) => {
    //     console.log(product);

    //     const product_id = variant.product.id;
    //     const product_name = variant.product.name;

    //     // Convert to number
    //     const pack_size = Number(product.variants[0].pack_size);
    //     const product_quantity = 1;
    //     const total_pieces = pack_size; // total_pieces is the same as pack_size

    //     // Convert to number
    //     const price_per_piece = Number(product.variants[0].price_per_piece);

    //     // Calculate total
    //     const product_total = (price_per_piece * total_pieces).toFixed(2); // Format to 2 decimal places

    //     const product_img =variant.product.image_path;
    //     const product_variants = product.variants;

    //     // Add the product to the cart
    //     addToCart(product_id, product_name, product_quantity, pack_size, total_pieces, price_per_piece, product_img, product_total, product_variants);

    //     // Show success toast
    //     toast.success(`${product.name} added to cart`);
    // };
const handleAddCart = (variant) => {
    console.log("VARIANT:", variant);

    const product_id = variant.product.id;
    const product_name = variant.product.name;

    const product_quantity = 1;

    // Wishlist variant me pack_size nahi hota
    const total_pieces = 1;

    const price_per_piece = Number(variant.price_per_peice || 0);

    const product_total = Number(variant.price || 0).toFixed(2);

    const product_img = variant.product.image_path;

    const product_variants = [variant];

    addToCart(
        product_id,
        product_name,
        product_quantity,
        null,               // pack_size not available
        total_pieces,
        price_per_piece,
        product_img,
        product_total,
        product_variants
    );

    toast.success(`${product_name} added to cart`);
};




    return (
        <div className="relative py-32 md:px-10 px-5">

            <CustomSeo id={11} />

            <ToastContainer autoClose={500} />
            <div className="text-white py-4">
                <Hamburger firstPage='Home ' secondPage='WishList' />
                <h3 className='text-6xl pt-10 font-bazaar'>Your WishList</h3>
            </div>
            <section className='text-white flex lg:flex-row flex-col-reverse lg:gap-8'>
                {/* desktop responsive */}
                <div className="hidden md:flex flex flex-col justify-center itemsbetween text-white py-4 w-full">
                    <div className="grid grid-cols-12 gap-4 py-5 border-b border-gray-600">
                        <div className="col-span-2">Product</div>
                        <div className="col-span-6">Title</div>
                        {/* <div className="col-span-2">Quantity</div> */}
                        {/* <div className="col-span-2">Total Piece</div> */}
                        <div className="col-span-2">Total Price</div>
                        <div className="col-span-2">Add Item</div>
                    </div>

                    {wishlist.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 justify-center gap-4 py-4 border-t border-gray-600 items-center">
                            <div className="col-span-2 flex items-center">
                                {/* <button
                                    className="mr-2 text-white"
                                    onClick={() => handleDelete(item.product_variant.product.id)} // Use arrow function to pass product.id
                                >
                                    <RxCross2 />
                                </button> */}


<button
  className="mr-2 text-white"
  onClick={() => handleDelete(item.id)}
>
  <RxCross2 className='cursor-pointer' />
</button>



                                <img src={`${Assets_Url}${item.product_variant.product.image_path}`} alt={item.product_variant.product.name} className="w-28 h-28 border-2 border-[#1E7773] rounded-xl object-cover" />
                            </div>

                            <div className="col-span-6 text-xl font-semibold textright">
                                <div className="ml5 w32">{item.product_variant.product.name}</div>
                            </div>
                            <div className="col-span-2 text-2xl font-semibold text-left">
                                Rs: {item.product_variant.price}
                                <div className="text-xs text-gray-400">Per Pieces: {item.product_variant.price_per_peice}Rs</div>
                            </div>
                            <div className="col-span-2 text-md">
                                <button
                                    className="bg-[#1E7773] w-32 rounded-lg font-bazaar cursor-pointer p-2 pt-3"
                                    onClick={() => handleAddCart(item.product_variant)}
                                >
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* mobile responsive */}
                <div className="md:hidden flex flex flex-col itemsbetween text-white py-4 lg:w-4/5 w-full">
                    {wishlist.map((item, index) => (
                        <div key={index} className="flex  gap-4 py-8 border-b border-gray-600 justify-center items-center">
                            <div className="flex items-center">
                                <button className="mr-2 text-white"><RxCross2 /></button>
                                <img src={`${Assets_Url}${item.product_variant.product.image_path}`} alt={item.product_variant.product.name} className="w-40 h-32 border-2 border-[#1E7773] rounded-xl object-cover" />
                            </div>
                            <div className="flex flex-col  gap-2 px4">
                                <div>{item.product_variant.product.name}</div>
                                <div className="flex flex-row justify-between items-center">
                                    <div className="md:text-2xl text-lg font-semibold text-start">
                                        Rs:  {item.product_variant.price}
                                        <div className="text-xs text-gray-400">Per Pieces: {item.product_variant.price_per_peice}Rs</div>
                                    </div>
                                    <button className='bg-[#1E7773] w12 text-xl cursor-pointer rounded-lg font-bazaar p1 p-3' onClick={() => handleAddCart(product)}><HiShoppingCart /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {/* Background Image */}
            {/* <img
                data-aos="fade-right"
                className="absolute top-[16rem] -left-8 w-20"
                src={`${Image_Url}FooterAssets/footerRightImg.svg`}
                alt="Plate"
            />
            <img
                data-aos="fade-left"
                className="absolute -bottom-30 -right-4 w-20"
                src={`${Image_Url}HomeAssets/PremiumAssets/shoper.svg`}
                alt="Plate"
            /> */}
        </div>
    )
}

export default Wishlist
