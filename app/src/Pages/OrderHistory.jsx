"use client";
import React, { useEffect, useState } from 'react';
import axios from '../Utils/axios';
import { Loader } from '../components/Loader';
import './Pages.css'
import Invoice from './Invoice';
// import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const OrderHistory = ({setActivePage}) => {
  const [orderList, setOrderList] = useState({});
  const [loading, setLoading] = useState(false);

  // handleDownloadInvoice(id){
  const handleDownloadInvoice = async (order) => {
    setLoading(true);
    // setError('');
console.log(orderDetails);

    // Order details to pass to the invoice
    const orderDetails = {
      orderId: order.order_no, // Ensure your API returns this
      orderDate: order.order_date,
      first_name: order.name,
      last_name: order.name,
      email: order.email,
      mobile_no: order.phone,
      items: order.order_details.map(item => ({
        productName: item.product_name,
        price: item.product_sub_total,
        price_per_piece: item.price_per_piece,
        quantity: item.qty,
        image: item.product_img, // Ensure this is the correct image source
      })),
      paymentInfo: {
        method: 'Visa',
        lastFourDigits: '56',
      },
      deliveryInfo: {
        address: billing_address,
        number: mobile_no,
      },
      subtotal: subtotal,
      deliveryCharges: selectedAreaId ? 150 : 0, // Adjust according to your logic
      grandTotal: total,
    };

    // Create a div element to render the invoice
    const invoiceDiv = document.createElement('div');
    document.body.appendChild(invoiceDiv);

    // Create a root for React 18
    const root = ReactDOM.createRoot(invoiceDiv);

    // Render the Invoice component inside the newly created div
    root.render(<Invoice orderDetails={orderDetails} />);

    // Wait for the component to be rendered before capturing it
    setTimeout(async () => {
      try {
        const canvas = await html2canvas(invoiceDiv, { scale: 2 }); // Increase scale for better quality
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();

        // Calculate the PDF dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // Add the image to PDF and handle multiple pages if needed
        while (heightLeft >= 0) {
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position -= pageHeight; // Move the position down for the next page
          if (heightLeft >= 0) {
            pdf.addPage(); // Add a new page if there's more content
          }
        }

        pdf.save(`Invoice_${orderDetails.orderId}.pdf`);
      } catch (error) {
        console.error("Error generating PDF: ", error);
        // setError("Failed to generate the invoice. Please try again.");
      } finally {
        // Clean up the DOM by unmounting and removing the invoice div
        root.unmount();
        document.body.removeChild(invoiceDiv);
        setLoading(false); // Reset loading state
      }
    }, 500); // Delay to allow the Invoice component to render
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.protected.get('order/list');
        const listData = response.data.data;

        // Set the data as it is, since it's an object containing different order statuses
        if (typeof listData === 'object' && listData !== null) {
          setOrderList(listData);
        } else {
          setOrderList({});
        }

        console.log(listData);
      } catch (error) {
        console.error("Failed to fetch order list", error);
        setOrderList({});
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="lg:ml-20 text-white w-full max-w-2xl p-6 rounded-lg relative">
      {/* Order History Header */}
      <h4 className="text-2xl font-bold mb-6 border-b pb-2 border-gray-700">Order History</h4>

      {loading ? (
        // Loading Component
        <Loader />
      ) : (
        // Check if there are orders
        Object.keys(orderList).length > 0 ? (
          <div className="h-[500px] w-full overflow-auto"> {/* Changed overflow to overflow-auto */}
            {Object.entries(orderList).map(([statusKey, statusData]) => (
              <div key={statusKey}>
                {/* Order Status Label */}
                <h2 className="text-xl font-semibold mb-4 text-teal-400">{statusData.status_label}</h2>

                {statusData.orders.length > 0 ? (
                  statusData.orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 flex justify-between items-center bg-gray-800 rounded-lg mb-4 shadow-md"
                    >
                      {/* Order Details */}
                      <div>
                        <p className="font-medium">Order ID: <span className="font-semibold">{order.order_no}</span></p>
                        <p className="text-sm">Order Date: <span className="">{order.order_date}</span></p>

                        {/* You can add more order details here */}
                      </div>

                      {/* Get Invoice Button */}
                      <button
                        className="border border-teal-400 rounded p-2 px-4 text-sm font-semibold text-teal-400 duration-300 hover:bg-teal-400 hover:text-black"
                        // onClick={() => handleDownloadInvoice(order)}
                        onClick={()=> setActivePage('track')}
                        >
                        Track Order
                      </button>
                    </div>
                  ))
                ) : (
                  // No Orders in the Status Category
                  <p className="text-center text-gray-400">No orders found in this category.</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          // No Orders at All
          <p className="text-center text-gray-400">No orders found.</p>
        )
      )}
    </div>
  );
};

export default OrderHistory;
