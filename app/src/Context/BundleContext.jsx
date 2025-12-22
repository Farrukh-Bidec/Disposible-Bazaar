"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const BundleContext = createContext();

export const BundleProvider = ({ children }) => {
  const [bundleItems, setBundleItems] = useState([]);

  // Load bundle from localStorage safely (CSR only)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bundleItems");
      if (saved) {
        setBundleItems(JSON.parse(saved));
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bundleItems", JSON.stringify(bundleItems));
    }
  }, [bundleItems]);

  // ADD ITEM
  const addToBundle = (
    product_id,
    product_name,
    product_quantity,
    total_pieces,
    price_per_piece,
    product_img,
    product_total
  ) => {
    const newItem = {
      id: uuidv4(),
      product_id,
      product_name,
      product_quantity,
      total_pieces,
      price_per_piece,
      product_img,
      product_total,
    };

    setBundleItems((prev) => [...prev, newItem]);
  };

  // UPDATE QUANTITY
  const updateQuantity = (itemId, quantity) => {
    setBundleItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const newQty = Math.max(1, quantity);
          const packSize = Number(item.pack_size) || 1;
          const productSubTotal =
            Number(item.lid_Price ?? 0) +
            Number(item.price_per_piece ?? 0) +
            Number(item.option_Price ?? 0);

          const newTotalPieces = newQty * packSize;
          const newProductTotal = newTotalPieces * productSubTotal;

          return {
            ...item,
            product_quantity: newQty,
            total_pieces: newTotalPieces,
            product_total: newProductTotal.toFixed(2),
          };
        }
        return item;
      })
    );
  };

  // REMOVE ITEM
  const removeFromCart = (itemId) => {
    setBundleItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <BundleContext.Provider
      value={{ bundleItems, addToBundle, updateQuantity, removeFromCart }}
    >
      {children}
    </BundleContext.Provider>
  );
};

export const useBundle = () => useContext(BundleContext);
