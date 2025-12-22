"use client"; // Important for Next.js App Router

import React from "react";
import { FiX } from "react-icons/fi";
import { Assets_Url } from "../../const";
import { useCart } from "../../Context/CartContext";

const CartModal = () => {
  const { cartItems, removeFromCart } = useCart(); // Destructure only what's used

  // Calculate the total price of all cart items
  const calculateTotalPrice = () => {
    if (!Array.isArray(cartItems)) return 0;
    return Math.floor(
      cartItems.reduce((total, item) => total + parseFloat(item.product_total || 0), 0)
    );
  };

  return (
    <div className="p-4">
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <>
          {/* Cart Items */}
          <div className="max-h-[200px] overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4 border-t pt-4 border-gray-300"
              >
                <img
                  src={`${Assets_Url}${item.product_img}`}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex flex-col flex-1 ml-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium">
                      {item.product_name?.split(" ").slice(0, 2).join(" ")}
                      {item.product_name?.split(" ").length > 2 ? "..." : ""}
                    </h4>
                    <button onClick={() => removeFromCart(item.id)}>
                      <FiX size={20} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-700">
                    <p>
                      {item.total_pieces} Pieces
                    </p>
                    <p>Qty: {item.product_quantity}</p>
                    <p>Rs: {Math.floor(item.product_total)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="border-t pt-4 mt-2 flex justify-between items-center text-black font-semibold">
            <p>Total:</p>
            <p>Rs {calculateTotalPrice()}</p>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Your Cart is empty.</p>
      )}
    </div>
  );
};

export default CartModal;
