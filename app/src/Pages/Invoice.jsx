"use client";
import React from 'react';
// import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Image_Url } from '../const';

const Invoice = ({ orderDetails }) => {
    const {
        orderId,
        orderDate,
        items,
        paymentInfo,
        deliveryInfo,
        subtotal,
        deliveryCharges,
        grandTotal,
        first_name,
        email,
        mobile_no
    } = orderDetails;

    return (
        <div
            c         >
            {/* Header */}
            <div className="flex justify-center justifybetween items-center border-b pb-4">
                {/* <img
                    src={`${Image_Url}Logo.png`}
                    alt="Disposable Bazaar"
                    height="80"
                    width="80"
                /> */}
                {/* <h4 className='text-4xl text-black font-bazaar'>DB</h4> */}
                <div className="textright text-center">
                    <h4 className="text-3xl font-semibold text-gray-800 mb-2">Disposable Bazaar</h4>
                    <p className="text-gray-500">info@disposablebazaar.com</p>
                    <p className="text-gray-500">0321-3850002</p>
                    <p className="text-gray-500">1429 Netus Rd, NY 48247</p>
                </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-2 items-center mt-6">
                <div>
                    <h2 className="text-gray-800 text-lg font-semibold">Bill to:</h2>
                    <p className="text-gray-600">{first_name}</p>
                    <p className="text-gray-600">{email}</p>
                    <p className="text-gray-600">{mobile_no}</p>
                </div>
                <div className="text-right">
                    <p className="text-gray-700">Invoice Number: <span className="font-bold">{orderId}</span></p>
                    <p className="text-gray-700">Invoice Date: <span className="font-bold">{orderDate}</span></p>
                </div>
            </div>

            {/* Invoice Items */}
            <div className="overflow-x-auto mt-8">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Items</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Quantity</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Price</th>
                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-3 px-4 text-sm text-gray-800">{item.productName}</td>
                                <td className="text-right py-3 px-4 text-sm text-gray-600">{item.quantity}</td>
                                <td className="text-right py-3 px-4 text-sm text-gray-600">{item.price_per_piece} Rs</td>
                                <td className="text-right py-3 px-4 text-sm text-gray-600">{item.price} Rs</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="py-4 text-right font-medium text-gray-700">Subtotal</td>
                            <td className="text-right py-4 font-medium text-gray-700">{subtotal} Rs</td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="py-4 text-right font-medium text-gray-700">Delivery Charges</td>
                            <td className="text-right py-4 font-medium text-gray-700">{deliveryCharges} Rs</td>
                        </tr>
                        <tr>
                            <td colSpan="3" className="py-4 text-right font-semibold text-gray-900">Grand Total</td>
                            <td className="text-right py-4 font-semibold text-gray-900">{grandTotal} Rs</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            {/* Footer */}
            <div className="border-t mt-6 pt-4 text-xs text-gray-500 text-center">
                <p>Please make the payment before the due date.</p>
            </div>
        </div>
    );
};

export default Invoice;
