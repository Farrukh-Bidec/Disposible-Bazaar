"use client";
import React, { useEffect, useState } from "react";
import CustomHeroSection from "../components/CustomHeroSection";
import PriceRange from "../components/Shop/PriceRange";
import { Assets_Url, Image_Not_Found, Image_Url } from "../const";
import { RiFilter3Line } from "react-icons/ri";
import PriceRangeMob from "../components/Shop/PriceRangeMob";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "../Utils/axios";
import { Loader } from "../components/Loader";
import { useCart } from "../Context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartModal from "../components/cart/CartModal";
import { FiX } from "react-icons/fi";
import CustomSeo from "../components/CustomSeo";

function Shop() {
  const params = useParams();
  const category = params.category;

  const searchParams = useSearchParams();
  const searchTermFromURL = searchParams.get("q");

  const [grid, setGrid] = useState(3);
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL || "");
  const [filter, setFilter] = useState({
    price_from: 0,
    price_to: 0,
    sort_by: 1,
    category_Id: category || undefined,
  });
  const [isFilter, setIsFilter] = useState(false);
  const { addToCart } = useCart();
  const [disabledButtons, setDisabledButtons] = useState({});
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(true);

  const [showQtyModal, setShowQtyModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (shouldScroll) {
      window.scrollTo({ top: 450, behavior: "smooth" });
    }
    setShouldScroll(true);
  }, [searchTerm, filter, category]);

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 400) setGrid(1);
    else if (screenWidth < 768) setGrid(2);
    else if (screenWidth < 1024) setGrid(3);
    else setGrid(3);
  };

  // ⭐ SORTING LOGIC (kept same)
  const sortProducts = (data, sortType) => {
    return [...data].sort((a, b) => {
      if (sortType === 1) return a.name.localeCompare(b.name);
      if (sortType === 2) return b.name.localeCompare(a.name);
      return 0;
    });
  };

  // ⭐⭐⭐ UPDATED fetchData WITH SORTING ⭐⭐⭐
  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.public.get("search/product", {
        params: {
          price_from: filter.price_from,
          price_to: filter.price_to,
          sort_by: filter.sort_by,
          category_id: filter.category_Id,
          name: searchTerm,
          search: searchTerm ? true : false,
        },
      });

      let data = response.data?.data || [];

      // ❌ OLD BUG FIXED: "search" undefined tha
      // ❌ API ka structure handle nahi ho raha tha
      if (Array.isArray(data)) {
        data = data;
      } else if (data?.is_customizeable) {
        data = data.is_customizeable;
      }

      // ⭐ FINAL SORTING APPLY
      const sorted = sortProducts(data, filter.sort_by);

      setFilteredProduct(sorted);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Syncing URL q parameter
  useEffect(() => {
    setSearchTerm(searchTermFromURL || "");
  }, [searchParams.toString()]);

  useEffect(() => {
    setFilter((prev) => ({ ...prev, category_Id: category || undefined }));
  }, [category]);

  useEffect(() => {
    if (
      searchTerm ||
      filter.price_from > 0 ||
      filter.price_to > 0 ||
      filter.category_Id
    ) {
      const delay = setTimeout(() => fetchData(), 300);
      return () => clearTimeout(delay);
    }
  }, [filter, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [category, searchTerm]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilter = (filters) => {
    setFilter({
      ...filter,
      price_from: filters.price_from || filter.price_from,
      price_to: filters.price_to || filter.price_to,
      sort_by: filters.selected || filter.sort_by,
      category_Id: filters.category_Id || filter.category_Id,
    });
  };

  const handleLoadMore = () => {
    setShouldScroll(false);
    setVisibleProducts((prev) => prev + 12);
  };

  const handleAddCartClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowQtyModal(true);
  };

  const confirmAddToCart = () => {
    if (!selectedProduct) return;
    const product = selectedProduct;
    const variant = product.product_variants?.[0];
    if (!variant) return;

    const pack_size = Number(variant.pack_size ?? 1);
    const product_quantity = Number(quantity ?? 1);
    const total_pieces = pack_size * product_quantity;
    const price_per_piece = Number(variant.price_per_piece ?? variant.price ?? 0);
    const product_total = (price_per_piece * total_pieces).toFixed(2);
    const product_img = product.product_image?.[0]?.image ?? "";
    const product_variants = product.product_variants;

    addToCart(
      product.id,
      product.name,
      product_quantity,
      pack_size,
      total_pieces,
      price_per_piece,
      product_img,
      product_total,
      product_variants
    );

    setIsCartModalOpen(true);
    setShowQtyModal(false);
  };

  return (
    <div className="py-15 ">
      {/* ------ UI Same ------ */}
      <CustomSeo id={1} />
      <ToastContainer autoClose={500} />
      <CustomHeroSection
        heading="Shop All"
        path="Shop "
        bgImage="CustomHeroAssets/shopbanner.png"
      />











      

      <div className="lg:px-10 px-0 flex ">
        <section className="hidden lg:flex flex-col p-5 text-white lg:w-1/5">
          <PriceRange onFilter={handleFilter} isCategoryShown={true} />
        </section>

        <div>
          <PriceRangeMob
            onFilter={handleFilter}
            isFilter={isFilter}
            setIsFilter={setIsFilter}
            isCategoryShown={true}
          />
        </div>

        <section className="flex p-5 lg:w-4/5 w-full">
          <div className="py-4 w-full flex flex-col text-white rounded-lg">
            <div className="flex justify-between">
              <h3 className="text-4xl font-bazaar">
                {filter.category_Id
                  ? filteredProduct[0]?.category?.name
                  : "Shop All"}
              </h3>

              <button onClick={() => setIsFilter(true)}>
                <RiFilter3Line className="lg:hidden block text-4xl rounded-full p-2 bg-[#1E7773]" />
              </button>
            </div>

            {/* LOADING /  PRODUCTS LIST UI SAME */}
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader />
              </div>
            ) : filteredProduct.length === 0 ? (
              <div className="flex justify-center items-center h-screen">
                <h2 className="text-4xl font-bazaar">Loading ...</h2>
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
                  } gap-4`}
                >
                  {filteredProduct.slice(0, visibleProducts).map((product, index) => (
                    <div key={index} className="flex justify-center">
                      <div className="w-full xl:p-4 p-2 border border-[#1E7773] bg-gradient-to-l from-[#403E4A] to-[#32303E] rounded-2xl group">

                        <Link href={product.is_customizeable ? `/customization/${product.slug}` : `/product/${product.slug}`}>
                          <div className="relative p-5 flex justify-center items-center">
                            <img
                              className="w-full rounded-xl object-cover"
                              src={
                                product.product_image
                                  ? `${Assets_Url}${product.product_image[0]?.image}`
                                  : `${Image_Url}defaultImage.svg`
                              }
                              alt={product.product_image[0]?.image_alt || "Product Image"}
                              onError={(e) => (e.currentTarget.src = Image_Not_Found)}
                            />
                          </div>
                        </Link>

                        <h4 className="font-semibold xl:text-lg">{product.name}</h4>
                        <p className="text-md py-3 font-semibold">
                          {product.product_variants?.length > 0 ? (
                            <>
                              Rs {product.product_variants[0].price} - Rs{" "}
                              {product.product_variants[product.product_variants.length - 1].price}
                            </>
                          ) : (
                            <span>No variants</span>
                          )}
                        </p>

                        <div className="flex xl:flex-row lg:flex-col justify-center xl:gap-4 gap-1">
                          <button
                            className="p-2 bg-[#1E7773] w-full text-[13px] cursor-pointer font-bazaar rounded-lg"
                            onClick={() => handleAddCartClick(product)}
                            disabled={loading || disabledButtons[product.id]}
                          >
                            ADD TO CART
                          </button>

                          <Link
                            className="p-2 border border-[#1E7773] text-center w-full font-bazaar rounded-lg"
                            href={product.is_customizeable ? `/customization/${product.slug}` : `/product/${product.slug}`}
                          >
                            BUY NOW
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredProduct.length > 12 && visibleProducts < filteredProduct.length ? (
                  <div className="flex justify-center">
                    <button
                      className="p-2 px-4 bg-[#1E7773] text-md cursor-pointer font-bazaar rounded-lg"
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

        {/* Quantity Modal */}
        {showQtyModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] text-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Select Quantity
              </h3>

              <div className="flex items-center justify-center space-x-6 mb-6">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer text-gray-800 text-2xl font-bold flex items-center justify-center hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="text-xl text-gray-900 font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer text-gray-800 text-2xl font-bold flex items-center justify-center hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>

              <div className="flex justify-between gap-3">
                <button
                  onClick={() => setShowQtyModal(false)}
                  className="flex-1 bg-gray-300 cursor-pointer hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAddToCart}
                  className="flex-1 bg-[#1E7773] cursor-pointer hover:bg-[#155e5b] text-white font-semibold py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart Modal */}
        {isCartModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={() => setIsCartModalOpen(false)}
          >
            <div className="fixed md:top-32 md:right-4 bg-white shadow-lg p-4 rounded-lg z-50 w-[300px]">
              <div className="flex justify-between">
                <h4 className="text-md font-bold text-black">Added to Cart</h4>
                <FiX
                  size={24}
                  className="text-black"
                  onClick={() => setIsCartModalOpen(false)}
                />
              </div>

              <CartModal />

              <div className="flex gap-2 mt-2">
                <Link
                  href="/shop/"
                  className="p-1 flex justify-center border text-[#1E7773] border-[#1E7773] w-full rounded-md"
                >
                  CONTINUE
                </Link>
                <Link
                  href="/cart/"
                  className="p-1 flex justify-center bg-[#1E7773] text-white w-full rounded-md"
                >
                  CART
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;
