"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "../Utils/axios"; 

// Create the context
const WishlistContext = createContext(null);

// WishlistProvider managing wishlist count
export const WishlistProvider = ({ children }) => {
    const [wishlistCount, setWishlistCount] = useState(0);

    // Fetch initial wishlist count from API
    // useEffect(() => {
    //     const fetchWishlistCount = async () => {
    //         try {
    //             const response = await axios.protected.get("/user/wishlist/count");
    //             setWishlistCount(response.data.count);
    //         } catch (error) {
    //             console.error("Error fetching wishlist count:", error);
    //         }
    //     };

    //     fetchWishlistCount();
    // }, []);

    // Increase wishlist count
    const addToWishlist = () => {
        setWishlistCount(prev => prev + 1);
    };

    // Decrease wishlist count
    const removeFromWishlist = () => {
        setWishlistCount(prev => (prev > 0 ? prev - 1 : 0));
    };

    return (
        <WishlistContext.Provider
            value={{ wishlistCount, addToWishlist, removeFromWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

// Custom hook to use the wishlist context
export const useWishlist = () => useContext(WishlistContext);
