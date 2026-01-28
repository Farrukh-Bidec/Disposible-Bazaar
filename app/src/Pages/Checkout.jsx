"use client";
import ReactDOM from "react-dom";
// import "leaflet/dist/leadistflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import React, { useEffect, useRef, useState } from "react";
import Hamburger from "../components/Hamburger";
import { PiCaretDownThin } from "react-icons/pi";
import { Assets_Url, Image_Url } from "../const";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import CheckoutModal from "../components/CheckoutModal";
import { useCart } from "../Context/CartContext";
import { useUser } from "../Context/UserContext";
// import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import Invoice from './Invoice';
import axios from "../Utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
import Invoice from "./Invoice";
// import { address } from "framer-motion/m";
import InvoicePopup from "../components/InvoicePopup";
// import {  useNavigate } from "react-router-dom";

import JSConfetti from "js-confetti";
import "../components/confettiCard/styles.css";
import GoogleMapComponent from "../components/GoogleMapComponent";

function Checkout() {
    const { user, setUser } = useUser();
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        updatePackSize,
        updateProductOption,
        updateSize,
    } = useCart();
    const [isDropdown, setIsDropdown] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [AreaList, setAreaList] = useState([]);
    const [selectedArea, setSelectedArea] = useState("Select Area");
    const [selectedAreaId, setSelectedAreaId] = useState();
    const [areaDeliveryCharges, setAreaDeliveryCharges] = useState(0);
    const [discountCode, setDiscount] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [mobile_no, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [billing_address, setBillingAddress] = useState("");
    const [special_instruction, setSpecialInstructions] = useState("");
    const [asGuest, setAsGuest] = useState(1);
    const [isInvoice, setIsInvoice] = useState(false);
    const [invoicedetails, setInvoicedetails] = useState(null);
    const [errors, setErrors] = useState({});
    const searchInputRef = useRef(null);
    const canvasRef = useRef();
    const confettiRef = useRef();

    const requiredFields = {
        first_name: 'First Name',
        last_name: 'Last Name',
        mobile_no: 'Mobile Number',
        email: 'Email',
        billing_address: 'Address',
        selectedAreaId: 'Area'
    };

    // Blur event handler for individual field validation
    const handleBlur = (e) => {
        // const { name, value } = e.target;
        // validateField(name, value);
    };

      useEffect(() => {
   console.log("Cart Items:", cartItems);
}, [cartItems]);
    // Calculate the subtotal of the cart
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => {
            // Ensure item.product_total is treated as a number
            const itemTotal = Number(item.product_total); // Convert to number
            return total + itemTotal; // Add to the running total
        }, 0); // Initial total is 0
    };

    const subtotal = calculateSubtotal(); // Calculate subtotal
    const total = subtotal + Number(areaDeliveryCharges); // Calculate total ensuring areaDeliveryCharges is also a number

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.public.get("areasList");
                setAreaList(response.data.data); // Set AreaList with the 'data' array
                console.log("Area List:", response.data.data); // Log the areas
            } catch (error) {
                console.log("Error:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        confettiRef.current = new JSConfetti({ canvas: canvasRef.current });
    }, []);
    const handleRemove = (itemId) => {
        removeFromCart(itemId); // Pass the product_id to remove it from the cart.
    };

    const handleCheckGuest = () => {
        if (!user && asGuest === 1) {
            setIsModal(true);
            return; // Prevent further execution if there is no user
        }
        handleCheckOut();
    }
    const handleCheckOut = async () => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const userId = userData ? userData.user_id : null;

    // Validation
    const emptyFields = [];
    if (!first_name) emptyFields.push('first_name');
    if (!last_name) emptyFields.push('last_name');
    if (!mobile_no) emptyFields.push('mobile_no');
    if (!email) emptyFields.push('email');
    if (!billing_address) emptyFields.push('billing_address');
    if (!selectedAreaId) emptyFields.push('selectedAreaId');

    if (emptyFields.length === Object.keys(requiredFields).length) {
        toast.error("Please fill all fields");
        return;
    } else if (emptyFields.length > 0) {
        const newErrors = {};
        emptyFields.forEach(field => {
            newErrors[field] = `Please fill ${requiredFields[field]}`;
        });
        setErrors(newErrors);
        toast.error(emptyFields.map(field => `Please fill ${requiredFields[field]}`).join(', '));
        return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Validate mobile number (min 7 digits, max 15 digits)
    if (!/^\d{7,15}$/.test(mobile_no)) {
        toast.error("Please enter a valid mobile number (7 to 15 digits).");
        return;
    }

    const formData = new FormData();

    formData.append("order_date", formattedDate);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("mobile_no", mobile_no);
    formData.append("sub_total", subtotal);
    formData.append("area_id", selectedAreaId);
    formData.append("grand_total", total);
    formData.append("billing_address", billing_address);
    formData.append("special_instruction", special_instruction);
    formData.append("continue_as_guest", user ? 0 : 1);
    formData.append("user_id", user ? userId : null);

    // Add product details
    cartItems.forEach((item, index) => {
        if (item.bundle_status == false) {
            const matchedOption = item.product_options?.find(
                (option) =>
                    option.size === item.product_size &&
                    option.option === item.product_color
            );

            formData.append(
                `order_detail[${index}][product_id]`,
                item.product_id
            );
            formData.append(
                `order_detail[${index}][quantity]`,
                item.product_quantity
            );
            formData.append(
                `order_detail[${index}][pack_size]`,
                item.pack_size
            );
            formData.append(
                `order_detail[${index}][total_pieces]`,
                item.total_pieces
            );
            formData.append(
                `order_detail[${index}][product_sub_total]`,
                item.product_total
            );
            formData.append(
                `order_detail[${index}][_is_customize]`,
                item.logo ? 1 : 0
            );

            if (matchedOption) {
                formData.append(
                    `order_detail[${index}][product_option_id]`,
                    matchedOption.id
                );
            }

            formData.append(
                `order_detail[${index}][customizeDetail]`,
                item.customizeDetail ? item.customizeDetail : null
            );

            formData.append(
                `order_detail[${index}][packagingOptions][print_location]`,
                item.packaging_options ? item.packaging_options?.print_location : null
            );
            formData.append(
                `order_detail[${index}][packagingOptions][side_option]`,
                item.packaging_options ? item.packaging_options?.side_option : null
            );
            formData.append(
                `order_detail[${index}][packagingOptions][price]`,
                item.packaging_options ? item.packaging_options?.price : null
            );

            formData.append(
                `order_detail[${index}][lid]`,
                item.lid
            );

            if (item.logo) {
                const blob = base64ToBlob(item.logo);
                formData.append(
                    `order_detail[${index}][customize_logo_image]`,
                    blob,
                    "customized-logo.png"
                );
            }
        }
    });

    // Bundles
    cartItems.forEach((item, index) => {
        if (item.bundle_status == true) {
            formData.append(`bundle_ids[${index}]`, item.product_id);
            formData.append(`bundle_qtys[${index}]`, item.product_quantity);
        }
    });

    try {
        setIsModal(false);

        const response = await axios.public.post("order/place", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const { status, message, order_id } = response.data;

        // --- WARNING ---
        if (status === "warning") {
            toast.warning(message);
            return;
        }

        // --- ERROR ---
        if (status === "error") {
            toast.error(message);
            return;
        }

        // --- SUCCESS ---
        if (status === "success") {
            // Show API message directly
            toast.success(message);

            // Confetti
            confettiRef.current.addConfetti({
                confettiRadius: 5,
                confettiNumber: 300,
            });

            // Prepare invoice data
            const orderDetails = {
                orderId: order_id,
                orderDate: formattedDate,
                first_name,
                last_name,
                email,
                mobile_no,
                items: cartItems?.map((item) => ({
                    productName: item.product_name,
                    price: item.product_total,
                    price_per_piece: item.price_per_piece,
                    quantity: item.total_pieces,
                    image: item.product_img,
                })),
                deliveryInfo: {
                    address: billing_address,
                    number: mobile_no,
                },
                subtotal: subtotal,
                deliveryCharges: selectedAreaId ? 150 : 0,
                grandTotal: total,
            };

            // Clear cart + fields
            cartItems.forEach((item) => removeFromCart(item.id));
            setIsDropdown(false);
            setSelectedArea("Select Area");
            setSelectedAreaId(null);
            setAreaDeliveryCharges(0);
            setFirst_name("");
            setLast_name("");
            setMobileNumber("");
            setEmail("");
            setBillingAddress("");
            setSpecialInstructions("");
            setDiscount("");

            setInvoicedetails(orderDetails);
            setIsInvoice(true);
        }
    } catch (error) {
        console.log("Form submission error:", error);
        // toast.error("Something went wrong!");
    }
};


    // Convert Base64 image to Blob
    const base64ToBlob = (base64Data, contentType = "image/png") => {
        const byteCharacters = atob(base64Data.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: contentType });
    };

    const handleAreaChange = (area) => {
        setSelectedArea(area.area_name);
        setSelectedAreaId(area.id);
        setAreaDeliveryCharges(area.shipping_rate);
        setIsDropdown(!isDropdown);
        setErrors(prev => ({ ...prev, selectedAreaId: '' }));
    };
    // const downloadInvoice = async (orderDetails) => {
    //     setLoading(true);
    //     setError('');

    //     // Create a div element to render the invoice
    //     const invoiceDiv = document.createElement('div');
    //     document.body.appendChild(invoiceDiv);

    //     // Create a root for React 18
    //     const root = ReactDOM.createRoot(invoiceDiv);

    //     // Render the Invoice component inside the newly created div
    //     root.render(<Invoice orderDetails={orderDetails} />);

    //     // Wait for the component to be rendered before capturing it
    //     setTimeout(async () => {
    //         try {
    //             const canvas = await html2canvas(invoiceDiv, { scale: 2 }); // Increase scale for better quality
    //             const imgData = canvas.toDataURL('image/png');
    //             const pdf = new jsPDF();

    //             // Calculate the PDF dimensions
    //             const imgWidth = 210; // A4 width in mm
    //             const pageHeight = pdf.internal.pageSize.height;
    //             const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //             let heightLeft = imgHeight;

    //             let position = 0;

    //             // Add the image to PDF and handle multiple pages if needed
    //             while (heightLeft >= 0) {
    //                 pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //                 heightLeft -= pageHeight;
    //                 position -= pageHeight; // Move the position down for the next page
    //                 if (heightLeft >= 0) {
    //                     pdf.addPage(); // Add a new page if there's more content
    //                 }
    //             }

    //             pdf.save(`Invoice_${orderDetails.orderId}.pdf`);
    //         } catch (error) {
    //             console.error("Error generating PDF: ", error);
    //             setError("Failed to generate the invoice. Please try again.");
    //         } finally {
    //             // Clean up the DOM by unmounting and removing the invoice div
    //             root.unmount();
    //             document.body.removeChild(invoiceDiv);
    //             setLoading(false); // Reset loading state
    //         }
    //     }, 500); // Delay to allow the Invoice component to render
    // };

    return (
        <div className="py-32 md:px-10 px-5 text-white">
            <ToastContainer autoClose={500} />
            <div className="text-white py-4">
                <Hamburger firstPage="Home" secondPage="Checkout" />
                <h3 className="text-6xl pt-10 font-bazaar">Checkout</h3>
            </div>
            <section className="flex lg:flex-row flex-col-reverse justify-between itemscenter gap-10">
                <form className="lg:w-3/5 w-full">
                    <h3 className="py-5 text-2xl font-semibold">
                        Personal information:
                    </h3>
                    <div className="grid grid-cols-12 gap-5 py-5">
                        <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2">
                            <label htmlFor="First">First Name {errors.first_name && <span className="text-red-500">*</span>}</label>
                            <input
                                type="text"
                                className={`w-full border p-2 px-2 rounded border-gray-300 bg-transparent ${errors.first_name ? 'border-red-500' : ''}`}
                                id="First"
                                placeholder="First Name"
                                value={first_name}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    // Allow only A–Z and spaces
                                    if (/^[A-Za-z ]*$/.test(value)) {
                                        setFirst_name(value);
                                        setErrors(prev => ({ ...prev, first_name: '' }));
                                    }
                                }}
                                required
                            />

                        </div>
                        <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2">
                            <label htmlFor="Last">Last Name {errors.last_name && <span className="text-red-500">*</span>}</label>
                            <input
                                type="text"
                                className={`w-full border p-2 px-2 rounded border-gray-300 bg-transparent ${errors.last_name ? 'border-red-500' : ''}`}
                                id="Last"
                                placeholder="Last Name"
                                value={last_name}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    if (/^[A-Za-z ]*$/.test(value)) {
                                        setLast_name(value);
                                        setErrors(prev => ({ ...prev, last_name: '' }));
                                    }
                                }}
                                required
                            />

                        </div>
                        <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2">
                            <label htmlFor="Number">Mobile Number {errors.mobile_no && <span className="text-red-500">*</span>}</label>
                            <input
                                type="number"
                                className={`w-full border p-2 px-2 rounded border-gray-300 bg-transparent ${errors.mobile_no ? 'border-red-500' : ''}`}
                                id="Number"

                                placeholder="Mobile Number"
                                value={mobile_no}
                                onChange={(e) => {
                                    setMobileNumber(e.target.value);
                                    setErrors(prev => ({ ...prev, mobile_no: '' }));
                                }}
                                required
                            />
                        </div>
                        <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2">
                            <label htmlFor="Email">Email {errors.email && <span className="text-red-500">*</span>}</label>
                            <input
                                type="email"
                                className={`w-full border p-2 px-2 rounded border-gray-300 bg-transparent ${errors.email ? 'border-red-500' : ''}`}
                                id="Email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrors(prev => ({ ...prev, email: '' }));
                                }}
                                required
                            />
                        </div>
                    </div>
                    <h3 className="py-5 text-2xl font-semibold">
                        Delivery details:
                    </h3>
                    <div className="grid grid-cols-12 gap-5 py-5">
                        <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2 relative">
                            <label htmlFor="dropdown">Area {errors.selectedAreaId && <span className="text-red-500">*</span>}</label>
                            <div
                                onClick={() => setIsDropdown(!isDropdown)}
                                className={`flex justify-between items-center p-2 rounded px-3 my-2 border border-gray-300 bg-transparent cursor-pointer ${errors.selectedAreaId ? 'border-red-500' : ''}`}
                            >
                                <p>{selectedArea}</p>
                                <PiCaretDownThin size={20} />
                            </div>

                            {isDropdown && (
                                <div className="absolute z-10 sm:col-span-6 col-span-full w-full rounded-lg top-24 overflow-y-auto h-40 bg-white border border-gray-200">
                                    {/* Uncomment and populate with your options if needed */}
                                    {Array.isArray(AreaList) &&
                                        AreaList?.map((area, index) => (
                                            <h3
                                                key={index}
                                                className="text-black p-2 px-4 cursor-pointer hover:bg-gray-100"
                                                onClick={() =>
                                                    handleAreaChange(area)
                                                } // Use arrow function here
                                            >
                                                {area.area_name}
                                            </h3>
                                        ))}
                                </div>
                            )}
                            <label htmlFor="address">Address {errors.billing_address && <span className="text-red-500">*</span>}</label>
                            <textarea
                                className={`w-full border p-2 px-2 rounded border-gray-300 bg-transparent resize-none ${errors.billing_address ? 'border-red-500' : ''}`}
                                placeholder="Enter your address"
                                cols={4}
                                rows={5}
                                id="address"
                                value={billing_address}
                                onChange={(e) => {
                                    setBillingAddress(e.target.value);
                                    setErrors(prev => ({ ...prev, billing_address: '' }));
                                }}
                                required
                            ></textarea>
                            {/* <div className="w-[90%] flex flex-col mb-[8px] "> */}
                            {/* <input
                    type="text"
                    ref={searchInputRef}
                    placeholder="City/Region"
                    // value={city}(e) => setCity(e.target.value)
                    onChange={() => setBillingAddress(searchInputRef?.current?.value)}
                    onBlur={handleBlur}
                    className="border p-2 w-full mb-3 rounded-[6px] "
                  /> */}
                            {/* {errors.city && <p className="text-red-500">{errors.city}</p>
                  } */}
                            {/* </div> */}
                        </div>
                        <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2 justify-center relative">
                            <label htmlFor="special-instruction">
                                Special Instruction
                            </label>
                            <textarea
                                className="w-full h-[235px] border p-2 px-2 rounded border-gray-300 bg-transparent resize-none" // Added fixed height and disabled resizing
                                placeholder="Message"
                                cols={4}
                                rows={8}
                                id="special-instruction"
                                value={special_instruction}
                                onChange={(e) =>
                                    setSpecialInstructions(e.target.value)
                                }
                                required
                            ></textarea>
                        </div>
                    </div>
                    <h3 className="py-5 text-2xl font-semibold">Payment:</h3>
           <div className="border-b border-gray-300 py-3">
    <p className="text-xs mb-2">Delivery Location</p>

    <div className="h-44 w-full rounded-lg overflow-hidden">
        <MapContainer 
            center={[24.8607, 67.0011]} 
            zoom={13} 
            scrollWheelZoom={false} 
            className="h-full w-[200px] md:w-full"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap"
            />
        </MapContainer>
    </div>
</div>


                    {/* <img
                        className="py-10 w-full"
                        src={`${Image_Url}mapImg.svg`}
                        alt="Map"
                    /> */}
                    {/* <div className="map-container">
                <GoogleMapComponent searchInputRef={searchInputRef} />
              </div> */}
                </form>

                <div className="h96 lg:w-2/5 sm:w-3/5 w-full">
                    <div className="px-3 rounded-lg flex flex-col justify-start py-5 gap-3 ">
                        {/* border lg:border-none border-[#1E7773] */}
                        <h3 className="text-3xl font-semibold">Your order:</h3>
                        <div className="flex flex-col justify-start pt-10 gap-5">
                            <div className="flex flex-row justify-between items-center">
                                <h3>Subtotal:</h3>
                                <h3>Rs: {subtotal}</h3>
                            </div>
                            {/* {areaDeliveryCharges && */}
                            <div className="flex flex-row justify-between items-center">
                                <h3>Delivery:</h3>
                                <h3>Rs: {areaDeliveryCharges}</h3>
                            </div>
                            {/* } */}
                            {/* <hr className="border-r-2 border-gray-500" />
                            <div className="flex flex-row justify-between items-center">
                                <h3>Discount Code:</h3>
                                <input
                                    type="text"
                                    className="border rounded-lg bg-transparent w-24 p-1"
                                    onChange={(e) =>
                                        setDiscount(e.target.value)
                                    }
                                />
                            </div> */}
                            <hr className="border-r-2 border-gray-500" />
                            <div className="flex flex-row justify-between items-center">
                                <h3>Total:</h3>
                                <h3>Rs: {total}</h3>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={() => handleCheckGuest()}
                                    className="bg-[#1E7773] cursor-pointer font-bold w-full rounded-lg font-bazaar p-2"
                                >
                                    PURSHASE
                                </button>
                                {/* <button className='flex flex-row justify-center items-center border border-[#1E7773]  w-full rounded-lg font-bazaar p-2'><MdOutlineNavigateBefore size={20} /><p className="pt-0.5"> CONTINUE SHOPPING</p></button> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col itemsbetween text-white py-4 ">
                        {cartItems?.map((product) => (
                            <div
                                key={product.id}
                                className="flex  gap-4 py-5 border-b border-gray-600 justify-center items-center"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={`${Assets_Url}${product.product_img}`}
                                        alt={product.name}
                                        className="w-40 h-32 border-2 border-[#1E7773] rounded-xl object-cover"
                                    />
                                    {/* <button className="mr-2 text-white"><RxCross2 /></button> */}
                                </div>
                                <div className="flex flex-col justify-center items-start gap-2 px4">
                                    <div className="flex gap-10 justify-between">
                                        <h3 className="text-xs md:text-xl">
                                            {product.product_name}
                                        </h3>
                                        <button
                                            className="mr-2 text-white"
                                            onClick={() =>
                                                handleRemove(product.id)
                                            }
                                        >
                                            <RxCross2 />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap md:flex-row items-center justifybetween gap-2 text-[10px]">
                                        {product.product_variants &&
                                            product.product_variants.length > 0 ? (
                                            <>
                                                {(() => {
                                                    // Find the selected variant based on the current pack size
                                                    const selectedVariant =
                                                        product.product_variants.find(
                                                            (variant) =>
                                                                Number(
                                                                    variant.pack_size
                                                                ) ===
                                                                Number(
                                                                    product.pack_size
                                                                )
                                                        );

                                                    // Display the variant price if found
                                                    return (
                                                        <p>
                                                            Rs:{" "}
                                                            {selectedVariant
                                                                ? selectedVariant.price
                                                                : "N/A"}
                                                        </p>
                                                    );
                                                })()}
                                            </>
                                        ) : (
                                            <p>Variant Rs: N/A</p>
                                        )}

                                        <div className="border border-gray-300 rounded-lg flex flex-row justify-center w-16">
                                            <select
                                                className="bg-transparent w-16 outline-none p-1 text-sm"
                                                onChange={(e) =>
                                                    updatePackSize(
                                                        product.id,
                                                        e.target.value
                                                    )
                                                }
                                                value={product.pack_size}
                                            >
                                                {product?.product_variants?.map(
                                                    (variant) => (
                                                        <option
                                                            key={variant.id}
                                                            value={
                                                                variant.pack_size
                                                            }
                                                            className="text-black"
                                                        >
                                                            {variant.pack_size}{" "}
                                                        - {variant.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-center px2 border border-gray-300 w-16 rounded-lg text-sm">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        product.id,
                                                        Math.max(
                                                            1,
                                                            product.product_quantity -
                                                            1
                                                        )
                                                    )
                                                }
                                                className=" text-white p-1"
                                            >
                                                -
                                            </button>
                                            <p className="px-2">
                                                {product.product_quantity}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        product.id,
                                                        product.product_quantity +
                                                        1
                                                    )
                                                }
                                                className=" text-white p-1"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="border border-gray-300 w-16 rounded-lg text-sm text-center py-1">
                                            {product.total_pieces} 
- {product.name}
                                        </div>
                                        <p className="flex flex-col gap-0 text-xs">
                                            Rs: {product.product_total}
                                            <span className="text-[10px] text-gray-400">
                                                Per Pieces:{" "}
                                                {/* {product.price_per_piece}Rs */}
                                                {Number(product.price_per_piece ? product.price_per_piece : 0) + Number(product.lid_Price ? product.lid_Price : 0) + Number(product?.option_Price ? product?.option_Price : 0)} Rs
                                            </span>
                                        </p>
                                    </div>
                                    {product?.product_options?.lenght >= 0 && (
                                        <select
                                            className="bg-[#20202C] w-30 outline-none p-1 mt-1 mr-1 text-[9px] border-[1px] border-white rounded-md"
                                            onChange={(e) =>
                                                updateProductOption(
                                                    product.id,
                                                    e.target.value,
                                                    'size'
                                                )
                                            } // Call updatePackSize on change
                                            value={product.product_size} // Set the selected value from the product size
                                        >
                                            {product?.product_options?.map(
                                                (option) => (
                                                    <option
                                                        key={option.id}
                                                        value={option.size}
                                                        className="text-white text-[9px]"
                                                    >
                                                        {option.size} (
                                                        {option.option}){" "}
                                                        {/* Show size and option */}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    )}
                                    {/* <div className="w-full flex flex-row justify-between gap-10 items-start"> */}
                                    {/* <p className="flex flex-col gap-0 ">
                                            Rs: {product.product_total}
                                            <span className="text-xs text-gray-400">Per Pieces: {product.price_per_piece}Rs</span>
                                        </p> */}
                                    {/* Logic to find the selected variant based on pack size */}

                                    {/* </div> */}
                                    {/* <div className="flex flexrow w-full justify-between">
                                        <p>hello</p>
                                        <p>hello</p>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {isModal && (
                <CheckoutModal
                    setIsModal={setIsModal}
                    isModal={isModal}
                    setAsGuest={setAsGuest}
                    handleCheckOut={handleCheckOut}
                />
            )}
            {/* {isInvoice && (
                <InvoicePopup isInvoice={isInvoice} setIsInvoice={setIsInvoice} invoicedetails={invoicedetails} setInvoicedetails={setInvoicedetails} />
            )} */}
            {isInvoice && (
                <InvoicePopup
                    isInvoice={isInvoice}
                    setIsInvoice={setIsInvoice}
                    invoicedetails={invoicedetails}
                />
            )}
        </div>
    );
}

export default Checkout;