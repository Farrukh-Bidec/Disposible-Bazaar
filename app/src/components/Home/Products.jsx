"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { Assets_Url } from "../../const";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import { useRouter } from "next/navigation";

const Products = () => {
  const [product, setProduct] = useState([]);
  const router = useRouter();

  useEffect(() => {
    Aos.init({ duration: 2000, delay: 0 });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.public.get(
          "product/category?sectionName=oneStopShop"
        );
        setProduct(response.data.data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryLink = (product) => {
    // In Next.js, you navigate using router.push
    router.push(`/product-category/${product.slug}`);
  };

  return (
    <div className="w-full py-25 text-white">
      <div className="flex md:flex-row flex-col justify-around md:gap-10 gap-2 my-16 md:text-start text-center items-center">
        <h3
          data-aos="fade-right"
          className="md:w-1/2 w-11/12 font-bazaar md:text-6xl text-4xl aos-init aos-animate"
        >


          Our One-Stop Shop for  Disposable Products
        </h3>
        <p
          data-aos="fade-left"
          className="md:w-1/3 w-11/12 md:text-md text-sm"
        >
          Discover our extensive range of high-quality disposable items
          designed for convenience and sustainability.
        </p>
      </div>

      <Swiper
        data-aos="fade-up"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          100: { slidesPerView: 2 },
          400: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1100: { slidesPerView: 5 },
        }}
        spaceBetween={10}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {product.map((product, index) => (
          <SwiperSlide key={index}>
            <div
              data-aos="fade-up"
              className={`${
                index % 2 === 0 ? "mb-10" : "mt-10"
              } relative cursor-pointer flex md:ml5 md:mx-2 rounded-2xl flex-col items-center overflow-hidden lg:h-96 sm:h-80 h-72`}
              onClick={() => handleCategoryLink(product)}
              style={{
                background: `url('${Assets_Url}${product.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
              }}
            >
              <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h2 className="md:text-[30px] text-2xl font-bazaar">{product.name}</h2>
                <button
                  className="mt-5 w-full bg-teal-600 cursor-pointer text-white py-3 md:text-[15px] text-xs font-bazaar px-4 rounded-lg "
                  onClick={() => handleCategoryLink(product)}
                >
                  EXPLORE PRODUCTS
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> 
    </div>
  );
};

export default Products;
