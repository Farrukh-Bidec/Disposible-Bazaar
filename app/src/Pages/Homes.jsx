"use client";

import React, { useEffect, Suspense, lazy } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../Context/UserContext";
import CustomSeo from "../components/CustomSeo";
import "../../globals.css";

// Lazy load components
const Categories = lazy(() => import("../components/Home/Categories"));
const Products = lazy(() => import("../components/Home/Products"));
const Introduction = lazy(() => import("../components/Home/Introduction"));
const Quality = lazy(() => import("../components/Home/Quality"));
const Deals = lazy(() => import("../components/Home/Deals"));
const Blogs = lazy(() => import("../components/Home/Blogs"));
const InstaFeed = lazy(() => import("../components/Home/InstaFeed"));
const CircleSlider = lazy(() => import("../components/Home/circleSlider"));
const Premium = lazy(() => import("../components/Home/premium"));
const HeroSlider = lazy(() => import("../components/Home/HeroSlider"));


const Homes = () => {
  const { user } = useUser();

  useEffect(() => {
    AOS.init({ duration: 800, delay: 0 });
  }, []);

  useEffect(() => {
    const hasShownToast = localStorage.getItem("toastShown");
    if (user && !hasShownToast) {
      toast.success(`Welcome ${user.name}`);
      localStorage.setItem("toastShown", "true");
    }
  }, [user]);

  return (
    <div className="bg-[#20202c] overflow-hidden py-24 md:py-28">
    <CustomSeo id={7}/>
      <ToastContainer autoClose={500} />
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </div>
  );
};

export default Homes;
