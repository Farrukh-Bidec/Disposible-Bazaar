"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "../Utils/axios";
import { toast } from "react-toastify";

const ContactFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Replace with your API endpoint
      const res = await axios.public.post("/contact-us", formData);
    //   alert("Message sent successfully!");
        toast.success("Message sent successfully!");
      onClose();
    } catch (error) {
      console.error(error);
    //   alert("Something went wrong, please try again.");
    toast.error(
      error.response?.data?.message || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🔹 Background overlay
    <div
      className="fixed inset-0  z-50 flex items-end justify-end"
      onClick={onClose} // closes when clicking outside
    >
      {/* Contact Box */}
      <div
        className="bg-white rounded-lg shadow-xl w-64 p-5 m-6 relative animate-slide-up"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <IoClose size={22} />
        </button>

        <h2 className="text-lg font-semibold mb-3 text-black">
          Contact Form
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Disposable Bazaar"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded text-sm"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded text-sm"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="info@disposablebazaar.com"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded text-sm"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="border p-2 rounded text-sm resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 rounded text-sm hover:bg-gray-800"
          >
            {loading ? "Sending..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;
