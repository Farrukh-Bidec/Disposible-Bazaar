"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "../Utils/axios"; 
import { setAccessToken, setUserData } from "../Utils/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Image_Url } from "../const";
import { GoogleLogin } from "@react-oauth/google";
import { useUser } from "../Context/UserContext";
import { useWishlist } from "../Context/WishlistContext";

export default function Login() {
    const [forgetPassword, setForgetPassword] = useState(true);
    const [sendOtp, setSendOtp] = useState(true);
    const [changePass, setChangePass] = useState(true);
    const [otpInput, setOtpInput] = useState(Array(6).fill(""));
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const otpRefs = useRef([]);

    const router = useRouter();
    const { setUser } = useUser();
    const { addToWishlist } = useWishlist();

    useEffect(() => {
        AOS.init({ duration: 500, delay: 0 });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.public.post("login", {
                email,
                password,
            });

            if (response.status === 200) {
                const { token, user } = response.data.data;

                setAccessToken(token);
                setUser(user);

                await setUserData({
                    user_id: user.id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    phone: user.phone,
                    photo: user.photo,
                });

                // ⬇️ Wishlist Count
                const wishlistCountResponse = await axios.protected.get(
                    "user/wishlist/count"
                );

                const wishlistCount = wishlistCountResponse.data.count;

                for (let i = 0; i < wishlistCount; i++) {
                    addToWishlist();
                }

                setTimeout(() => {
                    router.push("/");
                }, 800);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const isOtpSend = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.public.post("user/forgetPassword", {
                email,
            });

            if (response.data.status === "success") {
                toast.success("OTP sent to your email!");
                setSendOtp(false);
                setChangePass(true);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send OTP");
        }
    };

    const handleOtpChange = (value, index) => {
        const updatedOtp = [...otpInput];
        updatedOtp[index] = value;
        setOtpInput(updatedOtp);

        if (value && index < 5) {
            otpRefs.current[index + 1].focus();
        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const payload = {
                email,
                password,
                password_confirmation: confirmPassword,
                otp: otpInput.join(""),
            };

            const response = await axios.public.post(
                "user/resetPassword",
                payload
            );

            if (response.data.status === "success") {
                toast.success("Password reset successfully!");
                router.push("/login");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to reset");
        }
    };

    const handleGoogleLogin = async (response) => {
        try {
            const token = response.credential;

            const res = await fetch(
                "http://localhost/ecommerce-inventory/api/auth/google/callback",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id_token: token }),
                }
            );

            const data = await res.json();
            const { access_token, user } = data.data;

            setAccessToken(access_token);
            setUser(user);

            await setUserData({
                name: user.name,
                email: user.email,
            });

            router.push("/");
        } catch (error) {
            toast.error("Email already registered as Contributor");
        }
    };

    return (
        <>
            <ToastContainer autoClose={500} />
            <div className="flex items-center md:flex-row flex-col-reverse justify-center text-white h-screen container mx-auto py-[470px] md:py-[530px] lg:px-40 px-8">

                {/* ---------- Login Box ---------- */}
                {forgetPassword && (
                    <div
                        data-aos="fade-left"
                        className="h-[500px] md:w-3/5 w-full flex flex-col items-center justify-center border-4 border-[#1E7773] md:rounded-l-3xl"
                    >
                        <h4 className="text-xl md:text-4xl mb4 font-bazaar">
                            Login
                        </h4>

                        {/* Google Login Button */}
                        <div className="relative mt-4">
                            <div className="absolute inset-0 opacity-0">
                                <GoogleLogin onSuccess={handleGoogleLogin} />
                            </div>
                            <button className="flex gap-2 items-center rounded-full p-2 border-2 text-[#1E7773] border-[#1E7773]">
                                <FaGoogle size={20} />
                                <span className="text-md text-white font-bazaar">
                                    Login with Google
                                </span>
                            </button>
                        </div>

                        {/* Login Form */}
                        <form
                            className="md:w-4/5 w-full flex flex-col items-center text-white py-6 gap-4"
                            onSubmit={handleLogin}
                        >
                            <input
                                className="w-4/5 p-2 rounded-lg bg-transparent border-2 border-[#555]"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="relative w-4/5">
                                <input
                                    className="w-full p-2 rounded-lg bg-transparent border-2 border-[#555]"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => setForgetPassword(false)}
                                className="text-sm"
                            >
                                Forgot your password?
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-4 bg-[#1E7773] py-2 px-10 cursor-pointer rounded-lg text-lg"
                            >
                                LOGIN
                            </button>
                        </form>
                    </div>
                )}

                {/* ---------- Forgot Password ---------- */}
                {!forgetPassword && sendOtp && (
                    <div
                        data-aos="fade-left"
                        className="h-[500px] md:w-3/5 w-full flex flex-col items-center justify-center border-4 border-[#1E7773]"
                    >
                        <h4 className="text-xl md:text-4xl py-10 font-bazaar">
                            Forget Password
                        </h4>

                        <form
                            onSubmit={isOtpSend}
                            className="md:w-4/5 w-full flex flex-col items-center gap-4"
                        >
                            <input
                                className="w-4/5 p-2 rounded-lg bg-transparent border-2 border-[#555]"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <button className="bg-[#1E7773] py-2 px-10 cursor-pointer rounded-lg text-lg">
                                SEND OTP
                            </button>
                        </form>
                    </div>
                )}

                {/* ---------- OTP + Reset Password ---------- */}
                {!sendOtp && changePass && (
                    <div
                        data-aos="fade-left"
                        className="h-[500px] md:w-1/2 w-full flex flex-col items-center justify-center border-4 border-[#1E7773]"
                    >
                        <h4 className="text-xl md:text-3xl font-bazaar">
                            Email Verification
                        </h4>

                        <form
                            onSubmit={resetPassword}
                            className="w-full flex flex-col items-center gap-4 mt-6"
                        >
                            {/* OTP Inputs */}
                            <div className="flex gap-2">
                                {otpInput.map((v, i) => (
                                    <input
                                        key={i}
                                        maxLength={1}
                                        ref={(el) =>
                                            (otpRefs.current[i] = el)
                                        }
                                        value={v}
                                        onChange={(e) =>
                                            handleOtpChange(
                                                e.target.value,
                                                i
                                            )
                                        }
                                        className="w-12 h-12 text-black text-center border rounded-lg text-xl"
                                    />
                                ))}
                            </div>

                            <input
                                className="w-4/5 p-2 rounded-lg bg-transparent border-2 border-[#555]"
                                type="password"
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <input
                                className="w-4/5 p-2 rounded-lg bg-transparent border-2 border-[#555]"
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />

                            <button className="bg-[#1E7773] py-2 px-10 cursor-pointer rounded-lg text-lg">
                                Verify Account
                            </button>
                        </form>
                    </div>
                )}

                {/* RIGHT SIDE REGISTER BOX */}
                <div
                    data-aos="fade-right"
                    className="flex flex-col items-center justify-center rounded-r-[30px] bg-[#1E7773] h-[500px] md:w-2/5 w-full"
                >
                    <h4 className="text-xl md:text-4xl font-bazaar">
                        Hello Friends!
                    </h4> 

                    <p className="text-center mt-3 px-6">
                        Enter your details and start your journey with us
                    </p>

                    <Link
                        href="/register"
                        className="mt-6 border-2 border-white py-2 px-10 rounded-lg text-lg"
                    >
                        REGISTER
                    </Link>
                </div>
            </div>
        </>
    );
}
