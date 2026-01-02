"use client";

import { useEffect, useState } from "react";
import { Image_Url } from '../../const';
import { LuFacebook } from "react-icons/lu";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { RiTiktokLine } from "react-icons/ri";
import { MdEmail, MdPhone } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from '../../Utils/axios';

export default function FooterBottom() {
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    const handleSearch = (category) => () => {
        router.push(`/product-category/${category.slug}?id=${category.id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.public.get("product/category");
                setCategories(response.data.data);
            } catch (error) {
                console.log("Error", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="pt-10 w-full justify-center items-center flex lg:flex-row flex-col text-white">

            <div className="flex w-11/12 lg:flex-row flex-col justify-around items-center md:items-start gap-5 p-5">

                {/* Logo Section */}
                <div className="w-full lg:w-[25%] text-start flex flex-col items-center md:items-start gap-2 text-md">
                    <img
                        className="cursor-pointer w-44 lg:w-64"
                        src={`${Image_Url}/Logoo.png`}
                        alt=""
                    />
                    <p className="text-center md:text-start font-[400]">
                        In the vast world of food packaging, the emphasis on sustainability and
                        safety has never been higher. At Disposable Bazaar, we understand the
                        modern consumer’s pulse, marrying the needs of both the environment...
                    </p>
                </div>

                {/* Social (Mobile Only) */}
                <ul className="block md:hidden flex flex-row justify-center gap-2">
                    <li className="bg-white text-[#1E7773] p-2 rounded-full">
                        <a aria-label='Facebook' href="https://www.facebook.com/DisposableBazar/"><LuFacebook /></a>
                    </li>
                    <li className="bg-white text-[#1E7773] p-2 rounded-full">
                        <a aria-label='Instagram' href="https://www.instagram.com/disposablebazaar/"><FaInstagram /></a>
                    </li>
                    <li className="bg-white text-[#1E7773] p-2 rounded-full">
                        <a aria-label='Tiktok' href="https://www.tiktok.com/@disposablebazaar"><RiTiktokLine /></a>
                    </li>
                    <li className="bg-white text-[#1E7773] p-2 rounded-full">
                        <a aria-label='Youtube' href="https://www.youtube.com/@disposablebazaar"><FiYoutube /></a>
                    </li>
                    <li className="bg-white text-[#1E7773] p-2 rounded-full">
                        <a aria-label='Linkedin' href="https://pk.linkedin.com/company/disposablebazaar"><FaLinkedinIn /></a>
                    </li>
                </ul>

                {/* Main Columns */}
                <div className="flex lg:flex-row flex-col justify-evenly gap-14 items-center lg:items-start text-center md:text-start">

                    {/* Categories */}
                    <ul className="flex flex-col gap-3 md:items-start items-center text-sm">
                        <li className="text-2xl font-light py-2 font-bazaar">Categories</li>

                        {categories.slice(0, 8).map((category) => (
                            <li
                                key={category.id}
                                onClick={handleSearch(category)}
                                className="cursor-pointer font-[400]"
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>

                    {/* Shop Info */}
                    <ul className="flex flex-col gap-3 md:items-start items-center text-sm">
                        <li className="text-2xl font-light py-2 font-bazaar">Shop Info</li>
                        <li className="font-[400]"><Link href="/">Home</Link></li>
                        <li className="font-[400]"><Link href="/about-us/">About Us</Link></li>
                        <li className="font-[400]"><Link href="/contact-us/">Contact Us</Link></li>
                        <li className="font-[400]"><Link href="/shop/">Shop</Link></li>
                        <li className="font-[400]"><Link href="/blog/">Blog</Link></li>
                    </ul>

                    {/* Policies + Social Desktop */}
                    <div className="flex flex-col gap-3 md:items-start items-center text-sm">
                        <ul className="flex flex-col gap-3 md:items-start items-center text-sm">
                            <li className="text-2xl font-light py-2 font-bazaar">Policy</li>
                         
                            <li className="font-[400]"><Link href="/privacypolicy/">Privacy Policy</Link></li>
                            <li className="font-[400]"><Link href="/termsconditions/">Terms & Condition</Link></li>
                            <li className="font-[400]"><Link href="/returnpolicy/">Return Policy</Link></li>
                        
                        </ul>

                        <p className="hidden md:block text-2xl font-light pt-4 font-bazaar">Follow Us</p>

                        <ul className="hidden md:flex flex-row gap-3">
                            <li className="bg-white text-[#1E7773] p-2 rounded-full">
                                <a aria-label="Facebook" href="https://www.facebook.com/DisposableBazar/"><LuFacebook /></a>
                            </li>
                            <li className="bg-white text-[#1E7773] p-2 rounded-full">
                                <a aria-label="Instagram" href="https://www.instagram.com/disposablebazaar/"><FaInstagram /></a>
                            </li>
                            <li className="bg-white text-[#1E7773] p-2 rounded-full">
                                <a aria-label=" Tiktok" href="https://www.tiktok.com/@disposablebazaar"><RiTiktokLine /></a>
                            </li>
                            <li className="bg-white text-[#1E7773] p-2 rounded-full">
                                <a aria-label="Youtube" href="https://www.youtube.com/@disposablebazaar"><FiYoutube /></a>
                            </li>
                            <li className="bg-white text-[#1E7773] p-2 rounded-full">
                                <a aria-label="Linkedin" href="https://pk.linkedin.com/company/disposablebazaar"><FaLinkedinIn /></a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <ul className="flex flex-col gap-3 md:items-start items-center text-sm">
                        <li className="text-2xl font-light py-2 font-bazaar">Contact</li>
                        <li className="flex flex-row gap-2 items-center font-[400]">
                            <MdEmail className="text-xl " /> info@disposablebazaar.com
                        </li>
                        <li className="flex flex-row gap-2 items-center font-[400]"> 
                            <MdPhone className="text-xl" /> 0321-3850002
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
}
