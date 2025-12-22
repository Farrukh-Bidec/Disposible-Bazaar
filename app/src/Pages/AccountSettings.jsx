"use client";

import React, { useState } from 'react';
import { Profile } from './Profile';
import { Security } from './Security';
import { OrderTrack } from './OrderTrack';
import { OrderHistory } from './OrderHistory';
import { RiFilter3Line } from 'react-icons/ri';
import { MdOutlineCancel } from 'react-icons/md';
import axios from '../Utils/axios';
import { useRouter } from "next/navigation";
import { removeAccessToken, removeUserData } from '../Utils/storage';

export const AccountSettings = () => {
  const [activePage, setActivePage] = useState('info');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const handlePageChange = (page) => {
    setActivePage(page);
    setIsSidebarOpen(false); // close mobile sidebar on selection
  };

// ...existing code...
  const handleLogout = async () => {
    try {
      // call server logout (include cookies)
      await axios.protected.get("logout", { withCredentials: true });

      // Always clear local client session/state
      removeAccessToken();
      removeUserData();
      localStorage.removeItem("toastShown");

      // Force App Router server components to revalidate
      try { router.refresh(); } catch (e) { /* ignore */ }

      // Navigate to login and replace history so back doesn't return to protected page
      try { router.replace("/login"); } catch (e) { /* ignore */ }

      // Ensure a full reload so server state/cookies are in sync
      setTimeout(() => {
        try { window.location.href = "/login"; } catch (e) { window.location.reload(); }
      }, 300);
    } catch (error) {
      console.error("Error during logout:", error);

      // still clear and force refresh/navigation on error
      removeAccessToken();
      removeUserData();
      localStorage.removeItem("toastShown");
      try { router.refresh(); } catch (e) {}
      try { router.replace("/login"); } catch (e) {}
      setTimeout(() => {
        try { window.location.href = "/login"; } catch (e) { window.location.reload(); }
      }, 300);
    }
  };
// ...existing code...

  return (
    <div className='flex flex-col'>
      {/* Mobile menu button */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-white text-xl flex justify-center items-center bg-[#1E7773] p-2 mt-24 rounded-full"
        >
          <RiFilter3Line />
        </button>
      </div>

      <div className="flex justify-center md:my-40 ">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-1/5 h-fit mt-8 pr-6 py-10 border-r border-white">
          <h2 className="text-2xl text-white font-bold mb-10">Account Settings</h2>
          <ul className="space-y-4">
            <li className={`text-[#1E7773] cursor-pointer ${activePage === 'info' ? 'font-bold' : ''}`} onClick={() => handlePageChange('info')}>Personal Information</li>
            <li className={`text-[#1E7773] cursor-pointer ${activePage === 'security' ? 'font-bold' : ''}`} onClick={() => handlePageChange('security')}>Security Settings</li>
            <li className={`text-[#1E7773] cursor-pointer ${activePage === 'track' ? 'font-bold' : ''}`} onClick={() => handlePageChange('track')}>Track Order</li>
            <li className={`text-[#1E7773] cursor-pointer ${activePage === 'history' ? 'font-bold' : ''}`} onClick={() => handlePageChange('history')}>Order History</li>
            <li className={`text-[#1E7773] cursor-pointer`} onClick={handleLogout}>Logout</li>
          </ul>
        </aside>

        {/* Mobile Sidebar */}
        <aside className={`lg:hidden flex absolute top-20 py-10 px-5 left-0 z-10 mt-3 h-screen overflow-y-auto flex-col w-80 transition-transform duration-300 ease-in-out text-sm text-white bg-[#1E7773] shadow-lg rounded ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <h2 className="text-2xl flex justify-between items-center font-bold mb-10">
            Account Settings
            <MdOutlineCancel onClick={() => setIsSidebarOpen(false)} size={30} />
          </h2>
          <ul className="space-y-4">
            <li className={`cursor-pointer ${activePage === 'info' ? 'font-bold' : ''}`} onClick={() => handlePageChange('info')}>Personal Information</li>
            <li className={`cursor-pointer ${activePage === 'security' ? 'font-bold' : ''}`} onClick={() => handlePageChange('security')}>Security Settings</li>
            <li className={`cursor-pointer ${activePage === 'track' ? 'font-bold' : ''}`} onClick={() => handlePageChange('track')}>Track Order</li>
            <li className={`cursor-pointer ${activePage === 'history' ? 'font-bold' : ''}`} onClick={() => handlePageChange('history')}>Order History</li>
            <li className="cursor-pointer" onClick={handleLogout}>Logout</li>
          </ul>
        </aside>

        {/* Main Content */}
        
          {activePage === 'info' && <Profile />}
          {activePage === 'security' && <Security />}
          {activePage === 'track' && <OrderTrack />}
          {activePage === 'history' && <OrderHistory setActivePage={setActivePage} />}
        
      </div>
    </div>
  );
};


