"use client";

import React, { useEffect, useRef, useState } from "react";
import { Assets_Url, Image_Url, Profile_Assets_Url } from "../../const";
import { LuFacebook } from "react-icons/lu";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { RiShoppingBasket2Line, RiTiktokLine } from "react-icons/ri";
import { MdEmail, MdOutlineFileDownload, MdPhone } from "react-icons/md";
import { CiHeart, CiSearch, CiUser } from "react-icons/ci";
import { CgMenuRight } from "react-icons/cg";
import { PiCaretDownThin } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useUser } from "../../Context/UserContext";
import { useWishlist } from "../../Context/WishlistContext";
import { useCart } from "../..//Context/CartContext";

import axios from "..//..//Utils/axios";
import { BsWhatsapp } from "react-icons/bs";



function Header() {


    const [categories, setCategories] = useState([]);
    const kraftCategory = categories.find(
        (cat) => cat.slug === "kraft-paper-products"
    );


    const [mobMenu, setMobMenu] = useState(false);
    const [isCustomBtn, setIsCustomBtn] = useState(false);
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const [category, setCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [isDropdown, setIsDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showKraftDropdown, setShowKraftDropdown] = useState(false);
    let dropdownTimeout = useRef(null);


    const dropdownRef = useRef(null);

    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const { user } = useUser();
    const { wishlistCount } = useWishlist();
    const { cartItems, getTotalQuantity } = useCart();

    const totalItems = getTotalQuantity();

    // Auto-reset the search & category on certain pages
    useEffect(() => {
        const isProductCategory = pathname.startsWith("/product-category/");
        const isShopWithQuery = pathname.startsWith("/shop") && params.size > 0;

        if (!isProductCategory && !isShopWithQuery) {
            setCategory(null);
            setSearchTerm("");
        }
    }, [pathname, params]);

    const calculateSubtotal = () => {
        return cartItems.reduce(
            (total, item) => total + Number(item.product_total),
            0
        );
    };
    const subtotal = calculateSubtotal();
    const dummyProfilePic = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEQDw8QEBAQDg8PDw0PDQ0QDQ8NDw0PFhEWFhURExMYHSggGBolGxMTITEhJSk3Li4uFx8zODMsNygtLisBCgoKDQ0NDg0NDysZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQBAgUGB//EADAQAQACAAMFBgYCAwEAAAAAAAABAgMEESExQVFxBRJhgZHBIjJSobHRovATQuFy/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD7iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANZxI5tf8ANHP7SCQR/wCaP7EsxiRzBuMRLIAAAAAAAAAAAAAAAAAAAMWtpvBlpfEiP0hvizO7ZCMEtsaeiOZYEAAAAGYlvXFmPFGAs1xYnwSKTemJMeMclFoa0tE7mwAAAAAAAAAAAAAMWnTaDF7aK1rTO8vbWWqAAAAAAAEAAAAAM1nTcs4d9evFVZrOm0Fwa0trDZQAAAAAAAAAAVsa+s6cITYttIVQAEAABpjY0UjWfKOMmNiRWszPDhznk5OJiTadZ3/gE2LnLTu+GPDf6oJnXft67WBUIlPhZu9ePejlO37oAHWwMxF92yeMJXFraYnWNkxul1ctjd+uvGNkx4oqUAAAG+HfSfDitKSxgW2acvwolAAAAAAAAAkFfHtt6ImZlhAAAABz+0cTW0V4RtnrKolzU/Hb/wBTHoiVAAAABYyOJpeI4W2T7K7NZ0mJ5TEg7QywigADfCtpMejQBdGKTrEMqAAAAAADXEnZLZHj/LPl+QVgEAAAAHJzddL266+u1Evdo4e63lPsoqgAAAA2w662iOcxH3arXZ+FrbvcK/kHSYBFAAAAWcCdiRFl909fZKoAAAAAAI8f5Z8vykaYsbJBVAQAAAAYtWJiYnbE73LzGBNJ5xwl1WLViY0mNYngDii9i5D6Z08J/aC2UvH+uvSYlUQCaMrf6fvEJ8LIfVPlH7BVwcKbzpHnPCHWwsOKxERw+/izSkVjSI0hlFAAAAAAWMvunr7JUeBGxIoAAAAAAMTDICnLCTGrpPXajQAAAQ5jMxTZvnlHuCYmXLxM1e3HSOUbEEyo7XejnHqd6OcerigO13o5x6nejnHq4oDtxI4iXDzN67p18J2wDrCvl83Ftk/DP2nosIAAANsOuswCzSNIhsCgAAAAAAACPGrrHRWXVXFppPhO4GgMXtpEzO6I1QQZzMd2NI+aftHNzJbXvNpmZ3y1VAAAAAAAABfyWZ1+G2//AFnn4KBE6bt/AHbGmBid6sT69W6KLGBXjzQ0rrOi3EKAAAAAAAAAADW9dY0bAKdo02KvaFtKac5iPf2dPEpr14S5XakaRWPGQc8AQAAAAAAAAABf7NtstHKYn++i7EOf2Z81unu7GFh6dfwKzh00jx4twAAAAAAAAAAAAAQ5nL1xI0t5TxhMA8/msnbD37a8LRu8+Su9RMKGY7MrbbX4J5b6+nAHGFjGyWJTfXWOdfihXEAAAAATYOUvfdWdOc7IBCmy+WtiT8MbONp3Q6OX7LiNt570/TGyv/XQrWIjSI0iN0RsgVBlMpXDjZttO+3P9LAAAAAAAAAAAAAAAAAAAAI8TArb5qxPjMRr6pAFO/ZmHPCY6Wn3Rz2TT6rfx/ToAOdHZNPqt/H9JK9mYcfVPW36XQEWHlqV3ViPHTWfVKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/9k=";


    // Fetch categories (public)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.public.get(
                    "product/category?sectionName=headerDropdown"
                );
                setCategories(response.data.data);
            } catch (error) {
                console.log("Error", error);
            }
        };
        fetchData();
    }, []);

    const toggleMenu = () => {
        setMobMenu(!mobMenu);
    };

    const handleCategoryLink = (item) => {
        setCategory(item);
        router.push(`/product-category/${item.slug}?id=${item.id}`);
    };

    const toggleSubcategories = (categoryId) => {
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter((id) => id !== categoryId));
        } else {
            setExpandedCategories([...expandedCategories, categoryId]);
        }
    };

    // SEARCH
    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchTerm) return;

        if (category === null) {
            router.push(`/shop/?q=${encodeURIComponent(searchTerm)}`);
        } else {
            router.push(
                `/product-category/${category.slug}?q=${encodeURIComponent(
                    searchTerm
                )}&id=${category.id}`
            );
        }
    };

    // Dropdown: close when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCustomBtn(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Hide header on scroll
    useEffect(() => {
        const header = document.getElementById("header");
        if (!header) return;

        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                header.classList.add("header-hidden");
            } else {
                header.classList.remove("header-hidden");
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div id="header" className="fixed z-50 w-full flex flex-col ">
            <div className="bg-[#1E7773] md:px-20 w-full">
                <div className="flex flex-row lg:justify-between justify-center">
                    <ul className="lg:flex hidden  flex-row gap-1 text-sm cursor-pointer">
                        <li className="p-2 rounded-lg duration-300">
                            <a href="https://www.facebook.com/DisposableBazar/" aria-label="Facebook">
                                <LuFacebook className="text-white text-md" />
                            </a>
                        </li>
                        <li className="p-2 rounded-lg duration-300">
                            <a href="https://www.instagram.com/disposablebazaar/" aria-label="Instagram">
                                <FaInstagram className="text-white text-md" />
                            </a>
                        </li>
                        <li className="p-2 rounded-lg duration-300">
                            <a href="https://www.youtube.com/@disposablebazaar" aria-label="Youtube">
                                <FiYoutube className="text-white text-md" />
                            </a>
                        </li>
                        <li className="p-2 rounded-lg duration-300">
                            <a href="https://www.tiktok.com/@disposablebazaar" aria-label="Tiktok">
                                <RiTiktokLine className="text-white text-md" />
                            </a>
                        </li>
                        <li className="bg-[#1E7773] text-white p-2 rounded-full">
                            <a href="https://pk.linkedin.com/company/disposablebazaar" aria-label="Linkedin">
                                <FaLinkedinIn className="text-white text-md" />
                            </a>
                        </li>
                        {/* <li className="p-2 rounded-lg duration-300">
                            <RiTwitterXLine className="text-white text-md" />{" "}
                        </li> */}
                    </ul>
                    <ul className="lg:flex  flex flex-row md:gap-1 text-md cursor-pointer">
                        <li className="p-2 flex items-center text-white gap-2 md:text-[12px] text-[8px] duration-300">
                            <MdEmail className="text-white " />
                            info@disposablebazaar.com
                        </li>
                        <li className="p-2 flex items-center text-white gap-2 md:text-[12px] text-[8px] duration-300">
                            <MdPhone className="text-white " />
                            0321-3850002
                        </li>
                        <li className="p-2 md:text-[12px] text-[8px] duration-300">
                            <button
                                className="flex items-center text-white gap-2 cursor-pointer"
                                onClick={() =>
                                    window.open(
                                        "https://disposablebazaar.com/wp-content/uploads/2024/07/Disposable-Price-List-18072024.pdf",
                                        "_blank"
                                    )
                                }
                            >
                                <MdOutlineFileDownload className="text-white " />
                                Download Catalogue
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full flex justify-around items-center py-2 bg-white">
                <ul className=" lg:hidden flex">
                    <li className="flex">
                        <Link href="/cart/">
                            <RiShoppingBasket2Line className="bg-[#1E7773] rounded-lg text-white p-1 text-3xl" />
                            <p className="text-xs px-2  text-black">
                                {" "}
                                <span className="text-[15px] font-semibold">
                                    My Cart
                                </span>{" "}
                                <br /> {totalItems} items - Rs {subtotal}{" "}
                            </p>
                        </Link>
                    </li>
                </ul>
                <div
                    className={`relative ${showMegaMenu ? "text-[#227c85]" : "text-black"
                        } hover:text-[#227c85] text-lg duration-300 cursor-pointer`}
                >
                    <div className="flex flex-col justify-center items-center">
                        <Link href="/">
                            <Image
                                className="cursor-pointer w-32 md:w-40"
                                src={`${Image_Url}DB-Logo-01.jpg`}
                                alt="Logo"
                                width={160}
                                height={40}
                            />
                        </Link>
                        {/* <button
                            onClick={handleToggleMegaMenu}
                            className="bg-[#1E7773] hidden lg:flex font-semibold flex flex-row gap-2 rounded-lg justify-center items-center text-white py-1.5 px-3 text-xs"
                        >
                            <img
                                className="cursor-pointer w-4"
                                src={`${Image_Url}HeaderAssets/category-icon.svg`}
                                alt=""
                            />{" "}
                            ALL CATEGORIES
                        </button> */}
                    </div>
                    {/* Mega Menu */}
                    {/* <div className="relative"
                        onMouseEnter={() => setShowMegaMenu(true)}
                        onMouseLeave={() => setShowMegaMenu(false)}
                    >
                        <div
                            className={`hidden lg:flex absolute -top-[0.5rem] -left-[60px] z-10 mt-3 h-screen overflow-y-auto flex flex-col w-60 transition-transform  duration-300 ease-in-out ${showMegaMenu ? "translate-x-0" : "-translate-x-full  bg-transparent border-none"} text-sm text-[#227c85] bg-white border border-gray-300 shadow-lg rounded`}
                        >
                            {categories.map((category, index) => (
                                <Link
                                    key={index}
                                    to={`/category/${category.id}`} // For direct link usage
                                    onClick={() =>
                                        handleCategoryClick(category.id)
                                    } // Call handleSearch on click
                                    className="font-sans m-1 px-4 py-2 hover:text-white hover:bg-[#227c85] duration-200 rounded"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div> */}
                </div>
                {/* toggle button */}
                <div className=" flex justify-center pl-10">
                    <button
                        onClick={toggleMenu}
                        className="flex lg:hidden p-2 rounded text-3xl text-black"
                        aria-label="Toggle menu"
                    >
                        <CgMenuRight />
                    </button>
                </div>

                {/* desktop menu */}
                <div className="lg:flex hidden flex w-[70%]">
                    <div className="w-full">
                        <form
                            onSubmit={handleSearch}
                            className="relative flex justify-center items-center"
                        >
                            {/* <select
                                className="absolute left-3 w-48 border-r pr-2 p-2 border-gray-400 bg-white focus:outline-none"
                                value={category}
                                onChange={(e) => {
                                    handleCategoryLink(e.target.value), setCategory(e.target.value)
                                }} // Use onChange instead of onClick
                            >
                                <option value="null" className="mt2">
                                    All Categories
                                </option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select> */}
                            <div className="absolute left-3 w-72 border-r pr-2 p-2 border-gray-400 focus:outline-none"
                                onMouseEnter={() => setIsDropdown(!isDropdown)}
                                onMouseLeave={() => setIsDropdown(!isDropdown)}>
                                <div
                                    className="flex justify-between items-center text-zinc-950 rounded cursor-pointer"
                                >
                                    <p>{category === "null" ? "All Categories" : category?.name || "Select a Category"}</p>
                                    <PiCaretDownThin size={20} />
                                </div>

                                {isDropdown && (
                                    <div className="absolute z-10 sm:col-span-6 col-span-full w-full  rounded-lg top-10 left-0 overflow-y-auto h-56 bg-white border border-gray-200">
                                        {Array.isArray(categories) &&

                                            categories.map((cat) => (
                                                <div key={cat.id}>
                                                    <div
                                                        className="text-black p-2 px-4 cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                                                        onClick={() => handleCategoryLink(cat)}
                                                    >
                                                        <span className="text-sm">{cat.name}</span>
                                                        {cat.subCategories?.length > 0 && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation(); // Prevent parent click
                                                                    toggleSubcategories(cat.id);
                                                                }}
                                                                className="text-gray-500 text-3xl hover:text-black"
                                                            >
                                                                {expandedCategories.includes(cat.id) ? "-" : "+"}
                                                            </button>
                                                        )}
                                                    </div>
                                                    {expandedCategories.includes(cat.id) && (
                                                        <div className="pl-8">
                                                            {cat.subCategories.map((subCat) => (
                                                                <div
                                                                    key={subCat.id}
                                                                    className="text-gray-700 p-2 px-4 cursor-pointer hover:bg-gray-200 text-xs"
                                                                    onClick={() => handleCategoryLink(subCat)}
                                                                >
                                                                    {subCat.name}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                            ))}
                                        {/* {subCategories.length === 0 ? (
                                            <div className="">{subCategories.map((data, index) => (
                                                <div className="">
                                                    {data}
                                                </div>
                                            ))}</div>
                                        ) : null} */}
                                    </div>
                                )}
                            </div>
                            <input
                                className="w-full pl-80 border-2 border-gray-400 text-zinc-900 rounded-l-lg p-2"
                                type="text"
                                placeholder="Search Products.."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}


                            />

                            <button
                                className="rounded-r-lg bg-[#1E7773] border-2 border-[#1E7773] p-2 px-4 text-white"
                                type="submit"
                                aria-label="Search"
                            >
                                <CiSearch size={24} />
                            </button>
                        </form>

                        <ul className="flex flex-wrap gap- 2xl:gap-4 justify-between text-sm  cursor-pointer pt-3 font-semibold">
                            <li
                                className={`hover:text-[#1E7773] font-bold px-2 rounded-lg duration-300 ${pathname === "/" ? "text-[#1E7773]" : "text-black"
                                    }`}
                            >
                                <Link href="/">

                                    Home
                                </Link>
                            </li>
                            {/* Shop */}
                            <li
                                className={`hover:text-[#1E7773] font-bold px-2 rounded-lg duration-300 
                                        ${pathname.startsWith("/shop") ? "text-[#1E7773]" : "text-black"}`}
                            >
                                <Link href="/shop">
                                    Shop All
                                </Link>
                            </li>
                            <li>

                                {kraftCategory && (
                                    <li
                                        className="relative font-bold px-2 cursor-pointer flex items-center gap-1"
                                        onMouseEnter={() => {
                                            setShowKraftDropdown(true);
                                            if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
                                        }}
                                        onMouseLeave={() => {
                                            dropdownTimeout.current = setTimeout(() => {
                                                setShowKraftDropdown(false);
                                            }, 500);
                                        }}
                                    >
                                        <span
                                            onClick={() => handleCategoryLink(kraftCategory)}
                                            className={`hover:text-[#1E7773] duration-300 ${pathname.includes(kraftCategory.slug)
                                                ? "text-[#1E7773]"
                                                : "text-black"
                                                }`}
                                        >
                                            {kraftCategory.name}
                                        </span>

                                        <span className="text-[11px] font-semibold px-2 py-[2px] rounded bg-red-700 text-white animate-pulse">
                                            NEW
                                        </span>

                                        <PiCaretDownThin size={14} />

                                        {showKraftDropdown && kraftCategory.subCategories?.length > 0 && (
                                            <ul className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded-md w-56 z-50">
                                                {kraftCategory.subCategories.map((sub) => (
                                                    <li
                                                        key={sub.id}
                                                        onClick={() => handleCategoryLink(sub)}
                                                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {sub.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>


                                )}
                            </li>



                            {/* Custom Packaging */}
                            <li
                                className={`hover:text-[#1E7773] font-bold px-2 cursor-pointer rounded-lg duration-300 
                                   ${pathname.startsWith("/custom") || pathname.startsWith("/inquiryform")
                                        ? "text-[#1E7773]" : "text-black"}`}
                            >
                                <button onClick={() => setIsCustomBtn(!isCustomBtn)}>

                                    Custom Packaging
                                </button>

                            </li>

                            <li>
                                {isCustomBtn && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute flex flex-col gap-3 bg-white rounded-lg p-2 mt-2 shadow"
                                    >
                                        <Link href="/inquiryform">
                                            <li
                                                className={`hover:text-[#1E7773] font-bold px-2 rounded-lg duration-300 
                                    ${pathname === "/inquiryform" ? "text-[#1E7773]" : "text-black"}`}
                                            >
                                                Inquiry Form
                                            </li>
                                        </Link>

                                        <Link href="/customization">
                                            <li
                                                className={`hover:text-[#1E7773]  font-bold px-2 rounded-lg duration-300 
                                    ${pathname === "/customization" ? "text-[#1E7773]" : "text-black"}`}
                                            >
                                                Custom Packaging
                                            </li>
                                        </Link>
                                    </div>
                                )}
                            </li>

                            {/* Bundles */}
                            <li
                                className={`hover:text-[#1E7773] font-bold px-2 rounded-lg duration-300 
                                        ${pathname === "/bundles" ? "text-[#1E7773]" : "text-black"}`}
                            >
                                <Link href="/bundles">
                                    Bundles
                                </Link>
                            </li>

                            {/* About */}
                            <li
                                className={`hover:text-[#1E7773] font-bold px-2 rounded-lg duration-300 
                                        ${pathname === "/about-us" ? "text-[#1E7773]" : "text-black"}`}
                            >
                                <Link href="/about-us">
                                    About Us
                                </Link>
                            </li>

                            {/* Reviews */}
                            <li
                                className={`hover:text-[#1E7773] font-bold px-2 rounded-lg duration-300 
                                        ${pathname === "/reviews" ? "text-[#1E7773]" : "text-black"}`}
                            >
                                <Link href="/reviews">
                                    Reviews
                                </Link>
                            </li>

                            {/* Blog */}
                            <li
                                className={`hover:text-[#1E7773] font-bold px-2 rounded-lg duration-300 
                        ${pathname === "/blog" ? "text-[#1E7773]" : "text-black"}`}
                            >
                                <Link href="/blog">

                                    Blog
                                </Link>

                            </li>

                            {/* Contact */}
                            <li
                                className={`hover:text-[#1E7773] font-bold px-2 rounded-lg duration-300 
                        ${pathname === "/contact-us" ? "text-[#1E7773]" : "text-black"}`}
                            >
                                <Link href="/contact-us">

                                    Contact Us
                                </Link>

                            </li>
                        </ul>
                    </div>
                </div>
                <ul className="lg:flex hidden flex flex-row items-center justify-center gap-2 text-sm  cursor-pointer">
                    <li>
                        {user && (
                            <Link href="/wishlist">
                                <li className="relative">
                                    <CiHeart className="text-black text-3xl" />
                                    {wishlistCount > 0 && ( // Only show the count if it's greater than 0
                                        <p className="absolute flex justify-center items-center -right-1 -top-1 bg-[#1E7773] rounded-full h-4 w-4 text-white text-[9px]">
                                            {wishlistCount}
                                        </p>
                                    )}
                                </li>
                            </Link>
                        )}</li>
                    <li>
                        {!user ? (
                            <Link href="/register/" aria-label="User_profile" >
                                <CiUser className="text-black text-3xl" />
                            </Link>
                        ) : (
                            <Link href="/profile">
                                <img
                                    // src={user ? `${Profile_Assets_Url}${user.photo}` : dummyProfilePic}
                                    src={user?.photo ? `${Profile_Assets_Url}/${user.photo}` : dummyProfilePic}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                // onClick={handleLogout}
                                />
                            </Link>
                        )}
                    </li>
                    <li>
                        <Link href="/cart/">
                            {/* <li className='flex'>
                            <RiShoppingBasket2Line className='bg-[#1E7773] rounded-lg text-white p-1 text-3xl' />
                            <p className='text-xs px-2'> <span className='text-[15px] font-semibold'>My Cart</span> <br /> 0 items-Rs0.00 </p>
                        </li> */}
                            <li className="flex">
                                <RiShoppingBasket2Line className="bg-[#1E7773] rounded-lg text-white p-1 text-3xl" />
                                <p className="text-xs px-2 text-zinc-950">
                                    <span className="text-[15px] font-semibold">
                                        My Cart
                                    </span>{" "}
                                    <br />
                                    {totalItems} items - Rs {subtotal}
                                </p>
                            </li>
                        </Link>
                    </li>
                </ul>
            </div>
            {/* Mobile Menu */}
            <div
                className={`fixed  inset0 z-50 flex flex-col gap-4 justify-center w-full text-center pt-4 pb-8 px-4 transition-transform duration-300 bg-[#1E7773] bg-opacity-100 focus:outline-none overflow-y-auto ${mobMenu ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <form className="relative flex">
                    <input
                        className="w-full pl-4 bg-white text-black rounded-l-lg p-2"
                        type="text"
                        placeholder="Search Products.."
                    />
                    <button className="border rounded-r-lg bg-[#1E7773] p-2 px-4 cursor-pointer text-white text-2xl hover:px-6 duration-300" aria-label="Search">
                        <CiSearch />
                    </button>
                </form>

                <ul className="flex flex-row items-center justify-center gap-5 text-sm cursor-pointer">
                    <li>
                        {user && (
                            <Link href="/wishlist" onClick={() => setMobMenu(false)}>
                                <li>
                                    <CiHeart className="text-white text-3xl" />
                                </li>
                            </Link>
                        )}
                    </li>
                    <li>
                        {!user ? (
                            <Link href="/register/" onClick={() => setMobMenu(false)} aria-label="User_profile">
                                <CiUser className="text-white text-3xl" />
                            </Link>
                        ) : (
                            <Link href="/profile">
                                <img
                                    src={user.profile_picture || dummyProfilePic}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                // onClick={handleLogout}
                                />
                            </Link>
                        )}
                    </li>
                    {/* <li><CiHeart className='text-white text-3xl' /></li>

                    <Link onClick={() => setMobMenu(false)} to='/register'>
                        <li><CiUser className='text-white text-3xl' /></li>
                    </Link> */}
                    {/* <li className='flex items-start'>
            <RiShoppingBasket2Line className='bg-white text-[#1E7773] rounded-lg text-white p-1 text-3xl' />
            <p className='text-xs px-2 text-white'>
                <span className='text-[15px] font-semibold'>My Cart</span> <br /> 0 items - Rs0.00
            </p>
        </li> */}
                </ul>

                <ul className="flex flex-col gap-2 justify-between items-center text-md cursor-pointer pt-3 font-semibold">

                    <li className="w-40">
                        <Link href="/" onClick={() => setMobMenu(false)}
                            className="block text-white hover:text-black hover:bg-white p-2 rounded-lg duration-300"
                        >
                            Home
                        </Link>
                    </li>

                    <li className="w-40">
                        <Link href="/shop/" onClick={() => setMobMenu(false)}
                            className="block text-white hover:text-black hover:bg-white p-2 rounded-lg duration-300"
                        >
                            Shop All
                        </Link>
                    </li>

                    {kraftCategory && (
                        <li className="w-full">
                            <button
                                onClick={() => toggleSubcategories(kraftCategory.id)}
                                className="flex justify-center mx-auto items-center w-40 text-white hover:text-black hover:bg-white p-2 rounded-lg duration-300"
                            >
                                <span className="flex items-center gap-2">
                                    {kraftCategory.name}
                                    <span className="text-[11px] font-bold px-2 py-[2px] rounded bg-red-700 text-black animate-pulse">
                                        NEW
                                    </span>

                                </span>
                                <PiCaretDownThin />
                            </button>

                            {expandedCategories.includes(kraftCategory.id) && (
                                <ul className="mt-1 bg-white text-black rounded-lg">
                                    {kraftCategory.subCategories?.map((sub) => (
                                        <li key={sub.id}>
                                            <button
                                                onClick={() => {
                                                    handleCategoryLink(sub);
                                                    setMobMenu(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                            >
                                                {sub.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )}

                    {[
                        { href: "/bundles/", label: "Bundles" },
                        { href: "/customization/", label: "Custom Packaging" },
                        { href: "/about-us/", label: "About Us" },
                        { href: "/reviews/", label: "Reviews" },
                        { href: "/blog/", label: "Blog" },
                        { href: "/contact-us/", label: "Contact Us" },
                    ].map((item) => (
                        <li key={item.href} className="w-40">
                            <Link
                                href={item.href}
                                onClick={() => setMobMenu(false)}
                                className="block text-white hover:text-black hover:bg-white p-2 rounded-lg duration-300"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
            <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">

                {/* WhatsApp Button */}
                <a
                    href="https://wa.me/+923213850002"
                    target="_blank"
                    className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition"
                    aria-label="WhatsApp"
                >
                    <BsWhatsapp className="text-white text-[20px]  " />
                </a>

                {/* Email Button */}
                <a
                    href="mailto:info@disposablebazaar.com"
                    target="_blank"
                    className="w-12 h-12 rounded-full bg-[#1E90FF] flex items-center justify-center shadow-lg hover:scale-110 transition"
                    aria-label="Email"
                    title="This will open your email app"
                >
                    <MdEmail className="text-white text-[25px]" />
                </a>

            </div>

        </div >



    );
}

export default Header;
