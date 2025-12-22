"use client";
import React from "react";
import { FiX, FiPlus, FiMinus } from "react-icons/fi";
import { Assets_Url, Image_Url } from "../../const";
import { useCart } from "../../Context/CartContext";
import { useBundle } from "../Context/BundleContext";

export const BundleModal = () => {
    const { bundleitems, removeFromCart } =
        useBundle();

    // Calculate the total price of the entire wishlist
    const calculateTotalPrice = () => {
        const total = cartItems.reduce(
            (total, item) => total + parseFloat(item.product_total || 0),
            0
        );
        return Math.floor(total);
    };

    return (
        <div>
            {Array.isArray(bundleitems) && bundleitems.length > 0 ? (
                <>
                    <div className="mt-4 max-h-[190px] overflow-y-auto">
                        {bundleitems.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-around items-center mb-4 border-t pt-4 border-[#D9D9D9] mr-4"
                            >
                                <img
                                    src={`${Assets_Url}${item.product_img}`}
                                    alt={item.product_name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex flex-col items-start md:w-[70%]">
                                    <div className="flex justify-between items-center w-full mb-2 text-black">
                                        <h4 className="text-[15px]">
                                            {item.product_name?.split(" ").slice(0, 2).join(" ")}
                                            {item.product_name?.split(" ").length > 2 ? ".." : ""}
                                        </h4>
                                        <button onClick={() => removeFromCart(item.id)}>
                                            <FiX size={20} className="text-[#323232]" />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap gap-[10px] md:gap-[1px] justify-between w-full">
                                        <div className="flex gap-[10px] items-center text-[9px]">
                                            <p className="text-[10px] bg-green w-[70px] h-[20px] rounded-[4px] py-[3px] pl-2 pr-2 text-black font-medium">
                                                {item.total_pieces} {"Pieces"}
                                            </p>


                                            <div className="flex">
                                                <div className="flex gap-[5px] justify-between items-center w-[40px] h-[20px] p-[5px] rounded-[4px] ">
                                                    <p className="text-[10px] font-medium text-black">
                                                        {item.product_quantity} {"Qty"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center items-center">
                                            <p className="text-[10px] md:text-[12px] text-black">
                                                Rs: {Math.floor(item.product_total)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="border-t text-black pt-4 flex gap-[10px] flex-col justify-between items-center">
                        <div className="flex justify-between w-[90%]">
                            <p>Total:</p>
                            <p className="font-bold">Rs {calculateTotalPrice()}</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Your Cart is empty.</p>
            )}
        </div>
    )
}
