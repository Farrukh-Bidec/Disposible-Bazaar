"use client";
import React, { useState } from 'react';
import { IoCheckmark } from 'react-icons/io5';
import axios from '../Utils/axios';
import { Loader } from '../components/Loader';
import { Assets_Url, Image_Url } from '../const';

export const OrderTrack = () => {
  const [orderId, setOrderId] = useState("");
  const [trackOrder, setTrackOrder] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch order details from the API
  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.protected.get(`order/track/${orderId}`);
      const trackOrderData = response.data.data;
      setTrackOrder(trackOrderData);
      setOrderDetail(trackOrderData.order_details);
    } catch (error) {
      setError("Failed to track order. Please try again.");
      console.error('Error tracking order:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      alert("Please enter a valid order ID");
      return;
    }
    // Fetch order details based on order ID
    fetchOrderDetails();
  };

  // Handle input change
  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };

  return (
    <div className="lg:ml-20 w-full max-w-2xl p-6 text-white">
      <h4 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Track Order</h4>

      {!trackOrder && !loading && (
        <form onSubmit={handleTrackOrder} className="flex flex-row gap-5 pb-5 items-center justify-between">
          {/* Order ID Input */}
          <input
            type="text"
            value={orderId}
            onChange={handleInputChange}
            placeholder="Enter your order ID here"
            className="md:w-4/5 w-3/5  px-4 py-2 mb6 text-white border border-gray-700 bg-transparent rounded-md focus:outline-none focus:ring focus:border-green-600"
            aria-label="Order ID"
          />

          {/* Track Order Button */}
          <button
            type="submit"
            className=" py-2 md:w-1/5 w-2/5 bg-[#1E7773] text-white rounded-md text-sm hover:bg-[#1E7770] transition-all duration-300"
          >
            Track Order
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      )}

      {loading && (
        <div className="flex justify-center items-center ">
          <Loader />
        </div>
      )}

      {trackOrder && !loading && (
        <div className='h-[500px] w-full overflow-auto'>
          {/* Order Status Messaging */}
          {trackOrder.order_status === 1 ? (
            <p className="text-yellow-500 text-lg text-center font-semibold mt-8">
              Order {orderId} is Pending
            </p>
          ) : trackOrder.order_status === 5 ? (
            <p className="text-red-500 text-lg text-center font-semibold mt-8">
              Order {orderId} was Rejected
            </p>
          ) : (
            <div className="relative w-full mt-2">
              {/* Progress Bar */}
              <div className="relative w-full h-5 bg-gray-700 rounded-full">
                <div
                  className="absolute h-5 rounded-full bg-[#1E7773] transition-all"
                  style={{
                    width:
                      trackOrder.order_status === 4
                        ? '100%'
                        : trackOrder.order_status === 3
                        ? '52%'
                        : '12%',
                  }}
                ></div>

                {/* Checkmarks and status */}
                <div className="absolute top-6 inset-0 flex justify-between items-center">
                  {/* Processing */}
                  <div className="relative flex flex-col items-center">
                    <IoCheckmark
                      className={`${
                        trackOrder.order_status >= 2 ? 'text-white border p-0.5 rounded-full font-bold' : 'text-gray-500'
                      } text-xl `}
                    />
                    <p className="text-sm mt-2">Processing</p>
                  </div>

                  {/* Shipped */}
                  <div className="relative flex flex-col items-center">
                    <IoCheckmark
                      className={`${
                        trackOrder.order_status >= 3 ? 'text-white border p-0.5 rounded-full font-bold' : 'text-gray-500'
                      } text-xl`}
                    />
                    <p className="text-sm mt-2">Shipped</p>
                  </div>

                  {/* Delivered */}
                  <div className="relative flex flex-col items-center">
                    <IoCheckmark
                      className={`${
                        trackOrder.order_status === 4 ? 'text-white border p-0.5 rounded-full font-bold' : 'text-gray-500'
                      } text-xl`}
                    />
                    <p className="text-sm mt-2">Delivered</p>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="relative mt-10 z-10 ">
                <h2 className="text-lg font-semibold mb-4">Order Details</h2>
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Product Info</th>
                      <th className="px-4 py-2">Pack Size</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetail.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 flex items-center">
                          <div className="w-16 h-16 bg-gray-300 rounded mr-4">
                            <img
                              className="w-full h-full rounded-xl object-cover"
                              src={
                                item.product?.image_path
                                  ? `${Assets_Url}${item.product?.image_path}`
                                  : `${Image_Url}defaultImage.svg`
                              }
                              alt={item.product?.name || 'Product Image'}
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <p className="font-semibold">
                              {item.product?.name.length > 20
                                ? `${item.product?.name.slice(0, 20)}...`
                                : item.product?.name}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">{Number(item.pack_size)}p</td>
                        <td className="px-4 py-4">{Number(item.qty)}</td>
                        <td className="px-4 py-4">Rs: {Number(item.product_sub_total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
