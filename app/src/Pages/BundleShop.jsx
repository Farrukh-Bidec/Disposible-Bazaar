"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomHeroSection from "../components/CustomHeroSection";
import { Assets_Url, Image_Not_Found, Image_Url } from "../const";
import axios from "../Utils/axios";
import { Loader } from "../components/Loader";
import CustomSeo from "../components/CustomSeo";

function BundleShop() {
  const router = useRouter();
  const [grid, setGrid] = useState(3);
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [filteredProduct, setFilteredProduct] = useState([]);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 400) setGrid(1);
    else if (screenWidth < 768) setGrid(2);
    else if (screenWidth < 1024) setGrid(3);
    else setGrid(3);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.public.get(`bundles`);
      setFilteredProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 12);
  };

  return (
    <div className="py-13">
      <CustomSeo id={3} />
      <CustomHeroSection
        heading="Ready Bundles"
        path="bundles"
        bgImage="CustomHeroAssets/bundlesbanner.png"
      />

      <div className="lg:px-10 px-0 flex">
        <section className="flex p-5 hscreen lg:w-full w-full">
          <div className="py-4 w-full flex flex-col gap2 text-white rounded-lg">
            <div className="flex justify-between">
              <h4 className="text-4xl font-bazaar">Bundles</h4>
              <div className="hidden lg:flex justify-between gap-3 items-center">
                <h4 className="text-md font-bazaar">View</h4>
                <img
                  onClick={() => setGrid(4)}
                  className="cursor-pointer"
                  src={`${Image_Url}${
                    grid === 4 ? "ShopAssets/4greenGridImg.svg" : "ShopAssets/4gridImg.svg"
                  }`}
                  alt=""
                />
                <img
                  onClick={() => setGrid(3)}
                  className="cursor-pointer"
                  src={`${Image_Url}${
                    grid === 3 ? "ShopAssets/3greenGridImg.svg" : "ShopAssets/3gridImg.svg"
                  }`}
                  alt=""
                />
                <img
                  onClick={() => setGrid(2)}
                  className="cursor-pointer"
                  src={`${Image_Url}${
                    grid === 2 ? "ShopAssets/2greenGridImg.svg" : "ShopAssets/2gridImg.svg"
                  }`}
                  alt=""
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <Loader />
              </div>
            ) : filteredProduct?.length === 0 ? (
              <div className="flex justify-center h-screen items-center py-10">
                <h2 className="text-4xl font-bazaar">No products found</h2>
              </div>
            ) : (
              <>
                <div
                  className={`py-10 grid ${
                    grid === 4
                      ? "grid-cols-4"
                      : grid === 3
                      ? "grid-cols-3"
                      : grid === 2
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  } gap-4 justify-center w-full`}
                >
                  {filteredProduct?.slice(0, visibleProducts).map((product, index) => (
                    <div
                      key={index}
                      onClick={() => router.push(`/bundle/${product.slug}`)}
                      className="cursor-pointer"
                    >
                      <div className={`flex ${grid === 2 && index % 2 === 0 ? "justify-end" : "justify-start"}`}>
                        <div className={`w-${grid === 2 ? "fit w-82 h-full" : "full"} xl:p-4 h76 p-2 flex flex-col border border-[#1E7773] bg-[#32303e] rounded-2xl group`}>
                          <div className="relative p-5 flex flex-col justify-center items-center max">
                            <img
                              className="w-full h-[243px] block rounded-xl object-cover"
                              src={product.main_image ? `${Assets_Url}${product.main_image}` : `${Image_Url}defaultImage.svg`}
                              alt={product.name || "Product Image"}
                              style={{ transition: "opacity 0.5s ease 0.3s" }}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.src = Image_Not_Found;
                              }}
                            />
                          </div>
                          <h4 className="font-semibold xl:text-lg h-10">{product.name}</h4>
                          <p className="text-md py-3 font-semibold">Rs {Number(product.payable_amount)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProduct?.length > 12 && visibleProducts < filteredProduct?.length ? (
                  <div className="flex justify-center">
                    <button
                      className="p-2 px-4 bg-[#1E7773] w-fit lg:text-md pt-3 text-md font-bazaar rounded-lg"
                      onClick={handleLoadMore}
                    >
                      LOAD MORE
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <p>No More Products</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default BundleShop;
