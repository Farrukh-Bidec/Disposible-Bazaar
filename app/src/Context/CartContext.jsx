"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage (only on client)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cartItems");
      if (savedCart) setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (
    product_id,
    product_name,
    product_quantity,
    pack_size,
    total_pieces,
    price_per_piece,
    product_img,
    product_total,
    product_variants,
    product_color,
    product_size,
    logo,
    product_options,
    product_lids,
    lid,
    lid_Price,
    customizeDetail,
    option_Price,
    bundle_status,
    order_limit,
    packaging_options
  ) => {
    const newItem = {
      id: uuidv4(),
      product_id,
      product_name,
      product_quantity,
      pack_size,
      total_pieces,
      price_per_piece,
      product_img,
      product_total,
      product_variants,
      product_color: product_color || null,
      product_size: product_size || null,
      logo: logo || null,
      product_options: product_options || null,
      product_lids: product_lids || null,
      lid: lid || null,
      lid_Price: lid_Price || 0,
      customizeDetail: customizeDetail || null,
      option_Price: option_Price || 0,
      bundle_status: bundle_status ?? false,
      order_limit: order_limit ?? 1000,
      packaging_options: packaging_options || null,
    };
    setCartItems((prev) => [...prev, newItem]);
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          if (quantity > item.order_limit) {
            toast.warning(`Maximum order limit (${item.order_limit}) reached!`);
            return item;
          }
          const newQuantity = Math.max(1, quantity);
          const packSize = Number(item.pack_size) || 1;
          const productSubTotal =
            item.lid_Price +
            Number(item.price_per_piece) +
            Number(item.option_Price || 0) +
            Number(item?.packaging_options?.price || 0);

          const newTotalPieces = newQuantity * packSize;
          const newProductTotal = newTotalPieces * productSubTotal;

          return {
            ...item,
            product_quantity: newQuantity,
            total_pieces: newTotalPieces,
            product_total: newProductTotal.toFixed(2),
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updatePackSize = (itemId, selectedPackSize) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const selectedVariant = item.product_variants?.find(
            (v) => v.pack_size == selectedPackSize
          );
          if (selectedVariant) {
            const validPackSize = Number(selectedVariant.pack_size) || 1;
            const packPrice = Number(selectedVariant.price) || 0;
            const newTotalPieces = validPackSize * item.product_quantity;
            const newPricePerPiece = Number(selectedVariant.price_per_piece) || 0;
            const newProductTotal = item.lid_Price
              ? newTotalPieces * (newPricePerPiece + Number(item.lid_Price) + Number(item.option_Price || 0) + Number(item?.packaging_options?.price || 0))
              : newTotalPieces * (newPricePerPiece + Number(item.option_Price || 0) + Number(item?.packaging_options?.price || 0));

            return {
              ...item,
              pack_size: validPackSize,
              total_pieces: newTotalPieces,
              price_per_piece: newPricePerPiece.toFixed(2),
              product_total: newProductTotal.toFixed(2),
            };
          }
        }
        return item;
      })
    );
  };

  const updateProductOption = (itemId, newValue, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const selectedOption = item.product_options?.find((option) =>
            type === "size" ? option.size === newValue : option.option === newValue
          );
          const selectedPack = item.product_variants?.find(
            (v) => v.pack_size == item.pack_size
          );
          if (selectedOption && selectedPack) {
            const packPricePerPiece = Number(selectedPack.price) / Number(selectedPack.pack_size) || 0;
            const optionPricePerPiece = Number(selectedOption.options_price || 0);
            const lidsPrice = Number(item.lid_Price || 0);
            const packagingPrice = Number(item?.packaging_options?.price || 0);

            const newPricePerPiece = packPricePerPiece + optionPricePerPiece + lidsPrice + packagingPrice;
            const newProductTotal = item.product_quantity * newPricePerPiece * item.pack_size;

            return {
              ...item,
              product_size: type === "size" ? newValue : item.product_size,
              product_color: type === "color" ? newValue : item.product_color,
              price_per_piece: newPricePerPiece.toFixed(2),
              product_total: newProductTotal.toFixed(2),
            };
          }
        }
        return item;
      })
    );
  };

  const getTotalQuantity = () => cartItems.reduce((total, item) => total + item.product_quantity, 0);
  const getTotalPrice = () => cartItems.reduce((total, item) => total + parseFloat(item.product_total || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        updatePackSize,
        updateProductOption,
        getTotalQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => useContext(CartContext);
