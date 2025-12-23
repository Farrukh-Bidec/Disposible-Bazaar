 "use client";

import React, { useEffect, useState } from "react";
import CustomHeroSection from "../components/CustomHeroSection";
import PriceRange from "../components/Shop/PriceRange";
import { Assets_Url, Image_Not_Found, Image_Url } from "../const";
import { RiFilter3Line } from "react-icons/ri";

import PriceRangeMob from "../components/Shop/PriceRangeMob";
import { useSearchParams } from "next/navigation";
import CustomPriceRange from "../components/Customizaton/CustomPriceRange";
import CustomPriceRangeMob from "../components/Customizaton/CustomPriceRangeMob";
// import { useCart } from "../context/CartContext";
import axios from "../Utils/axios";
import { Loader } from "../components/Loader";
import CustomSeo from "../components/CustomSeo";
import Link from "next/link";
import { useCart } from "../Context/CartContext";

export default function Customization() {
  const [grid, setGrid] = useState(3);
  const searchParams = useSearchParams();
  const searchTermFromURL = searchParams.get("q");
  const category = searchParams.get("category"); // category as query param (Next.js)
const  addToCart  = useCart();

 const [disabledButtons, setDisabledButtons] = useState({});
const [selectedProduct, setSelectedProduct] = useState(null);
const [quantity, setQuantity] = useState(1);
const [showQtyModal, setShowQtyModal] = useState(false);
const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const [isFilter, setIsFilter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL || "");

  const [filter, setFilter] = useState({
    price_from: 0,
    price_to: 0,
    sort_by: 1,
    category_Id: [],
    pack_size: [],
    size_id: [],
    option_id: [],
    rating: [],
  });

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 400) {
      setGrid(1);
    } else if (screenWidth < 768) {
      setGrid(2);
    } else if (screenWidth < 1024) {
      setGrid(3);
    } else {
      setGrid(3);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --------------------------
  // Fetch Data
  // --------------------------
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      params.append("price_from", filter.price_from);
      params.append("price_to", filter.price_to);
      params.append("sort_by", filter.sort_by);

      if (Array.isArray(filter.category_Id)) {
        filter.category_Id.forEach((id) => params.append("category_id[]", id));
      }

      if (Array.isArray(filter.pack_size)) {
        filter.pack_size.forEach((pack) => params.append("pack_size", pack));
      }

      if (Array.isArray(filter.size)) {
        filter.size.forEach((s) => params.append("size_id", s));
      }

      if (Array.isArray(filter.option_id)) {
        filter.option_id.forEach((o) => params.append("option_id", o));
      }

      if (Array.isArray(filter.rating)) {
        filter.rating.forEach((r) => params.append("rating", r));
      }

      const response = await axios.public.get(
        `search/Customizeproduct?${params.toString()}`
      );

      setFilteredProduct(response.data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search term update
  useEffect(() => {
    setSearchTerm(searchTermFromURL || "");
    console.log("filteredProduct" , filteredProduct);
    
  }, [searchTermFromURL]);

  // category change update
  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      category_Id: category ? [category] : [],
    }));
  }, [category]);

  // Fetch when filter or searchTerm changes
  useEffect(() => {
    const timeout = setTimeout(fetchData, 300);
    return () => clearTimeout(timeout);
  }, [filter, searchTerm]);

  const handleFilter = (filters) => {
    setFilter((prev) => ({
      ...prev,
      price_from: filters.price_from ?? prev.price_from,
      price_to: filters.price_to ?? prev.price_to,
      sort_by: filters.selected ?? prev.sort_by,
      category_Id: filters.category_Id ?? prev.category_Id,
      pack_size: filters.pack_size ?? prev.pack_size,
      size: filters.size ?? prev.size,
      option_id: filters.option_id ?? prev.option_id,
      rating: filters.rating ?? prev.rating,
    }));
  };




    const handleLoadMore = () => {
        setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 12);
    };

    const handleAddCart = (product) => {
        const product_id = product.id;
        const product_name = product.name;
        const pack_size = Number(product.product_variants[0].pack_size);
        const product_quantity = 1;
        const total_pieces = pack_size;
        const price_per_piece = Number(product.product_variants[0].price_per_piece);
        const product_total = (price_per_piece * total_pieces).toFixed(2);
        const product_img = product.product_image[0].image;
        const product_variants = product.product_variants;

        

          setSelectedProduct(product);
    setQuantity(1);
    setShowQtyModal(true);

        addToCart(
            product_id,
            product_name,
            product_quantity,
            pack_size,
            total_pieces,
            price_per_piece,
            product_img,
            product_total,
            product_variants,
        );
        setIsCartModalOpen(true);
    };

  return (
   <div >
            <CustomSeo id={3} />
            <CustomHeroSection heading='Build Your Perfect Match' path='Customization ' custom="customization" bgImage="HomeAssets/HeroSecton/Banner3.png" />
            <div className="md:py-20 py-10 lg:px-10 px-0 flex">
                <section className="hidden lg:flex flex flex-col p-5 text-white hscreen lg:w-1/5">
                    <CustomPriceRange onFilter={handleFilter} />
                </section>
                <div className="">
                    <CustomPriceRangeMob onFilter={handleFilter} isFilter={isFilter} setIsFilter={setIsFilter} />
                </div>
        <section className="flex p-5 hscreen lg:w-4/5 w-full">
          <div className="py-4 w-full flex flex-col gap2 text-white rounded-lg">
            <div className="flex justify-between">
              <h4 className="text-4xl font-bazaar">Shop All</h4>

              <div>
                <button onClick={() => setIsFilter(true)}>
                  <RiFilter3Line className="lg:hidden block text-4xl rounded-full p-2 bg-[#1E7773]" />
                </button>

                {/* Grid Buttons */}
                <div className="hidden lg:flex justify-between gap-3 items-center">
                  <h4 className="text-md font-bazaar">View</h4>

                  <img
                    onClick={() => setGrid(4)}
                    className="cursor-pointer"
                    src={`${Image_Url}${
                      grid === 4
                        ? "ShopAssets/4greenGridImg.svg"
                        : "ShopAssets/4gridImg.svg"
                    }`}
                  />

                  <img
                    onClick={() => setGrid(3)}
                    className="cursor-pointer"
                    src={`${Image_Url}${
                      grid === 3
                        ? "ShopAssets/3greenGridImg.svg"
                        : "ShopAssets/3gridImg.svg"
                    }`}
                  />

                  <img
                    onClick={() => setGrid(2)}
                    className="cursor-pointer"
                    src={`${Image_Url}${
                      grid === 2
                        ? "ShopAssets/2greenGridImg.svg"
                        : "ShopAssets/2gridImg.svg"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Loader */}
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader />
              </div>
            ) : filteredProduct?.length === 0 ? (
              <div className="flex justify-center h-screen items-center py-10">
                <h2 className="text-4xl font-bazaar">Loading ...</h2>
              </div>
            ) : (
              <>
                {/* Product Cards */}
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
                  {filteredProduct
                    ?.slice(0, visibleProducts)
                    .map((product, index) => (
                      <Link key={index} href={`/customization/${product.slug}`}>
                        <div
                          className={`flex ${
                            grid === 2 && index % 2 === 0
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div className="w-full xl:p-4 p-2 flex flex-col border border-[#1E7773] bg-[#32303e] rounded-2xl group">
                            <div className="relative p-5 flex flex-col justify-center items-center">
                              <img
                                className="w-full h-full block group-hover:hidden rounded-xl object-cover"
                                src={
                                  product.product_image
                                    ? `${Assets_Url}${product.product_image[0]?.image}`
                                    : `${Image_Url}defaultImage.svg`
                                }
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.src = Image_Not_Found;
                                }}
                              />

                              <img
                                className="w-full h-full hidden group-hover:block rounded-xl object-cover"
                                src={
                                  product.product_image
                                    ? `${Assets_Url}${product.product_image[1]?.image}`
                                    : `${Image_Url}defaultImage.svg`
                                }
                                loading="lazy"
                                onError={(e) => {
                                  e.currentTarget.src = Image_Not_Found;
                                }}
                              />
                            </div>

                            <h4 className="font-semibold xl:text-lg">
                              {product.name}
                            </h4>

                            <p className="text-md py-3 font-semibold">
                              {product.product_variants?.length > 0 ? (
                                <>
                                  Rs {product.product_variants[0].price} - Rs{" "}
                                  {
                                    product.product_variants[
                                      product.product_variants.length - 1
                                    ].price
                                  }
                                </>
                              ) : (
                                <span>No variants available</span>
                              )}
                            </p>
                             {/* <div className="flex xl:flex-row lg:flex-col justify-center xl:gap-4 gap-1">
  <button
    className="p-2 bg-[#1E7773] w-full font-bazaar cursor-pointer rounded-lg"
    onClick={() => handleAddCart(product)}
    disabled={loading || disabledButtons[product.id]}
  >
    ADD TO CART
  </button>

  <button
    href={`/product/${product.slug}`}
    className="p-2 border border-[#1E7773] text-center w-full h-fit font-bazaar rounded-lg flex items-center justify-center"
  >
    BUY NOW
  </button>
</div> */}

                          </div>
                        </div>
                      </Link>
                    ))}
                </div>

                {/* Load More */}
                {filteredProduct?.length > 12 &&
                visibleProducts < filteredProduct.length ? (
                  <div className="flex justify-center">
                    <button
                      className="p-2 px-4 bg-[#1E7773] w-fit text-md font-bazaar rounded-lg"
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
