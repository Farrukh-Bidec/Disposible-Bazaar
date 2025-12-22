"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import { useUser } from "../Context/UserContext";
import axios from "../Utils/axios";
import { Profile_Assets_Url } from "../const";
import { Loader } from "../components/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Profile = () => {
  const { user, setUser } = useUser();
  const [client, setClient] = useState({});
  const [profilePicture, setProfilePicture] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const form = useRef();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.protected.get("user");
  //       setClient(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //     setLoading(false);
  //   };
  //   fetchUser();
  // }, []);

  useEffect(() => {
    if (client?.photo) {
      setProfilePicture(`${Profile_Assets_Url}/${client.photo}`);
    }
    if (client) {
      setFormData({
        name: client.name || "",
        photo: null,
      });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files) {
      const file = files[0];
      if (file) {
        if (file.type.startsWith("image/")) {
          setProfilePicture(URL.createObjectURL(file));
          setFormData((prevState) => ({ ...prevState, photo: file }));
        } else {
          toast.error("Please select a valid image file.");
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id", user?.id);

    if (formData.name) data.append("name", formData.name);
    if (formData.photo) data.append("photo", formData.photo);
    if (formData.address) data.append("address", formData.address);
    if (formData.phone) data.append("phone", formData.phone);

    try {
      const response = await axios.protected.post("updateUser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        const updatedUser = {
          ...user,
          name: formData.name || user.name,
          photo: formData.photo
            ? URL.createObjectURL(formData.photo)
            : user.photo,
          address: formData.address || user.address,
          phone: formData.phone || user.phone,
        };
        setUser(updatedUser);
        toast.success("User data updated successfully!");
      } else {
        toast.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("An error occurred while updating user data. Try again later.");
    }
  };

  return (
    <>
      <ToastContainer autoClose={500} />
      {loading ? (
        <div className="w-full max-w-2xl">
          <Loader />
        </div>
      ) : (
        <form
          className="w-full max-w-2xl lg:ml-20 p-6 text-white flex flex-wrap gap-10"
          onSubmit={updateUser}
          ref={form}
        >
          <div className="space-y-4 w-full">
            {/* Name */}
            <div className="flex justify-between items-center w-full">
              <div className="w-full">
                <p className="text-md">Name</p>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={client?.name || ""}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="text-white p-1 rounded-md lg:w-96 w-11/12 border border-white bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="flex justify-between items-center w-full">
              <div className="w-full">
                <p className="text-md">Phone Number</p>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  defaultValue={client?.phone || ""}
                  onChange={handleChange}
                  className="text-white p-1 rounded-md lg:w-96 w-11/12 border border-white bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex justify-between items-center w-full">
              <div className="w-full">
                <p className="text-md">Email Address</p>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  defaultValue={client?.email || ""}
                  disabled
                  className="text-white p-1 rounded-md lg:w-96 w-11/12 border border-white bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div className="flex justify-between items-center w-full">
              <div className="w-full">
                <p className="text-md">Address</p>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter your shipping address"
                  defaultValue={client?.address || ""}
                  onChange={handleChange}
                  className="text-white p-1 rounded-md lg:w-96 w-11/12 border border-white bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                className="bg-[#1E7773] text-white px-6 py-2 rounded-lg"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="relative h-24 w-24 flex justify-center items-center rounded-full overflow-hidden border-4 border-gray-700">
            <img
              src={
                profilePicture ||
                "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg"
              }
              alt="Profile"
              className="h-full w-full object-cover"
            />
            <LiaUserEditSolid className="absolute text-white text-3xl -bottom-0 right-4" />
            <input
              type="file"
              name="photo"
              id="photo"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleChange}
            />
          </div>
        </form>
      )}
    </>
  );
};
