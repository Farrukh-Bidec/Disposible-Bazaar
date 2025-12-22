"use client";
import React, { useEffect, useRef, useState } from "react";
import Hamburger from "../components/Hamburger";
import { PiCaretDownThin } from "react-icons/pi";
import { Assets_Url, Image_Url } from "../const";
import { RxCross2 } from "react-icons/rx";
import CheckoutModal from "../components/CheckoutModal";
import { useCart } from "../Context/CartContext";
import { useUser } from "../Context/UserContext";
import axios from "../Utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvoicePopup from "../components/InvoicePopup";
import { useRouter } from "next/navigation";
import JSConfetti from "js-confetti";

function Checkout() {
  const { user } = useUser();
  const { cartItems, removeFromCart, updateQuantity, updatePackSize, updateProductOption } = useCart();

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
  const [invoicedetails, setInvoicedetails] = useState([]);

  const navigate = useRouter();
  const canvasRef = useRef();
  const confettiRef = useRef();

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.public.get("areasList");
        setAreaList(response.data.data);
      } catch (error) {
        console.log("Error fetching areas:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    confettiRef.current = new JSConfetti({ canvas: canvasRef.current });
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.product_total), 0);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal + Number(areaDeliveryCharges);

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckGuest = () => {
    if (!user && asGuest === 1) {
      setIsModal(true);
      return;
    }
    handleCheckOut();
  };

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
    setIsDropdown(false);
  };

  const handleCheckOut = async () => {
    const userData = JSON.parse(localStorage.getItem("user_data"));
    const userId = userData ? userData.user_id : null;

    // Validation
    if (!cartItems || cartItems.length === 0) {
      toast.error("Please add an item to the cart");
      return;
    }
    if (!first_name || !last_name || !mobile_no || !billing_address || !selectedAreaId) {
      toast.error("Please fill in all required fields.");
      return;
    }
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

    cartItems.forEach((item, index) => {
      if (!item.bundle_status) {
        const matchedOption = item.product_options?.find(
          (option) => option.size === item.product_size && option.option === item.product_color
        );

        formData.append(`order_detail[${index}][product_id]`, item.product_id);
        formData.append(`order_detail[${index}][quantity]`, item.product_quantity);
        formData.append(`order_detail[${index}][pack_size]`, item.pack_size);
        formData.append(`order_detail[${index}][total_pieces]`, item.total_pieces);
        formData.append(`order_detail[${index}][product_sub_total]`, item.product_total);
        formData.append(`order_detail[${index}][_is_customize]`, item.logo ? 1 : 0);

        if (matchedOption) {
          formData.append(`order_detail[${index}][product_option_id]`, matchedOption.id);
        }

        formData.append(`order_detail[${index}][customizeDetail]`, item.customizeDetail || null);
        formData.append(`order_detail[${index}][packagingOptions][print_location]`, item.packaging_options?.print_location || null);
        formData.append(`order_detail[${index}][packagingOptions][side_option]`, item.packaging_options?.side_option || null);
        formData.append(`order_detail[${index}][packagingOptions][price]`, item.packaging_options?.price || null);
        formData.append(`order_detail[${index}][lid]`, item.lid || null);

        if (item.logo) {
          const blob = base64ToBlob(item.logo);
          formData.append(`order_detail[${index}][customize_logo_image]`, blob, "customized-logo.png");
        }
      }
    });

    cartItems.forEach((item, index) => {
      if (item.bundle_status) {
        formData.append(`bundle_ids[${index}]`, item.product_id);
        formData.append(`bundle_qtys[${index}]`, item.product_quantity);
      }
    });

    try {
      setIsModal(false);
      const response = await axios.public.post("order/place", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { status, message, order_id } = response.data;

      if (status === "warning") {
        toast.warning(message);
        return;
      }
      if (status === "error") {
        toast.error(message);
        return;
      }

      if (status === "success") {
        const orderDetails = {
          orderId: order_id,
          orderDate: formattedDate,
          first_name,
          last_name,
          email,
          mobile_no,
          items: cartItems.map((item) => ({
            productName: item.product_name,
            price: item.product_total,
            price_per_piece: item.price_per_piece,
            quantity: item.total_pieces,
            image: item.product_img,
          })),
          paymentInfo: { method: "Visa", lastFourDigits: "56" },
          deliveryInfo: { address: billing_address, number: mobile_no },
          subtotal,
          deliveryCharges: selectedAreaId ? 150 : 0,
          grandTotal: total,
        };

        // Clear cart and form
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

        // Show toast and confetti
        toast.success(message);
        confettiRef.current.addConfetti({ confettiRadius: 5, confettiNumber: 300 });

        // Navigate after short delay so toast is visible
        setTimeout(() => {
          navigate("thankyou", { state: orderDetails });
        }, 1000);
      }
    } catch (error) {
      console.log("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="py-32 md:px-10 px-5 text-white">
      <ToastContainer autoClose={500} />
      <div className="text-white py-4">
        <Hamburger firstPage="Home" secondPage="Checkout" />
        <h3 className="text-6xl pt-10 font-bazaar">Checkout</h3>
      </div>
      <section className="flex lg:flex-row flex-col-reverse justify-between items-center gap-10">
        <form className="lg:w-3/5 w-full">
          {/* Personal Information */}
          <h3 className="py-5 text-2xl font-semibold">Personal information:</h3>
          <div className="grid grid-cols-12 gap-5 py-5">
            <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2">
              <label htmlFor="First">First Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded border-gray-300 bg-transparent"
                id="First"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => {
                  if (/^[A-Za-z ]*$/.test(e.target.value)) setFirst_name(e.target.value);
                }}
                required
              />
            </div>
            <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2">
              <label htmlFor="Last">Last Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded border-gray-300 bg-transparent"
                id="Last"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => {
                  if (/^[A-Za-z ]*$/.test(e.target.value)) setLast_name(e.target.value);
                }}
                required
              />
            </div>
            <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2">
              <label htmlFor="Number">Mobile Number</label>
              <input
                type="number"
                className="w-full border p-2 rounded border-gray-300 bg-transparent"
                id="Number"
                placeholder="Mobile Number"
                value={mobile_no}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                className="w-full border p-2 rounded border-gray-300 bg-transparent"
                id="Email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Delivery Details */}
          <h3 className="py-5 text-2xl font-semibold">Delivery details:</h3>
          <div className="grid grid-cols-12 gap-5 py-5">
            <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2 relative">
              <label htmlFor="dropdown">Area</label>
              <div
                onClick={() => setIsDropdown(!isDropdown)}
                className="flex justify-between items-center p-2 rounded px-3 my-2 border border-gray-300 bg-transparent cursor-pointer"
              >
                <p>{selectedArea}</p>
                <PiCaretDownThin size={20} />
              </div>

              {isDropdown && (
                <div className="absolute z-10 sm:col-span-6 col-span-full w-full rounded-lg top-24 overflow-y-auto h-40 bg-white border border-gray-200">
                  {Array.isArray(AreaList) &&
                    AreaList.map((area, index) => (
                      <h3
                        key={index}
                        className="text-black p-2 px-4 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleAreaChange(area)}
                      >
                        {area.area_name}
                      </h3>
                    ))}
                </div>
              )}

              <label htmlFor="address">Address</label>
              <textarea
                className="w-full border p-2 rounded border-gray-300 bg-transparent resize-none"
                placeholder="Enter your address"
                cols={4}
                rows={5}
                id="address"
                value={billing_address}
                onChange={(e) => setBillingAddress(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="sm:col-span-6 col-span-full w-full flex flex-col gap-2 justify-center relative">
              <label htmlFor="special-instruction">Special Instruction</label>
              <textarea
                className="w-full h-[235px] border p-2 rounded border-gray-300 bg-transparent resize-none"
                placeholder="Message"
                cols={4}
                rows={8}
                id="special-instruction"
                value={special_instruction}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          {/* Payment */}
          <h3 className="py-5 text-2xl font-semibold">Payment:</h3>
          <div className="border-b border-gray-300 py-3 flex flex-row items-center justify-between">
            <p className="text-xs">Only Cash on delivery</p>
            <img src={`${Image_Url}cashOndeliveryImg.svg`} alt="Cash on delivery" />
          </div>
          <img className="py-10 w-full" src={`${Image_Url}mapImg.svg`} alt="Map" />
        </form>

        {/* Order Summary */}
        <div className="h96 lg:w-2/5 sm:w-3/5 w-full">
          <div className="px-3 rounded-lg flex flex-col justify-start py-5 gap-3 ">
            <h3 className="text-3xl font-semibold">Your order:</h3>
            <div className="flex flex-col justify-start pt-10 gap-5">
              <div className="flex flex-row justify-between items-center">
                <h3>Subtotal:</h3>
                <h3>Rs: {subtotal}</h3>
              </div>
              <div className="flex flex-row justify-between items-center">
                <h3>Delivery:</h3>
                <h3>Rs: {areaDeliveryCharges}</h3>
              </div>
              <hr className="border-r-2 border-gray-500" />
              <div className="flex flex-row justify-between items-center">
                <h3>Total:</h3>
                <h3>Rs: {total}</h3>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleCheckGuest}
                  className="bg-[#1E7773] cursor-pointer font-bold w-full rounded-lg font-bazaar p-2"
                >
                  PURCHASE
                </button>
              </div>
            </div>
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

      {isInvoice && (
        <InvoicePopup
          isInvoice={isInvoice}
          setIsInvoice={setIsInvoice}
          invoicedetails={invoicedetails}
        />
      )}

      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none"></canvas>
    </div>
  );
}

export default Checkout;
