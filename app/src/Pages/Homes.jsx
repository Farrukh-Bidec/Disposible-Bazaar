"use client";

import React, { useEffect } from "react";
import Categories from "../components/Home/Categories";
import Products from "../components/Home/Products";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Introduction from "../components/Home/Introduction";
import Quality from "../components/Home/Quality";
import Deals from "../components/Home/Deals";
import Blogs from "../components/Home/Blogs";
import InstaFeed from "../components/Home/InstaFeed";
import CircleSlider from "../components/Home/circleSlider";
import Premium from "../components/Home/premium";
import HeroSlider from "../components/Home/HeroSlider";
import { useUser } from "../Context/UserContext";
import CustomSeo from "../components/CustomSeo";
import "../../globals.css";
// import dynamic from "next/dynamic";


const Homes = () => {
  const { user } = useUser();

  useEffect(() => {
    AOS.init({ duration: 2000, delay: 0 });
  }, []);

  useEffect(() => {
    const hasShownToast = localStorage.getItem("toastShown");
    if (user && !hasShownToast) {
      toast.success(`Welcome ${user.name}`);
      localStorage.setItem("toastShown", "true");
    }
  }, [user]);

  // const CustomSeo = dynamic(() => import("../components/CustomSeo"), { ssr: false });

  return (
    <div className="bg-[#20202c] overflow-hidden py-24 md:py-28">
    <CustomSeo id={7}/>
      <ToastContainer autoClose={500} />
      <HeroSlider />
      <Products />
      <CircleSlider />
      <Categories />
      <Introduction />
      <Quality />
      <Premium />
      <Deals />
      <InstaFeed />
      <Blogs />
    </div>
  );
};

export default Homes;
