"use client";

import React, { useState, useEffect } from "react";
import { Assets_Url, Image_Url } from "../../const";
import Hamburger from "../../components/Hamburger";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineNavigateBefore } from "react-icons/md";
import Link from "next/link";
import { useCart } from "../../Context/CartContext";
import CustomSeo from "../../components/CustomSeo";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Cart() {
    const { cartItems, removeFromCart, updateQuantity, updatePackSize, updateProductOption } = useCart();
    const [subtotal, setSubtotal] = useState(0);

    // Calculate subtotal
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => {
            return sum + (Number(item.product_total) || 0);
        }, 0);
        setSubtotal(total);
    }, [cartItems]);

    const deliveryCharges = 0;
    const total = subtotal + deliveryCharges;

    const handleRemove = (id) => removeFromCart(id);

    return (
        <div className="relative py-32 md:px-10 px-5 ">
            <ToastContainer autoClose={500} />
                <CustomSeo slug="cart" />

            <div className="text-white py-4">
                <Hamburger firstPage="Home" secondPage="Cart" />
                <h4 className="text-6xl pt-10 font-bazaar">Your Cart</h4>
            </div>

            <section className="text-white flex lg:flex-row flex-col-reverse lg:gap-8">
                {/* Desktop */}
                <div className="hidden md:flex flex-col w-full">
                    <div className="grid grid-cols-12 gap-4 py-5 border-b border-gray-600">
                        <div className="col-span-4">Product</div>
                        <div className="col-span-2">Pack Size</div>
                        <div className="col-span-2">Quantity</div>
                        <div className="col-span-2">Total Pieces</div>
                        <div className="col-span-2">Total Price</div>
                    </div>

                    {cartItems.length === 0 && (
                        <div className="flex justify-center py-10 text-4xl font-bazaar">
                            Your Cart is Empty
                        </div>
                    )}

                    {cartItems.map((product) => (
                        <div key={product.id} className="grid grid-cols-12 gap-4 py-4 border-t border-gray-600 items-center">
                            <div className="col-span-4 flex items-center">
                                <button className="mr-2 text-white cursor-pointer" onClick={() => handleRemove(product.id)}>
                                    <RxCross2 />
                                </button>
                                <img src={`${Assets_Url}${product.product_img}`} alt={product.product_name} className="w-28 h-20 border-2 border-[#1E7773] rounded-xl object-cover" />
                                <div className="ml-5">
                                    <h4>{product.product_name}</h4>
                                </div>
                            </div>

                            <div className="col-span-2">
                                {product.product_variants?.length > 0 && (
                                    <select
                                        className="bg-[#20202C] border border-[#1E7773] rounded-lg w-24 p-2 outline-none"
                                        value={product.pack_size}
                                        onChange={(e) => updatePackSize(product.id, Number(e.target.value))}
                                    >
                                        {product.product_variants.map((variant) => (
                                            <option key={variant.id} value={variant.pack_size}>
                                                {variant.pack_size} Pcs
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            <div className="col-span-2 flex justify-around items-center px-2 border border-[#1E7773] w-24 rounded-lg">
                                <button onClick={() => updateQuantity(product.id, Math.max(1, product.product_quantity - 1))} className="text-white">-</button>
                                <input type="text" readOnly value={product.product_quantity} className="w-12 text-center bg-transparent border-none text-white" />
                                <button onClick={() => updateQuantity(product.id, product.product_quantity + 1)} className="text-white">+</button>
                            </div>

                            <div className="col-span-2 border border-[#1E7773] w-24 rounded-lg text-center py-2">
                                {product.total_pieces} Pcs
                            </div>

                            <div className="col-span-2 text-2xl font-semibold">
                                Rs: {Number(product.product_total).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile */}
                <div className="md:hidden flex flex-col w-full py-4">
                    {cartItems.length === 0 && (
                        <div className="flex justify-center py-10 text-4xl font-bazaar">
                            Your Cart is Empty
                        </div>
                    )}
                    {cartItems.map((product) => (
                        <div key={product.id} className="flex gap-4 py-8 border-b border-gray-600 items-center">
                            <div className="flex items-center">
                                <button className="mr-2 text-white" onClick={() => handleRemove(product.id)}><RxCross2 /></button>
                                <img src={`${Assets_Url}${product.product_img}`} alt={product.product_name} className="w-20 h-16 border-2 border-[#1E7773] rounded-xl object-cover" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4>{product.product_name}</h4>
                                <p>Rs: {Number(product.product_total).toLocaleString()}</p>
                                <p>Qty: {product.product_quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart Summary */}
                <div className="border px-3 lg:border-none border-[#1E7773] rounded-lg flex flex-col justify-start py-5 gap-3 lg:w-1/5 md:w-1/2">
                    <h4 className="text-3xl font-semibold">Cart Totals</h4>
                    <div className="flex flex-col justify-start pt-5 gap-3">
                        <div className="flex justify-between text-lg">
                            <span>Subtotal:</span>
                            <span>Rs {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg">
                            <span>Delivery Charges:</span>
                            <span>Rs {deliveryCharges.toLocaleString()}</span>
                        </div>
                        <hr className="border-gray-500" />
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total:</span>
                            <span>Rs {total.toLocaleString()}</span>
                        </div>

                        <div className="flex flex-col gap-2 mt-5">
                            <Link href="/checkout/">
                                <button className={`bg-[#1E7773] cursor-pointer w-full rounded-lg p-2 ${cartItems.length === 0 ? 'hidden' : 'block'}`}>PURCHASE</button>
                            </Link>
                            <Link href="/shop/">
                                <button className="flex items-center justify-center border text-[12px]  border-[#1E7773] w-full rounded-lg p-2">
                                    <MdOutlineNavigateBefore size={20} /> <span className="ml-1 cursor-pointer">CONTINUE SHOPPING</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Background Images */}
            {/* <img className="absolute top-[16rem] -left-8 w-20" src={`${Image_Url}FooterAssets/footerRightImg.svg`} alt="Plate" /> */}
            {/* <img className="absolute -bottom-30 -right-4 w-20" src={`${Image_Url}HomeAssets/PremiumAssets/shoper.svg`} alt="Plate" /> */}
        </div>
    );
}

export default Cart;
