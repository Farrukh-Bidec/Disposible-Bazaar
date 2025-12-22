"use client";
import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ContactFormModal from "./ContactFormModal";

const FloatingButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* WhatsApp */}
        <a
          href="https://wa.me/+923213850002"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <FaWhatsapp size={24} />
        </a>

        {/* Contact Us (Modal) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <MdEmail size={24} />
        </button>

      </div>

      {/* Contact Form Modal */}
      {isModalOpen && <ContactFormModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default FloatingButtons;
