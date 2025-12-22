"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getAccessToken, getUserData } from "../Utils/storage";

// Create Context
const UserContext = createContext(null);

// Custom hook
export const useUser = () => useContext(UserContext);

// Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getAccessToken();
        const userData = getUserData();

        if (token && userData) {
            setUser(userData);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
