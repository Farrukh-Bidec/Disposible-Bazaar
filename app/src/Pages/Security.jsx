"use client";
import React, { useState } from 'react';
import axios from '../Utils/axios';

export const Security = () => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(''); 

    // Handle input change
    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const updatePassword = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.protected.post('user/changePassword', {
                currentPass: passwordData.currentPassword,
                newPass: passwordData.newPassword,
            });

            // Handle success response
            if (response.data.status === 200) {
                setError(''); // Clear any previous errors
                alert("Password changed successfully!");
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                setError(response.data.message); // Show API error message
            }
        } catch (error) {
            console.error("Error updating password:", error);
            // Set the error message from the response or the caught error
            setError(error.response?.data?.message || "An error occurred while updating the password.");
        }
    };

    return (
            <div className="lg:ml-20 text-white w-full max-w-2xl p-6 rounded-lg relative">
                <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
                <form onSubmit={updatePassword}>
                    {/* Current Password */}
                    <div className="mb-4">
                        <label className="block text-sm  text-white mb-1">
                            Current Password
                        </label>
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder='********'
                            value={passwordData.currentPassword}
                            onChange={handlePasswordInputChange}
                            className="lg:w-96 w-full  px-3 py-2 text-white border border-white bg-transparent rounded-md focus:outline-none "
                            required
                        />
                    </div>

                    {/* New Password */}
                    <div className="mb-4">
                        <label className="block text-sm  text-white mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordInputChange}
                            className="lg:w-96 w-full  px-3 py-2 text-white border border-white bg-transparent rounded-md focus:outline-none "
                            required
                        />
                    </div>

                    {/* Confirm New Password */}
                    <div className="mb-4">
                        <label className="block text-sm  text-white mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordInputChange}
                            className="lg:w-96 w-full  px-3 py-2 text-white border border-white bg-transparent rounded-md focus:outline-none "
                            required
                        />
                    </div>

                    <div className="text-left">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#1E7773] text-white rounded-md hover:bg-[#1E7770] transition-all duration-300"
                        >
                            Change Password
                        </button>
                    </div>
                </form>
                {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            </div>
    );
};
