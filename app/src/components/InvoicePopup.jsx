"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { Assets_Url } from "../const";
import { CiCamera } from "react-icons/ci";
import Link from "next/link";

const InvoicePopup = ({ setIsInvoice, isInvoice, invoicedetails }) => {
  const invoiceRef = useRef(null);

  // Capture screenshot
  const captureScreenshot = () => {
    if (!invoiceRef.current) return;
    html2canvas(invoiceRef.current, { useCORS: true, scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `disposable_bazaar_${invoicedetails?.orderId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  if (!invoicedetails) return null; // Wait until order details are loaded

  return (
    <div className="fixed inset-0  flex flex-col items-center justify-center z-50 py-24 lg:mt-8 h-screen">
      <div ref={invoiceRef} className="bg-[#20202C] text-black w-full min-h-screen overflow-y-auto relative">
        {/* Header */}
        <div className="bg-[#1E7773] h-[100px] md:h-[150px] flex flex-col justify-center items-center text-white text-center py-8">
          <h3 className="text-xl md:text-3xl font-bazaar md:text-[58px] mb-2">
            Thank You for Your Purchase!
          </h3>
          <p className="text-sm md:text-lg">
            We truly appreciate your trust in us! Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-4 my-12 text-white">
          <div className="w-full md:w-[420px] py-10 pr-10 overflow-y-auto max-h-[400px] flex flex-col px-6 gap-4">
            <h2 className="text-2xl font-bazaar">
              Contact <span className="text-[#1E7773]">Information</span>
            </h2>
            <p className="text-md font-medium">Email: {invoicedetails?.email}</p>
            <p className="text-md font-medium">Phone: {invoicedetails?.deliveryInfo?.number}</p>
            <p className="text-md font-medium">Address: {invoicedetails?.deliveryInfo?.address}</p>

            <h2 className="text-2xl font-bazaar">
              Order <span className="text-[#1E7773]">Details</span>
            </h2>
            <p className="text-md font-medium">Order ID: {invoicedetails?.orderId}</p>
            <p className="text-md font-medium">Order Date: {invoicedetails?.orderDate}</p>
            <p className="text-md font-medium">Total Amount: Rs: {invoicedetails?.grandTotal}</p>
          </div>

          {/* Divider */}
          <div
            className="hidden md:block h-[417px] w-[1px] border-[1px]"
            style={{
              borderImageSource:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 5%, #323232 48.8%, rgba(0, 0, 0, 0) 95%)",
              borderImageSlice: 1,
            }}
          ></div>

          {/* Items */}
          <div className="w-full md:w-1/2 px-10 overflow-y-auto max-h-[340px] flex flex-col items-center justify-between gap-4">
            {invoicedetails?.items.map((item, index) => (
              <div key={index} className="flex w-full flex-row items-center justify-between gap-2">
                <div>
                  <img
                    className="w-20 h-20 rounded-xl border-2 border-[#1E7773]"
                    src={`${Assets_Url}${item?.image}`}
                    alt={item?.productName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm w-11/12">{item?.productName.split(" ").slice(0, 2).join(" ")}</h3>
                  <h3 className="hidden md:block text-sm">Amount Per Piece: {item?.price_per_piece}</h3>
                  <div className="flex justify-between gap-4">
                    <h3 className="md:hidden text-sm">Qty: {item?.quantity}</h3>
                    <h3 className="block md:hidden text-sm">Item Price: {Number(item?.price)}</h3>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="hidden md:block text-sm">Qty: {item?.quantity}</h3>
                  <h3 className="hidden md:block text-sm">Item Price: {Number(item?.price)}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="text-center px-4 my-12 md:mt-0">
          <h3 className="hidden md:block text-[#1E7773] text-2xl md:text-3xl font-bazaar mb-4">
            Keep Shopping
          </h3>
          <p className="hidden md:block text-[#9f9f9f] mb-6">
            Explore more of our exciting products and special offers
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/shop/">
              <button onClick={() => setIsInvoice(false)} className="bg-[#1E7773] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#145a58] transition">
                Continue Shopping →
              </button>
            </Link>
            <button
              onClick={captureScreenshot}
              className="bg-[#1E7773] text-white px-4 py-2 rounded-full shadow-lg hover:bg-[#145a58] transition flex items-center gap-2"
            >
              Take Screenshot <CiCamera />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePopup;
