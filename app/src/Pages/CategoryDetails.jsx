// import React, { useEffect, useState } from "react";
// import CustomHeroSection from "../components/CustomHeroSection";
// import PriceRange from "../components/Shop/PriceRange";
// import { Assets_Url, Image_Not_Found, Image_Url } from "../const";
// import { BiFilterAlt } from "react-icons/bi";
// import { RiFilter3Line } from "react-icons/ri";
// import PriceRangeMob from "../components/Shop/PriceRangeMob";
// import { Link } from "react-router-dom";
// import axios from "../Utils/axios";
// import { Loader } from "../components/Loader";
// import { useParams, useLocation } from "react-router-dom";
// import { useCart } from "../Context/CartContext";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toastify
// import { CartModal } from "../components/cart/CartModal";
// import { MdOutlineCancel } from "react-icons/md";
// import { FiX } from "react-icons/fi";
// import CustomSeo from "../components/CustomSeo";
// import DecodeTextEditor from "../components/DecodeTextEditor";
// import CustomDetailSeo from "../components/CustomDetailSeo";
// function CategoryDetail() {
//     const [expanded, setExpanded] = useState(false);
//     const { category } = useParams(); // Get category from URL
//     // const location = useLocation();
//     // const category = location.state; // Get category from URL
//     const searchParams = new URLSearchParams(location.search);
//     const searchTermFromURL = searchParams.get("q"); // Get search term from URL
//     const [grid, setGrid] = useState(3); // Default grid columns
//     const [loading, setLoading] = useState(false);
//     const [visibleProducts, setVisibleProducts] = useState(12);
//     const [filteredProduct, setFilteredProduct] = useState([]);
//     const [categoryDetail, setCategoryDetail] = useState([]);
//     const [Category, setCategory] = useState([]);
//     const [categorySeo, setCategorySeo] = useState([]);
//     const [isExpanded, setIsExpanded] = useState(false);
//     const [searchTerm, setSearchTerm] = useState(searchTermFromURL || ""); // Use search term from URL or empty string
//     const [filter, setFilter] = useState({
//         price_from: 0, // Default min price
//         price_to: 0, // Default max price
//         sort_by: 1, // Default sorting (A to Z)
//         category_Id: category || undefined, // Set to undefined if category is not available
//     });
//     const [isFilter, setIsFilter] = useState(false); // Mobile filter toggle
//     const { addToCart } = useCart();
//     const [disabledButtons, setDisabledButtons] = useState({});
//     const [isCartModalOpen, setIsCartModalOpen] = useState(false);

//     console.log('dsa',category)

//     useEffect(() => {
//         window.scrollTo(0, 450);
//         console.log('aaa category', category);
//     }, [category]);

//     // Handle screen resize and update grid columns based on width
//     const handleResize = () => {
//         const screenWidth = window.innerWidth;
//         if (screenWidth < 400) {
//             setGrid(1); // 1 column on very small screens
//         } else if (screenWidth < 768) {
//             setGrid(2); // 2 columns on tablets
//         } else if (screenWidth < 1024) {
//             setGrid(3); // 3 columns on medium screens
//         } else {
//             setGrid(3); // 4 columns on large screens
//         }
//     };

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             // console.log('Fetching data with params:', {
//             //     price_from: filter.price_from,
//             //     price_to: filter.price_to,
//             //     sort_by: filter.sort_by,
//             //     category_id: category,
//             //     search: searchTerm,
//             // });

//             const response = await axios.public.get("search/product", {
//                 params: {
//                     price_from: filter.price_from,
//                     price_to: filter.price_to,
//                     sort_by: filter.sort_by,
//                     category_id: category,
//                     name: searchTerm,
//                 },
//             });

//             console.log("response");
//             // console.log('API categorySeoDetail:', response.data.data[0].category);
//             setCategoryDetail(response.data?.data);
//             setCategory(response.data?.category);

//             console.log("Category ???? ", response.data);

//             setCategorySeo(response.data?.category?.category_seo_metadata);
//             setFilteredProduct([]);
//             // Update filtered products
//             setFilteredProduct(response.data.data);
//             //  console.log('filteredProduct', filteredProduct);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // useEffect(() => {
//     //     console.log("Category data", Category);
//     // }, [Category]);

//     // Update searchTerm when the URL changes
//     useEffect(() => {
//         setSearchTerm(searchTermFromURL || ""); // Update state with new search term
//     }, [location.search]); // Listen for changes in the URL's search parameters

//     // Update filter based on category changes
//     useEffect(() => {
//         setFilter((prev) => ({
//             ...prev,
//             category_Id: category || undefined,
//         }));
//     }, [category]); // Update filter when category changes

//     // Fetch data when filter or searchTerm changes
//     useEffect(() => {
//         if (
//             searchTerm ||
//             filter.price_from > 0 ||
//             filter.price_to > 0 ||
//             filter.category_Id
//         ) {
//             const delayDebounceFn = setTimeout(() => {
//                 fetchData();
//             }, 300); // 300ms debounce delay

//             return () => clearTimeout(delayDebounceFn); // Cleanup the timeout on component unmount
//         }
//     }, [filter, searchTerm]); // Ensure effect runs when these change

//     // Fetch data when the component mounts and when the category or search term changes
//     useEffect(() => {
//         fetchData();
//     }, [category, searchTerm]); // Ensure effect runs on category and search term change

//     // Set grid columns on initial load and handle window resize
//     useEffect(() => {
//         handleResize();
//         window.addEventListener("resize", handleResize);

//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);

//     // Handle filter updates
//     const handleFilter = (filters) => {
//         setFilter({
//             ...filter,
//             price_from: filters.price_from || filter.price_from,
//             price_to: filters.price_to || filter.price_to,
//             sort_by: filters.selected || filter.sort_by,
//             category_Id: category,
//         });
//     };

//     // Handle search term updates
//     const handleSearch = (term) => {
//         setSearchTerm(term);
//     };

//     // Load more products
//     const handleLoadMore = () => {
//         setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 12); // Show 12 more products each time
//     };

//     // const handleAddCart = (product) => {
//     //     const product_id = product.id;
//     //     const product_name = product.name;
//     //     const pack_size =  product.product_variants[0].pack_size;
//     //     const product_quantity = 1;
//     //     const total_pieces = pack_size * 1;
//     //     const product_sub_total = product.product_variants[0].price_per_peice;
//     //     const product_total = (Number(product.product_variants[0].price_per_peice) * Number(total_pieces)).toFixed();
//     //     const product_img = product.image_path;
//     //     const product_variants = product.product_variants;

//     //     // Add the product to the cart
//     //     addToCart(product_id, product_name, product_quantity, pack_size, total_pieces, product_sub_total, product_img, product_total, product_variants);

//     //     // Show success toast
//     //     toast.success(`${product.name} added to cart`);

//     //     setDisabledButtons((prev) => ({ ...prev, [product_id]: true }));
//     //     setTimeout(() => {
//     //         setDisabledButtons((prev) => ({ ...prev, [product_id]: false }));
//     //     }, 5000);
//     // };
//     const handleAddCart = (product) => {
//         // console.log(product);

//         const product_id = product.id;
//         const product_name = product.name;

//         // Convert to number
//         const pack_size = Number(product.product_variants[0].pack_size);
//         const product_quantity = 1;
//         const total_pieces = pack_size; // total_pieces is the same as pack_size

//         // Convert to number
//         const price_per_piece = Number(
//             product.product_variants[0].price_per_piece,
//         );

//         // Calculate total
//         const product_total = (price_per_piece * total_pieces).toFixed(2); // Format to 2 decimal places

//         const product_img = product.product_image[0].image;
//         const product_variants = product.product_variants;

//         // Add the product to the cart
//         addToCart(
//             product_id,
//             product_name,
//             product_quantity,
//             pack_size,
//             total_pieces,
//             price_per_piece,
//             product_img,
//             product_total,
//             product_variants,
//         );
//         // Show cart modal for 2 seconds
//         setIsCartModalOpen(true);
//         // setTimeout(() => {
//         //     setIsCartModalOpen(false);
//         // }, 5000); // 2 seconds
//         // Show success toast
//         // toast.success(`${product.name} added to cart`);
//     };

//     console.log("Category ??? Category", Category);

//     return (
//         <div className="py-24 ">
//             <CustomDetailSeo
//                 title={categorySeo?.meta_title}
//                 des={categorySeo?.meta_description}
//                 focuskey={categorySeo?.focus_keyword}
//                 canonicalUrl={categorySeo?.canonical_url}
//                 schema={categorySeo?.schema}
//             />
//             <ToastContainer autoClose={500} />
//             <CustomHeroSection
//                 heading={
//                     Category
//                         ? `${Category?.name}`
//                         : "Discover Our Product Range"
//                 }
//                 heroImage={Category ? Category?.hero_banner_image : ""}
//                 path="Shop"
//                 path2={Category ? `${Category?.name}` : "Category Name"}
                
//             />
//             <div className="md:py-20 py-10 lg:px-10 px-0 flex">
//                 <section className="hidden lg:flex flex-col p-5 text-white hscreen lg:w-1/5">
//                     <PriceRange
//                         onFilter={handleFilter}
//                         isCategoryShown={false}
//                     />
//                 </section>
//                 <div className="">
//                     <PriceRangeMob
//                         onFilter={handleFilter}
//                         isFilter={isFilter}
//                         setIsFilter={setIsFilter}
//                         isCategoryShown={false}
//                     />
//                 </div>
//                 <section className={`{flex p-5 hscreen lg:w-4/5 w-full `}>
//                     <div className="py-4 w-full flex flex-col gap2 text-white rounded-lg">
//                         <div className="flex justify-between">
//                             <h2 className="text-4xl font-bazaar">
//                                 {Category ? `${Category?.name}` : "Shop All"}
//                             </h2>
//                             <div className="">
//                                 <button onClick={() => setIsFilter(true)}>
//                                     <RiFilter3Line className="lg:hidden block text-4xl rounded-full p-2 bg-[#1E7773]" />
//                                 </button>
//                                 <div className="hidden lg:flex justify-between gap-3 items-center">
//                                     <h2 className="text-lg font-bazaar">
//                                         View
//                                     </h2>
//                                     <img
//                                         onClick={() => setGrid(4)}
//                                         className="cursor-pointer w-8"
//                                         src={`${Image_Url}${grid === 4 ? "ShopAssets/4greenGridImg.svg" : "ShopAssets/4gridImg.svg"}`}
//                                         alt=""
//                                     />
//                                     <img
//                                         onClick={() => setGrid(3)}
//                                         className="cursor-pointer w-6"
//                                         src={`${Image_Url}${grid === 3 ? "ShopAssets/3greenGridImg.svg" : "ShopAssets/3gridImg.svg"}`}
//                                         alt=""
//                                     />
//                                     <img
//                                         onClick={() => setGrid(2)}
//                                         className="cursor-pointer w-4"
//                                         src={`${Image_Url}${grid === 2 ? "ShopAssets/2greenGridImg.svg" : "ShopAssets/2gridImg.svg"}`}
//                                         alt=""
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         {/* Show loader while loading */}
//                         {loading ? (
//                             <div className="flex justify-center py-10">
//                                 <Loader />
//                             </div>
//                         ) : filteredProduct.length === 0 ? (
//                             <div className="flex justify-center h-screen items-center py-10">
//                                 <h2 className="text-4xl font-bazaar">
//                                     No products found
//                                 </h2>
//                             </div>
//                         ) : (
//                             <>
//                                 <div
//                                     className={`py-10 grid ${grid === 4 ? "grid-cols-4" : grid === 3 ? "grid-cols-3" : grid === 2 ? "grid-cols-2" : "grid-cols-1"} gap-4 justify-center w-full`}
//                                 >
//                                     {filteredProduct
//                                         .slice(0, visibleProducts)
//                                         .map((product, index) => (
//                                             <div
//                                                 key={index}
//                                                 className={`flex ${grid === 2 && index % 2 === 0 ? "justify-end" : "justify-start"}`}
//                                             >
//                                                 <div
//                                                     className={`w-${grid === 2 ? "fit w-82 h-full" : "full"} xl:p-4 h76 p-2 flex flex-col border border-[#1E7773] bg-gradient-to-l from-[#403E4A] to-[#32303E] rounded-2xl  group`}
//                                                 >
//                                                     {/* <div className="flex flex-col pb-3 items-center">
//                                                     <img className='w-full h-full rounded-lg' src={product.image_path ? `${Assets_Url}${product.image_path}` : `${Image_Url}defaultImage.svg`}
//                                                         alt={product.name || 'Product Image'} />
//                                                 </div> */}
//                                                     <Link
//                                                         to={`/product/${product.slug}`}
//                                                         className="relative p-5 flex flex-col justify-center items-center"
//                                                     >
//                                                         <img
//                                                             className=" w-full h-full block group-hover:hidden rounded-xl object-cover"
//                                                             src={
//                                                                 product.product_image
//                                                                     ? `${Assets_Url}${product.product_image[0]?.image}`
//                                                                     : `${Image_Url}defaultImage.svg`
//                                                             }
//                                                             alt={
//                                                                 product.name ||
//                                                                 "Product Image"
//                                                             }
//                                                             style={{
//                                                                 transition:
//                                                                     "opacity 0.5s ease 0.3s",
//                                                             }}
//                                                             loading="lazy"
//                                                         />
//                                                         <img
//                                                             className=" w-full h-full hidden group-hover:block rounded-xl object-cover"
//                                                             src={
//                                                                 product.product_image
//                                                                     ? `${Assets_Url}${product.product_image[1]?.image}`
//                                                                     : `${Image_Url}defaultImage.svg`
//                                                             }
//                                                             alt={
//                                                                 product.name ||
//                                                                 "Product Image"
//                                                             }
//                                                             style={{
//                                                                 transition:
//                                                                     "opacity 0.5s ease 0.3s",
//                                                             }}
//                                                             loading="lazy"
//                                                         />
//                                                     </Link>
//                                                     <h4 className="font-semibold xl:text-lg">{`${product.name}`}</h4>
//                                                     {/* <p className='fontbazaar xl:text-md text-sm my-3'>
//                                                     Rs {product.current_sale_price ? Number(product.current_sale_price).toFixed() : '0'}
//                                                 </p> */}
//                                                     <p className="text-md py-3 font-semibold">
//                                                         {product.product_variants &&
//                                                         product.product_variants
//                                                             .length > 0 ? (
//                                                             <>
//                                                                 Rs{" "}
//                                                                 {
//                                                                     product
//                                                                         .product_variants[0]
//                                                                         .price
//                                                                 }{" "}
//                                                                 - Rs{" "}
//                                                                 {
//                                                                     product
//                                                                         .product_variants[
//                                                                         product
//                                                                             .product_variants
//                                                                             .length -
//                                                                             1
//                                                                     ].price
//                                                                 }
//                                                                 {/* ₨ {quantity && selectedVariantPrice && (quantity * subQuantity * selectedVariantPrice)} */}
//                                                             </>
//                                                         ) : (
//                                                             <span>
//                                                                 No variants
//                                                                 available
//                                                             </span>
//                                                         )}
//                                                     </p>
//                                                     <div className="flex xl:flex-row lg:flex-col justify-center xl:gap-4 gap-1">
//                                                         <button
//                                                             className={`p-2 bg-[#1E7773] w-full  font-bazaar  rounded-lg`}
//                                                             onClick={() =>
//                                                                 handleAddCart(
//                                                                     product,
//                                                                 )
//                                                             }
//                                                             disabled={
//                                                                 loading ||
//                                                                 disabledButtons[
//                                                                     product.id
//                                                                 ]
//                                                             }
//                                                         >
//                                                             ADD TO CART
//                                                         </button>
//                                                         <Link
//                                                             className={`p-2 border border-[#1E7773] text-center w-full h-fit  font-bazaar rounded-lg`}
//                                                             to={`/product/${product.slug}`}
//                                                         >
//                                                             BUY NOW
//                                                         </Link>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                 </div>

//                                 {filteredProduct.length > 12 &&
//                                 visibleProducts < filteredProduct.length ? (
//                                     <div className="flex justify-center">
//                                         <button
//                                             className="p-2 px-4 bg-[#1E7773] w-fit lg:text-md pt-3 text-md font-bazaar rounded-lg"
//                                             onClick={handleLoadMore}
//                                         >
//                                             LOAD MORE
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     <div className="flex justify-center">
//                                         <p>No More Products</p>
//                                     </div>
//                                 )}
//                             </>
//                         )}
//                     </div>
//                 </section>
//                 {isCartModalOpen && (
//                     <div
//                         className="fixed inset-0 flex items-center justify-center z-50"
//                         onClick={() => setIsCartModalOpen(false)}
//                     >
//                         <div className="fixed md:top-4 md:right-4 bg-white shadow-lg p-4 rounded-lg z-50 w-[300px] transition-transform duration-500">
//                             <div className="flex justify-between">
//                                 <h4 className="text-md font-bold">
//                                     Added to Cart
//                                 </h4>
//                                 <FiX
//                                     size={24}
//                                     onClick={() => setIsCartModalOpen(false)}
//                                 />
//                             </div>
//                             <CartModal />
//                             <div className="flex flex-row gap-2 mt-2">
//                                 <Link
//                                     to="/shop/"
//                                     className="p-1 flex justify-center items-center pt-2 border text-[#1E7773] border-[#1E7773] w-full lg:text-[15px] font-bazaar text-xs rounded-md"
//                                 >
//                                     CONTINUE
//                                 </Link>
//                                 <Link
//                                     to="/cart/"
//                                     className="p-1 flex justify-center items-center pt-2 bg-[#1E7773] w-full lg:text-[15px] font-bazaar text-xs rounded-md"
//                                 >
//                                     CART
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//             {Category && (
//                 <div className="flex flex-wrap justify-start gap-4 w-full p-5 items-start  md:px-24">
//                     <div>
//                         <img
//                             src={
//                                 Category?.image
//                                     ? `${Assets_Url}${Category.image}`
//                                     : ""
//                             }
//                             alt={Category?.name || "Category Image"}
//                             className="w-96 h-96 object-contain rounded-lg"
//                             onError={(e) => {
//                                 e.currentTarget.src = Image_Not_Found; // Path to your dummy image
//                             }}
//                         />
//                     </div>
//                     {/* <div className="mt-6 w-full md:w-1/2">
//                         <h2 className="text-3xl text-white font-semibold font-poppins">{categoryDetail?.name || "Category Name"}</h2>
//                         <p
//                             className="md:text-base  h-60 overflow-y-auto text-xs text-white leading-6 mt-6"
//                         >
//                             <p>
//                                 {isExpanded ? categoryDetail.note
//                                     : categoryDetail.note?.substring(0, 1000)
//                                 }
//                             </p>
//                         </p>
//                         {categoryDetail.note?.length > 1000 && (
//                             <p
//                                 onClick={() => setIsExpanded(!isExpanded)}
//                                 className="text-gray-200 mt-2 underline cursor-pointer text[3px]"
//                             >
//                                 {isExpanded ? "Read Less" : "Read More"}
//                             </p>
//                         )}
//                     </div> */}

//                     <div className="mt-6 w-full md:w-1/2">
//                         <h2 className="text-5xl text-white font-semibold font-poppins">
//                             {Category?.name || "Category Name"}
//                         </h2>
//                         {/* < body={blog?.body} /> */}
//                         <p
//                             className={`md:text-base text-xs text-white leading-6 mt-6 transition-all duration-300 ${
//                                 expanded
//                                     ? "max-h-full overflow-visible"
//                                     : "max-h-24 overflow-hidden"
//                             }`}
//                         >
//                             <DecodeTextEditor body={Category.note} />
//                         </p>

//                         <button
//                             onClick={() => setExpanded(!expanded)}
//                             className="mt-2 text-white hover:text-[#8E2C62] text-sm font-bold transition-colors py-2 px-4 bg-green-500 border border-green-600 rounded-md"
//                         >
//                             {expanded ? "Read Less" : "Read More"}
//                         </button>

//                         {/* {categoryDetail.note?.length > 1000 && (
//                             <p
//                                 onClick={() => setIsExpanded(!isExpanded)}
//                                 className="text-gray-500 mt-2 underline cursor-pointer text[3px]"
//                             >
//                                 {isExpanded ? "Read Less" : "Read More"}
//                             </p>
//                         )} */}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default CategoryDetail;
