"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Assets_Url } from "../../src/const";
import Link from "next/link";
import axios from "../../src/Utils/axios";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../../src/Context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../src/Context/UserContext";
import { FiX } from "react-icons/fi";
import CartModal from "../../src/components/cart/CartModal";
import DecodeTextEditor from "../../src/components/DecodeTextEditor";
import { Loader } from "../../src/components/Loader";

export default function BundleDetail() {
  const router = useRouter();

  // 🔥 FIX: slug fetch correctly
  const params = useParams();
  const {slug }= params;   // <-- FIX (NOT params.id)
console.log("idddd" , slug);

  const [productDetail, setProductDetail] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [subQuantity, setSubQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { addToCart } = useCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { user } = useUser();

  // ----------------------------------------
  //   📌 Fetch Bundle by id
  // ----------------------------------------
// Rename the function
const fetchDataBySlug = async (slug) => {
  if (!slug) return;

  setIsLoading(true);

  try {
    const response = await axios.public.post("bundles/getBySlug", { slug: `${slug}/` });
    const resData = response.data.data;
    console.log("response", resData);

    setProductDetail(resData);
    setProductImages(resData?.bundle_images || []);
    setSelectedImage(resData?.bundle_images?.[0]?.image || "");
  } catch (error) {
    console.error("Error fetching bundle:", error);
  } finally {
    setIsLoading(false);
  }
};

// ✅ Call the correct function in useEffect
useEffect(() => {
  if (slug) fetchDataBySlug(slug);
}, [slug]);


  // ----------------------------------------
  //   🛒 Add To Cart
  // ----------------------------------------
  const handleAddCart = (product) => {
    const total =
      (Number(product.payable_amount) * Number(subQuantity)).toFixed(2);

    addToCart(
      product.id,
      product.name,
      subQuantity,
      null,
      subQuantity,
      Number(product.payable_amount),
      selectedImage,
      total,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      true
    );

    setIsCartModalOpen(true);
  };

  // ----------------------------------------
  //   📲 WhatsApp Share
  // ----------------------------------------
  const whatsappNumber = "+92 3213850002";
  const productUrl = typeof window !== "undefined" ? window.location.href : "";

  const inquiryMessage = encodeURIComponent(
    `Hello! I am interested in this bundle:\n\n${productDetail?.name}\n\n${productUrl}`
  );

  if (isLoading) return <Loader />;

  return (
    <div className="relative py-30 px-10 text-white overflow-hidden">
      <ToastContainer autoClose={500} />

      {/* Breadcrumb */}
      <div className="flex flex-col py-5">
        <p>
          <Link href="/">Home</Link> /{" "}
          <Link href="/bundle/">Bundle</Link> / {productDetail?.name}
        </p>
      </div>
      {console.log("ppp",productDetail)}

      <main>
        <section className="flex lg:flex-row flex-col gap-8">

          {/* LEFT IMAGES */}
          <div className="lg:w-3/5 md:h-[34rem] h-[20rem] flex flex-row gap-2">
            <div className="w-1/5 flex flex-col gap-1">
              {(productImages || []).map((img, i) => (
                <div key={i} className="w-full h-1/4 py-1">
                  <img
                    className="w-fulx l h-full bg-[#32303e] rounded-xl border-2 border-[#1E7773] object-cover cursor-pointer"
                    src={`${Assets_Url}${img.image}`}
                    onClick={() => setSelectedImage(img.image)}
                  />
                </div>
              ))}
            </div>

            <div className="w-4/5 rounded-lg bg-[#32303e]">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={`${Assets_Url}${selectedImage}`}
              />
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="lg:w-2/5 flex flex-col gap-5 text-white">
            <h1 className="md:text-5xl text-3xl font-semibold">
              {productDetail?.name}
            </h1>

            {/* PRODUCTS IN BUNDLE */}
            {productDetail?.bundle_items?.length > 0 && (
              <div className="border border-[#1E7773] rounded-lg">
                <p className="bg-[#1E7773] rounded-t-lg py-1 px-5">Products</p>
                <div className="p-3 flex flex-col gap-1">
                  {productDetail.bundle_items.map((p) => (
                    <p key={p.id}>
                      {p.product?.name} — {p.quantity} pcs — Price {p.price}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="flex gap-3">
              <div className="border border-[#1E7773] rounded-md flex justify-between items-center px-2 w-24 h-10">
                <button
                  disabled={subQuantity === 1}
                  onClick={() => setSubQuantity(subQuantity - 1)}
                >
                  -
                </button>
                <p>{subQuantity}</p>
                <button onClick={() => setSubQuantity(subQuantity + 1)}>
                  +
                </button>
              </div>

              <button
                className="p-2 bg-[#1E7773] w-full 
cursor-pointer rounded-md"
                onClick={() => handleAddCart(productDetail)}
              >
                ADD TO CART
              </button>
            </div>

            {/* PRICE */}
            <p className="text-lg">
              Rs{" "}
              {productDetail?.payable_amount
                ? Number(productDetail.payable_amount) * subQuantity
                : "0"}
            </p>

            {/* WHATSAPP ORDER */}
            <button
              className="p-3 border flex items-center gap-2 border-[#1E7773] rounded-md"
              onClick={() =>
                window.open(
                  `https://wa.me/${whatsappNumber}?text=${inquiryMessage}`,
                  "_blank"
                )
              }
            >
              <FaWhatsapp className="text-[#1E7773] text-2xl" /> ORDER ON
              WHATSAPP
            </button>
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="py-10">
          <h2 className="border-b border-[#1E7773] pb-2 text-xl">
            Product Description
          </h2>

          <div className="mt-3">
            {productDetail?.description ? (
              <DecodeTextEditor body={productDetail.description} />
            ) : (
              <p>No Description Found</p>
            )}
          </div>
        </section>
      </main>

      {/* CART MODAL */}
      {isCartModalOpen && (
        <div
          className="fixed inset-0 left-260  flex justify-center items-center z-50"
          onClick={() => setIsCartModalOpen(false)}
        >
          <div className="bg-white p-4 -mt-25 rounded-lg w-[300px] text-black">
            <div className="flex justify-between">
              <h4 className="font-bold">Added to Cart</h4>
              <FiX size={24} onClick={() => setIsCartModalOpen(false)} />
            </div>

            <CartModal />

            <div className="flex gap-2 mt-3">
              <Link
                href="/shop/"
                className="border border-[#1E7773] w-full text-center p-1 rounded-md text-[#1E7773]"
              >
                CONTINUE
              </Link>
              <Link
                href="/cart/"
                className="bg-[#1E7773] w-full text-center p-1 rounded-md text-white"
              >
                CART
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
