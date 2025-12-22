"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const CheckoutModal = ({ setIsModal, isModal, setAsGuest, handleCheckOut }) => {
    //   const [isOpen, setIsOpen] = useState(true);

    //   const closeModal = () => {
    //     setIsOpen(false);
    //   };
    const handleContinueAsGuest = () => {
        setAsGuest(0); // Set to guest checkout
        setIsModal(false); // Close modal  
        handleCheckOut();
    };
    return (
        <>
            {isModal && (
                <div className="fixed inset-0  flex items-center justify-center z-50">
                    <div className="bg-white text-black w-full md:w-2/5 py-10 p-6 rounded-lg shadow-lg relative">
                        {/* Close button */}
                        <button
                            onClick={() => setIsModal(false)}
                            className="absolute top-1 right-3 text-xl text-gray-600 hover:text-gray-700"
                        >
                            &times;
                        </button>

                        {/* Modal Heading */}
                        <h2 className="text-xl md:text-3xl font-bold text-center mb-4">
                            How Would You Like to Proceed?
                        </h2>

                        {/* Subtext */}
                        <p className="text-black  text-center text-xs md:text-sm mb-6">
                            You can continue as a guest or create an account for a faster checkout in the future
                        </p>

                        {/* Buttons */}
                        <div className="flex justify-center gap-1 md:space-x-2">
                            <button className="bg-[#1E7773] font-bazaar text-white px-1 py-1 md:py-2 md:pt-2.5 md:px-6 rounded-lg hover:bg-[#164e4d]"
                                onClick={handleContinueAsGuest}>
                                CONTINUE AS GUEST
                            </button>
                            <button className="bg-white border-2 border-[#1E7773] font-bazaar text-[#1E7773] px-1 py-1 md:py-2 md:pt-2.5 md:px-6 rounded-lg hover:bg-gray-100">
                                <Link href='/register/'> CONTINUE WITH SIGNUP</Link>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}; 

export default CheckoutModal;
