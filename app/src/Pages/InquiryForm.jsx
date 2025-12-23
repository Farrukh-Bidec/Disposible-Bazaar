"use client";

import React, { useEffect, useState, useRef } from "react";
import { PiCaretDownThin } from "react-icons/pi";
import Aos from "aos";
import "aos/dist/aos.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomSeo from "../components/CustomSeo";
import axios from "../Utils/axios";
import { Image_Url } from "../const";
import Link from "next/link";
import { useRouter } from "next/navigation";

function InquiryForm() {
    const router = useRouter();

    // Refs for auto-scroll
    const nameRef = useRef(null);
    const companyRef = useRef(null);
    const contactRef = useRef(null);
    const locationRef = useRef(null);
    const emailRef = useRef(null);
    const productRef = useRef(null);

    const [productCategory, setProductCategory] = useState([]);
    const [isDropdown, setIsDropdown] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState("Choose one product");
    const [selectedProductId, setSelectedProductId] = useState(null);

    // Form fields
    const [name, setName] = useState("");
    const [companyNumber, setCompanyNumber] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        Aos.init({ duration: 2000, delay: 0 });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.public.get("search/product");
                setProductCategory(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleSelectProduct = (product) => {
        setSelectedProduct(product.name);
        setSelectedProductId(product.id);
        setIsDropdown(false);
    };

    //🔥 FUNCTION: Auto-scroll to field
    const scrollToField = (ref, message) => {
        toast.error(message);
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        ref.current.focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations with auto-scroll
        if (!name) return scrollToField(nameRef, "Name is required");
        if (!companyNumber) return scrollToField(companyRef, "Company number is required");
        if (!contactNumber) return scrollToField(contactRef, "Contact number is required");
        if (!location) return scrollToField(locationRef, "Location is required");
        if (!email) return scrollToField(emailRef, "Email is required");
        if (!selectedProductId)
            return scrollToField(productRef, "Please choose a product");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("company_number", companyNumber);
        formData.append("contact_no", contactNumber);
        formData.append("location", location);
        formData.append("email", email);
        formData.append("product_id", selectedProductId);
        if (file) formData.append("logo_design", file);

        try {
            const response = await axios.public.post("inquiry_add", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Form submitted successfully!");

            // Reset form
            setName("");
            setCompanyNumber("");
            setContactNumber("");
            setLocation("");
            setEmail("");
            setFile(null);
            setSelectedProduct("Choose one product");
            setSelectedProductId(null);

            const logoInput = document.getElementById("logo");
            if (logoInput) logoInput.value = "";

            console.log("Form submitted:", response.data);
        } catch (error) {
            toast.error("Error submitting form. Please try again.");
            console.log("Error:", error);
        }
    };

    return (
        <div className="relative py-32 px-10 text-white overflow-hidden">
            <CustomSeo slug="inquiry" />
            <ToastContainer autoClose={800} />

            {/* Breadcrumb / Title */}
            <div className="flex flex-col py-5">
                <p>
                    <Link href="/">Home</Link> /{" "}
                    <Link href="/customization/">Customization</Link> / Inquiry
                </p>
                <h1 className="py-10 font-bazaar md:text-6xl text-5xl">INQUIRY FORM</h1>
            </div>

            {/* Form */}
            <div className="flex justify-center items-center">
                <form className="w-full max-w-4xl relative" onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="py-2 flex flex-col w-full">
                        <label className="font-medium">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={nameRef}
                            className="p-2 rounded-md px-3 my-2 border border-white bg-transparent text-white"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => {
                                if (/^[A-Za-z ]*$/.test(e.target.value)) setName(e.target.value);
                            }}
                        />
                    </div>

                    {/* Company Number */}
                    <div className="py-2 flex flex-col w-full">
                        <label className="font-medium">
                            Company Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={companyRef}
                            className="p-2 rounded-md px-3 my-2 border border-white bg-transparent text-white"
                            type="number"
                            value={companyNumber}
                            onChange={(e) => setCompanyNumber(e.target.value)}
                        />
                    </div>

                    {/* Contact Number */}
                    <div className="py-2 flex flex-col w-full">
                        <label className="font-medium">
                            Contact Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={contactRef}
                            className="p-2 rounded-md px-3 my-2 border border-white bg-transparent text-white"
                            type="number"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                    </div>

                    {/* Location */}
                    <div className="py-2 flex flex-col w-full">
                        <label className="font-medium">
                            Location <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={locationRef}
                            className="p-2 rounded-md px-3 my-2 border border-white bg-transparent text-white"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    {/* Email */}
                    <div className="py-2 flex flex-col w-full">
                        <label className="font-medium">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            ref={emailRef}
                            className="p-2 rounded-md px-3 my-2 border border-white bg-transparent text-white"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Product Dropdown */}
                    <div className="py-2 flex flex-col w-full md:w-80">
                        <label className="font-medium">
                            Please choose a product <span className="text-red-500">*</span>
                        </label>

                           <div
                                                    onClick={() => setIsDropdown(!isDropdown)}
                                                    className="flex justify-between items-center p-2 rounded-md px-3 my-2 border border-white bg-transparent cursor-pointer"
                                                >
                                                    <p>{selectedProduct}</p>
                                                    <PiCaretDownThin size={20} />
                                                </div>
{/* 
                        <div
                            ref={productRef}
                            onClick={() => setIsDropdown(!isDropdown)}
                            className="flex justify-between items-center p-2 rounded-md px-3 my-2 border border-white bg-transparent cursor-pointer"
                        >
                            <p>{selectedProduct}</p>
                            <PiCaretDownThin size={20} />
                        </div> */}

                        {isDropdown && (
                            <div className="absolute z-10 w-full md:w-80 rounded-lg mt-19 h-96 bg-white overflow-y-auto">
                                {productCategory.map((product, index) => (
                                    <h4
                                        key={index}
                                        className="text-black p-2 px-4 cursor-pointer hover:bg-gray-200"
                                        onClick={() => handleSelectProduct(product)}
                                    >
                                        {product.name}
                                    </h4>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* File Upload */}
                    <div className="py-10 flex flex-col w-full">
                        <label className="font-medium">Upload Your Artwork </label>
                        <div className="flex flex-col my-2 relative w-full h-60 items-center justify-center border-2 border-dashed rounded-lg border-gray-300">
                            <button
                                type="button"
                                className="px-3 py-2 bg-teal-700 text-white rounded-md"
                            >
                                Select Files...
                            </button>
                            <input
                                type="file"
                                id="logo"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            {file && <p className="text-green-400 mt-2">✓ {file.name}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="px-10 py-2 bg-teal-700 text-xl font-bazaar rounded-md hover:bg-teal-600"
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default InquiryForm;
