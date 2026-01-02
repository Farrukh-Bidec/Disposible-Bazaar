"use client";

import React, { useEffect, useState } from "react";
import CustomHeroSection from "../../src/components/CustomHeroSection";
import PriceRange from "../../src/components/Shop/PriceRange";
import PriceRangeMob from "../../src/components/Shop/PriceRangeMob";
import { Assets_Url, Image_Not_Found, Image_Url } from "../../src/const";
import { RiFilter3Line } from "react-icons/ri";
import { useSearchParams, useRouter, usePathname, useParams } from "next/navigation";
import axios from "../../src/Utils/axios";
import { Loader } from "../../src/components/Loader";
import { useCart } from "../../src/Context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartModal from "../../src/components/cart/CartModal";
import { FiX } from "react-icons/fi";
import CustomDetailSeo from "../../src/components/CustomDetailSeo";
import Link from "next/link";
import DecodeTextEditor from "../../src/components/DecodeTextEditor";

const CustomizationCategory = ({ params }) => {
  const router = useRouter();
  const queryParams = useSearchParams();
  const { slug } = useParams();
  const category = slug || "";
  const categoryIdFromURL = queryParams.get("id");
  const searchTermFromURL = queryParams.get("q") || "";

  // -----------------------------
  // YOUR NEW STATES FOR POPUP
  // -----------------------------
  const [showQtyModal, setShowQtyModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  // -----------------------------

  const [grid, setGrid] = useState(3);
  const [loading, setLoading] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState([]);
  const [Category, setCategory] = useState([]);
  const [categorySeo, setCategorySeo] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL);
  const { addToCart } = useCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState({});

  const [filter, setFilter] = useState({
    price_from: 0,
    price_to: 0,
    sort_by: 1,
    slug: category,
  });

  console.log("category slug", category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.public.get("product/category");
        const categoryData = response.data.data;
        setCategories(categoryData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // scroll on slug change
  useEffect(() => {
    window.scrollTo(0, 400);
  }, [category]);

  // responsive grid
  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 400) setGrid(1);
    else if (width < 768) setGrid(2);
    else setGrid(3);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch data API
  const fetchData = async () => {
    setLoading(true);
    try {
      const cat = categories.find((c) => c.slug === category || (categoryIdFromURL && c.id == categoryIdFromURL));

      if (!cat) {
        setFilteredProduct([]);
        setLoading(false);
        return;
      }

      const response = await axios.public.get("search/product", {
        params: {
          price_from: filter.price_from,
          price_to: filter.price_to,
          sort_by: filter.sort_by,
          category_id: cat.id,
          name: searchTerm,
        },
      });

      setCategoryDetail(response.data?.data);
      setCategory(response.data?.category);
      setCategorySeo(response.data?.category?.category_seo_metadata);
      setFilteredProduct(response.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSearchTerm(searchTermFromURL || "");
  }, [searchTermFromURL]);

  useEffect(() => {
    setFilter((prev) => ({ ...prev, slug: category }));
  }, [category]);

  useEffect(() => {
    const d = setTimeout(fetchData, 300);
    return () => clearTimeout(d);
  }, [filter, searchTerm, categories]);

  const handleFilter = (filters) => {
    setFilter({
      ...filter,
      price_from: filters.price_from || 0,
      price_to: filters.price_to || 0,
      sort_by: filters.selected || 1,
      slug: category,
    });
  };

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 12);
  };

  // --------------------------------------------------
  // UPDATED: Add to cart now opens quantity popup
  // --------------------------------------------------
  const handleAddCart = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setShowQtyModal(true);
  };

  // --------------------------------------------------
  // CONFIRM ADD — real add to cart here
  // --------------------------------------------------
  const confirmAddToCart = () => {
    if (!selectedProduct) return;

    const variant = selectedProduct.product_variants?.[0];
    if (!variant) return;

    addToCart(
      selectedProduct.id,
      selectedProduct.name,
      quantity,
      Number(variant.pack_size),
      Number(variant.pack_size),
      Number(variant.price_per_piece),
      selectedProduct.product_image?.[0]?.image,
      (variant.price_per_piece * variant.pack_size * quantity).toFixed(2),
      selectedProduct.product_variants
    );

    setShowQtyModal(false);
    setIsCartModalOpen(true);
  };
  return (
    <div className="py-2">
      <CustomDetailSeo
        title={categorySeo?.meta_title}
        des={categorySeo?.meta_description}
        focuskey={categorySeo?.focus_keyword}
        canonicalUrl={categorySeo?.canonical_url}
        schema={categorySeo?.schema}
      />

      <ToastContainer autoClose={500} />

      <CustomHeroSection
        heading={Category?.name || "Discover Our Product Range"}
        heroImage={Category?.hero_banner_image || Category?.image || ""}
        path="Shop"
        path2={Category?.name || "Category Name"}
      />

      <div className="lg:px-10 px-0 flex">
        {/* Left Filters */}
        <section className="hidden lg:block lg:w-1/5 p-5 text-white">
          <PriceRange onFilter={handleFilter} isCategoryShown={false} />
        </section>

        {/* Mobile Filters */}
        <PriceRangeMob
          onFilter={handleFilter}
          isFilter={isFilter}
          setIsFilter={setIsFilter}
          isCategoryShown={false}
        />

        {/* Main Content */}
        <section className="flex p-5 lg:w-4/5 w-full">
          <div className="w-full flex flex-col gap-2 text-white">

            <div className="flex justify-between">
              <h2 className="text-4xl font-bazaar">{Category?.name || ""}</h2>
              <button onClick={() => setIsFilter(true)}>
                <RiFilter3Line className="lg:hidden text-4xl p-2 bg-[#1E7773] rounded-full" />
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <Loader />
              </div>
            ) : filteredProduct.length === 0 ? (
              <div className="flex justify-center h-screen items-center">
                <h2 className="text-4xl font-bazaar">No product found</h2>
              </div>
            ) : (
              <>
                <div
                  className={`py-10 grid ${grid === 4
                    ? "grid-cols-4"
                    : grid === 3
                      ? "grid-cols-3"
                      : grid === 2
                        ? "grid-cols-2"
                        : "grid-cols-1"
                    } gap-4`}
                >
                  {filteredProduct.slice(0, visibleProducts).map((product, index) => (
                    <div key={index} className="w-full">
                      <div className="p-2 bg-gradient-to-l from-[#403E4A] to-[#32303E] rounded-2xl border border-[#1E7773] group">

                        <Link href={`/product/${product.slug}`} className="block p-5">
                          <img
                            className="w-full h-full rounded-xl group-hover:hidden object-cover"
                            src={
                              product.product_image?.[0]?.image
                                ? `${Assets_Url}${product.product_image[0].image}`
                                : Image_Not_Found
                            }
                          />
                          <img
                            className="w-full h-full hidden group-hover:block rounded-xl object-cover"
                            src={
                              product.product_image?.[1]?.image
                                ? `${Assets_Url}${product.product_image[1].image}`
                                : Image_Not_Found
                            }
                          />
                        </Link>

                        <h4 className="font-semibold xl:text-lg">{product.name}</h4>

                        <div className="text-md py-3 font-semibold">
                          {product.product_variants?.length > 0
                            ? `Rs ${product.product_variants[0].price} - Rs ${product.product_variants[product.product_variants.length - 1].price
                            }`
                            : "No variants available"}
                        </div>

                        <div className="flex xl:flex-row lg:flex-col justify-center xl:gap-4 gap-1">
                          <button
                            className="p-2 bg-[#1E7773] w-full font-bazaar 
cursor-pointer rounded-lg"
                            onClick={() => handleAddCart(product)}
                            disabled={loading || disabledButtons[product.id]}
                          >
                            ADD TO CART
                          </button>

                          <Link
                            className="p-2 border border-[#1E7773] text-center w-full h-fit font-bazaar rounded-lg"
                            href={`/product/${product.slug}`}
                          >
                            BUY NOW
                          </Link>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>

                {filteredProduct.length > visibleProducts ? (
                  <div className="flex justify-center">
                    <button
                      className="p-2 px-6 bg-[#1E7773] rounded-lg"
                      onClick={handleLoadMore}
                    >
                      LOAD MORE
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <div>No More Products</div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Cart Modal */}
        {isCartModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={() => setIsCartModalOpen(false)}
          >
            <div className="fixed md:top-4 md:right-4 bg-white shadow-lg p-4 rounded-lg z-50 w-[300px] transition-transform duration-500">
              <div className="flex justify-between">
                <h4 className="text-md font-bold text-black">Added to Cart</h4>
                <FiX size={24} className="text-black" onClick={() => setIsCartModalOpen(false)} />
              </div>

              <CartModal />

              <div className="flex gap-2 mt-3">
                <Link
                  href="/shop"
                  className="p-2 border border-[#1E7773] text-[#1E7773] rounded-md flex-1 text-center"
                >
                  CONTINUE
                </Link>
                <Link
                  href="/cart"
                  className="p-2 bg-[#1E7773] rounded-md flex-1 text-center"
                >
                  CART
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      {Category && (
        <div className="flex flex-wrap justify-start gap-4 w-full p-5 items-start  md:px-24">
          <div>
            <img
              src={
                Category?.image
                  ? `${Assets_Url}${Category.image}`
                  : null                   // 👈 FIX — empty string ki jagah null
              }
              alt={Category?.name || "Category Image"}
              className="w-96 h-96 object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src = Image_Not_Found;
              }}
            />
          </div>




          <div className="mt-25 w-full md:w-1/2">
            <h2 className="text-5xl text-white font-semibold font-poppins">
              {Category?.name || "Category Name"}
            </h2>
            {/* < body={blog?.body} /> */}
            <div
              className={`text-white mt-6 transition-all duration-300 ${expanded ? "max-h-full overflow-visible" : "max-h-23 overflow-hidden"
                }`}
            >
              <DecodeTextEditor body={Category.note} />
            </div>


            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-white hover:text-[#8E2C62] cursor-pointer text-sm font-bold transition-colors py-2 px-4 bg-green-500 border border-green-600 rounded-md"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>


          </div>
        </div>
      )}

      {/* =======================
    QUANTITY POPUP MODAL  
======================= */}
      {showQtyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Select Quantity
            </h3>

            <div className="flex items-center justify-center   space-x-6 mb-6">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer text-gray-800 text-2xl font-bold flex items-center justify-center hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="text-xl text-gray-900 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer text-gray-800 text-2xl font-bold flex items-center justify-center hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
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



    </div>

  );
}
export default CustomizationCategory;