"use client";

const TOKEN_KEY = "access_token";
const USER_KEY = "user_data";

// Safe check for browser environment
const isBrowser = () => typeof window !== "undefined";

// -------------------- Token --------------------

export const setAccessToken = (token) => {
  try {
    if (!isBrowser()) return; // Prevent SSR errors

    if (token !== null) {
      localStorage.setItem(TOKEN_KEY, token);
      console.log("Access token stored successfully");
    } else {
      localStorage.removeItem(TOKEN_KEY);
      console.warn("Attempted to store a null token");
    }
  } catch (e) {
    console.error("Error storing access token:", e);
  }
};

export const getAccessToken = () => {
  try {
    if (!isBrowser()) return null;

    return localStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error("Error retrieving access token:", e);
    return null;
  }
};

// -------------------- User Data --------------------

export const setUserData = (user) => {
  try {
    if (!isBrowser()) return;

    if (user !== null) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      console.log("User data stored successfully");
    } else {
      localStorage.removeItem(USER_KEY);
      console.warn("Attempted to store null user data");
    }
  } catch (e) {
    console.error("Error storing user data:", e);
  }
};

export const getUserData = () => {
  try {
    if (!isBrowser()) return null;

    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error("Error retrieving user data:", e);
    return null;
  }
};

// -------------------- Remove --------------------

export const removeAccessToken = () => {
  try {
    if (!isBrowser()) return;

    localStorage.removeItem(TOKEN_KEY);
    console.log("Access token removed successfully");
  } catch (e) {
    console.error("Error removing access token:", e);
  }
};

export const removeUserData = () => {
  try {
    if (!isBrowser()) return;

    localStorage.removeItem(USER_KEY);
    console.log("User data removed successfully");
  } catch (e) {
    console.error("Error removing user data:", e);
  }
};
