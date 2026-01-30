"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Assets_Url, Image_Url } from '../../src/const';
import axios from '../../src/Utils/axios';
// import './Pages.css';
import { FaAngleDown, FaCircle, FaWhatsapp } from 'react-icons/fa';
import RcmdProduct from '../../src/components/Shop/RcmdProduct';
import Deals from '../../src/components/Home/Deals';
import Review from '../../src/components/Reviews/Review';
import { PiCaretDownThin, PiCaretUpThin } from 'react-icons/pi';
import { TbCameraPlus } from 'react-icons/tb';
import { BiSolidImageAdd } from 'react-icons/bi';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '../../src/Context/UserContext';
// import { useCart } from '../../src/Context/CartContext';
import { useWishlist } from '../../src/Context/WishlistContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiX } from 'react-icons/fi';
import  CartModal  from '../../src/components/cart/CartModal';
import CustomDetailSeo from '../../src/components/CustomDetailSeo';
import { useCart } from '../../src/Context/CartContext';

export default function CustomDetails() {
  const [productDetail, setProductDetail] = useState([]);
  const [recomendedProducts, setRecomendedProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [productVariants, setProductVariants] = useState([]);
  const [productPackageOptions, setProductPackageOptions] = useState([]);
  const [productLid, setProductLid] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [subQuantity, setSubQuantity] = useState(1);
  const [productTextDetail, setProductTextDetail] = useState('Description');
  const [piecesDropdown, setPiecesDropdown] = useState(false);
  const [lidsDropdown, setLidsDropdown] = useState(false);
  const [optionsDropdown, setOptionsDropdown] = useState(false);
  const [selectedPackSize, setSelectedPackSize] = useState('');
  const [selectedPackPrice, setSelectedPackPrice] = useState();
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedLid, setSelectedLid] = useState('');
  const [selectedProductVariants, setSelectedProductVariants] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState();
  const [selectedBrandId, setSelectedBrandId] = useState();
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [selectedLidPrice, setSelectedLidPrice] = useState();
  const [selectedLidId, setSelectedLidId] = useState(null);
  const [sizeDropdown, setSizeDropdown] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [colors, setColors] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedOptionPrice, setSelectedOptionPrice] = useState();
  const [designText, setDesignText] = useState('Add Your Design');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [customizeDetail, setCustomizeDetail] = useState('');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

    const dropdownRef = useRef(null);

  const { addToWishlist } = useWishlist(); 
  const { addToCart } = useCart();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const whatsappNumber = "+923213850002";
  const productUrl = typeof window !== 'undefined' ? window.location.href : '';
  const inquiryMessage = encodeURIComponent(
    `Hello! I am interested in the following product:\n\n${productDetail.product?.name}\n\n ${productUrl}`
  );

  // Extract slug from pathname
  const pathParts = (pathname || '').split('/customization/');
  const id = pathParts.length > 1 ? pathParts[1].replace(/\/$/, '/') : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.public.post(`product/customize/s/details`, { slug: id });
        const resData = response.data.data;
        setProductDetail(resData);
        setProductImages(resData?.product.product_image);
        setProductOptions(resData.product.product_options);
        setProductPackageOptions(resData.product.packaging_options);
        setSelectedOption(resData.product.packaging_options[0]);
        setBrands(resData.product.product_brands.filter(i => i.status === 1));
        setSelectedBrands(resData.product.product_brands.filter(i => i.status === 1)[0]?.name);
        setSelectedBrandId(resData.product.product_brands.filter(i => i.status === 1)[0]?.id);
        setProductVariants(resData.product.product_variants);
        const seletedBrandId = resData.product.product_brands.filter(i => i.status === 1)[0]?.id;
        if (resData.product.product_variants.filter(i => i.brand_id === seletedBrandId)) {
          setSelectedProductVariants(resData.product.product_variants.filter(i => i.brand_id === seletedBrandId));
        }
        setSelectedPackSize(resData.product.product_variants[0].pack_size);
        setSelectedPackPrice(resData.product.product_variants[0].price_per_piece);
        setProductLid(resData.product?.product_lid_options);
        setRecomendedProducts(resData.recommended_products);
        setSelectedImage(resData?.product.product_image[0].image || '');
      } catch (error) {
        console.log(error);
      }
    };
    if (id) fetchData();
  }, [id]);

  const handleSubmit = (e) => e.preventDefault();
  const handleImageClick = (image) => setSelectedImage(image);

  const handleWishlist = async (id) => {
    if (!user) {
      router.push('/login/');
      return;
    }
    console.log("id",id);
    try {
      const wishlistResponse = await axios.protected.get(`/user/wishlist/${id}/check`);
      if (wishlistResponse.data.exists) {
        toast.error('Product already added to wishlist');
      } else {
        const response = await axios.protected.post(`/user/wishlist/${id}/add`);
        if (response.status === 200) {
          addToWishlist();
          toast.success('Product added to wishlist');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while adding to wishlist');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedExtensions = ["pdf", "ai", "cdr", "psd"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      toast.error("Only PDF, AI, CDR, or PSD files are allowed.");
      e.target.value = "";
      return;
    }
    if (file) {
      setUploadedFile(file);
      setDesignText('Design uploaded!');
    }
  };

  const convertFileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  // Add to cart logic (same as before, unchanged)
   const handleAddCart = async (product) => {
  
          if(!selectedOption){
              toast.error(`Select a packaging option`);
          }
          const product_id = product.id;
          const product_name = product.name;
          const pack_size = selectedPackSize || 1; // Ensure pack size is at least 1
          const product_quantity = subQuantity || 1; // Ensure subQuantity is at least 1
          const total_pieces = Number(pack_size) * Number(product_quantity);
  
          // Ensure selectedPackPrice and selectedOptionPrice are valid numbers
          const price_per_piece = Number(selectedPackPrice ? selectedPackPrice : 0);
  
          // Calculate product total with valid numbers
          const baseTotal  = (Number(total_pieces) * (Number(price_per_piece) + Number(selectedOptionPrice ? selectedOptionPrice : 0) + Number(selectedOption ? selectedOption?.price : 0) + Number(selectedLidPrice ? selectedLidPrice : 0))).toFixed(2);
   // Apply discount if available
   let finalTotal = parseFloat(baseTotal);
   const discountPercentage = parseFloat(product?.activeDiscount?.discount_percentage);
   if (!isNaN(discountPercentage) && discountPercentage > 0) {
     finalTotal = baseTotal - (baseTotal * (discountPercentage / 100));
   }
  
   const product_total = finalTotal.toFixed(2);
  
          const product_img = product.image_path;
          const product_variants = selectedProductVariants;
          const product_options = productOptions;
          const product_color = selectedColor || null;
          const product_size = selectedSize || null;
          const product_lids = productLid ? productLid : null;
          const lid = selectedLidId ? selectedLidId : null;
          const lid_Price = selectedLidPrice ? selectedLidPrice : null;
          const custom_Note = customizeDetail ? customizeDetail : null;
          // const product_lids = productLids ? productLids : null;
          // const lid = selectedLidId ? selectedLidId : null;
          const option_Price = selectedOptionPrice ? selectedOptionPrice : 0;
          let logo = null;
          const order_limit = product?.order_limit !== null ? product?.order_limit : 1000;
          const packaging_options = selectedOption;
  console.log('order limit', order_limit)
          // If there's an uploaded file (logo), convert it to Base64
          if (uploadedFile) {
              try {
                  logo = await convertFileToBase64(uploadedFile); // Await the file conversion
              } catch (error) {
                  console.error('Error converting logo to Base64:', error);
              }
          }
          // if (selectedSize === '') {
          //     toast.error(`Select a size`);
          // } else if (selectedColor === '') {
          //     toast.error(`Select a Color`);
          // } else
           if (uploadedFile === null) {
              toast.error(`Select a file`);
          }
  
          // else if (customizeDetail === '') {
          //     toast.error(`Select a file`);
          // }
          else {
              // Add the product to the cart
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
                  product_color,
                  product_size,
                  logo, // You can store the logo file in the cart as needed
                  product_options,
                  product_lids,
                  lid,
                  lid_Price,
                  customizeDetail,
                  option_Price,
                  false,
  order_limit,
  packaging_options,
  
              );
              setSelectedSize('');
              setSelectedColor('');
              setUploadedFile('');
              setCustomizeDetail('');
              document.getElementById('upload-image').value = '';
              // Show success toast
              setIsCartModalOpen(true)
              // toast.success(`${product.name} added to cart`);
          }
  
      };

  const handleSelectedBrand = (data) => {
    setSelectedBrands(data.name);
    setSelectedBrandId(data.id);
    setSelectedProductVariants(productVariants.filter(i => i.brand_id === data.id));
    setSelectedPackSize(productVariants.filter(i => i.brand_id === data.id)[0].pack_size);
    setSelectedPackPrice(productVariants.filter(i => i.brand_id === data.id)[0].price_per_piece);
  };

  const handleCategoryLink = (item) => {
    console.log("item" , item);
    router.push(`/customization-category/${item.slug}`);
  };
  // Close dropdown if clicked outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setBrandsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative py-32 px-10 text-white overflow-hidden">
            <ToastContainer autoClose={500} />
            <CustomDetailSeo
                title={productDetail?.seoMetadata?.meta_title}
                des={productDetail?.seoMetadata?.meta_description}
                focuskey={productDetail?.seoMetadata?.focus_keyword}
                canonicalUrl={productDetail?.seoMetadata?.canonical_url}
                schema={productDetail?.seoMetadata?.schema}
                og_title={productDetail?.product?.name}
                og_des={productDetail?.product?.description}
                og_img={productDetail?.product?.product_image[0]?.image}
            />
            {/* Breadcrumb and Title */}
            <div className="flex flex-col py-5">
                <p><Link href='/'>Home</Link> / <Link href='/customization/'>Customization</Link> /  <span
                    onClick={() => handleCategoryLink(productDetail.product?.category)}
                    className="inline cursor-pointer  "
                >
                    {/* <Link to={`/product-category/${productDetail?.product?.category?.slug}`}> */}
                        {productDetail.product?.category?.name || "Category Name"}
                    {/* </Link> */}
                </span> / {productDetail.product?.subCategory?.name ? <> <Link to='/'> {productDetail.product?.subCategory.name || 'Category Name'} </Link> /</> : ""} {productDetail.product?.name || 'Product Name'}</p>
                {/* <h3 className="py-10 font-bazaar md:text-6xl text-5xl">INQUIRY FORM</h3> */}
            </div>
            <main className=''>
                <section className='flex lg:flex-row flex-col gap-8'>
                    {/* Thumbnail Section */}
                    <div className="lg:w-3/5 md:h-[34rem] h-[20rem] flex flex-row md:gap-5 gap-2">
                        <div className="w-1/5 flex flex-col gap-1">
                            {Array.isArray(productImages) && productImages.length === 0 ? (
                                // If productImages is an empty array, show the default image
                                <div className="w-full h-1/4 py-1">
                                    <img
                                        className="w-full h-full bg-[#32303e] rounded-xl border-2 border-[#1E7773] object-cover cursor-pointer"
                                        src={`${Image_Url}defaultImage.svg`} // Default image when no products
                                        alt="Default Product Image"
                                    />
                                </div>
                            ) : (
                                // If productImages is not empty, map over the images and display them
                                productImages.slice(0, 4).map((prod, index) => (
                                    <div key={index} className="w-full h-1/4 py-1">
                                        <img
                                            className="w-full h-full bg-[#32303e] rounded-xl border-2 border-[#1E7773] object-cover cursor-pointer"
                                            // If the prod.image array is empty, use the default image; otherwise, use the first image in the array
                                            src={`${Assets_Url}${prod.image}`}
                                            alt={prod?.image_alt || 'Product Image'}
                                            onClick={() => handleImageClick(prod.image)} // Set clicked image (first image in the array)
                                        />

                                    </div>
                                ))
                            )}
                        </div>
                        {/* Large Image Display */}
                        <div className="w-4/5 rounded-lg bgblack ">
                            {selectedImage && (
                                <img
                                    className="w-full h-full object-cover rounded-lg"
                                    src={`${Assets_Url}${selectedImage}`} // Show selected image
                                    alt={productImages[0]?.image_alt || 'Product Image'}
                                />
                            )}
                        </div>
                    </div>
                    <div className="lg:w-[55%] flex flex-col gap-5 text-white h[300px]">
                        <p className='text-sm text-gray-300'>{productDetail.product?.stock_status == 1 ? "In Stock" : "Out Of Stock"}</p>
                        <h1 className='md:text-5xl text-3xl font-semibold'>{productDetail.product?.name || 'Product Name'}</h1>
                        {/* <h3 className='md:text-xl text-md font-semibold'>
                            Brand : {productDetail.product?.brand_name || 'Brand Name'}
                        </h3> */}


                 <div className="relative w-fit" ref={dropdownRef}>
    <h3
        onClick={() => setBrandsOpen(!brandsOpen)}
        className="md:text-xl flex flex-row gap-4 cursor-pointer items-center text-md font-semibold border p-2 rounded-lg px-4"
    >
        Brand: {selectedBrands || "Brand Name"}
        <FaAngleDown
            className={`${brandsOpen ? "rotate-180" : ""} duration-300`}
        />
    </h3>

    {brandsOpen && (
        <div className="absolute top-14 left-0 py-2 overflow-auto rounded-lg z-10 w-75 h-32 bg-white shadow-md border">
            {brands.map((data) => (
                <div
                    key={data.id}
                    onClick={() => handleSelectedBrand(data)}
                    className="text-black px-4 py-2 text-md hover:bg-gray-200 cursor-pointer duration-100"
                >
                    {data.name}
                </div>
            ))}
        </div>
    )}
</div>







                       {/* <div onClick={() => setBrandsOpen(!brandsOpen)}       
                         className="md:text-xl flex flex-row gap-4 cursor-pointer items-center text-md font-semibold border p-2 rounded-lg px-4">
  Brand : {selectedBrands || 'Brand Name'}
  <FaAngleDown className={`${brandsOpen ? 'rotate-180' : ''} duration-300`} />
  {brandsOpen && (
    <div className="absolute top-12 left-0 py-2 overflow-auto rounded-lg z-10 w-full h-32 bg-white">
      {brands.map((data) => (
        <div
          key={data.id}
          onClick={() => handleSelectedBrand(data)}
          className="text-black px-4 py-1 text-md hover:bg-gray-200 duration-100"
        >
          {data.name}
        </div>
      ))}
    </div>
  )}
</div> */}

                        <div className='text-xl font-semibold'>
                            {selectedProductVariants && selectedProductVariants.length > 0 ? (
                                // <>
                                //     Rs {selectedProductVariants[0].price} - {selectedProductVariants[selectedProductVariants.length - 1].price}
                                //     {/* ₨ {quantity && selectedVariantPrice && (quantity * subQuantity * selectedVariantPrice)} */}
                                // </>
                                <div>
    Rs {selectedProductVariants[0].price}
    {selectedProductVariants.length > 1 &&
      ` - Rs ${selectedProductVariants[selectedProductVariants.length - 1].price}`}
  </div>
                            ) : (
                                <span>No variants available</span>
                            )}
                         <h3 className="text-center text-[13px] ">Printing Side</h3>
                        </div>
                        <form onSubmit={handleSubmit} className='w-3/4 flex flex-col gap-5'>
                            <div className="flex mdflex-row flex-wrap gap-3">
                                {productLid?.length > 0 && (
                                    <div className="relative">
                                        {/* Dropdown button for Lid */}
                                        <h3
                                            onClick={() => setLidsDropdown(!lidsDropdown)}
                                            className="flex flex-row justify-between items-center text-md gap-3 border p-2 rounded-md md:w-28 w-40 border-[#1E7773]">
                                            <p>{selectedLid ? selectedLid : 'Lids'} </p> {/* Show selected pack size or default text */}
                                            <p>{lidsDropdown ? <PiCaretUpThin /> : <PiCaretDownThin />}</p>
                                        </h3>

                                        {/* Dropdown options for Lid */}
                                        {lidsDropdown && (
                                            <div className="md:w-28 w-40 rounded-md my-2 h-32 absolute z-10 overflow-auto bg-white text-black">
                                               
                                                <div
                                                        key={123}
                                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                                        onClick={() => {
                                                            setSelectedLidId(null); // Set selected lid on click
                                                            setSelectedLidPrice(null);
                                                            setSelectedLid(null);
                                                            setSelectedImage(productDetail?.product?.product_image[0]?.image);
                                                            // console.log(selectedLidPrice);

                                                            setLidsDropdown(false); // Close dropdown after selection
                                                        }}>
                                                        No Lid  {/* Display the pack size option */}
                                                    </div>
                                                {productLid.map((lid) => (
                                                    <div
                                                        key={lid.id}
                                                        className="p-2 cursor-pointer hover:bg-gray-200"
                                                        onClick={() => {
                                                            setSelectedLidId(lid.id); // Set selected lid on click
                                                            setSelectedLidPrice(lid.price);
                                                            setSelectedLid(lid.name);
                                                            setSelectedImage(lid.image);
                                                            // console.log(selectedLidPrice);

                                                            setLidsDropdown(false); // Close dropdown after selection
                                                        }}>
                                                        {lid.name}  {/* Display the pack size option */}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                               
                                {/* <div className="relative">
                                    <h3 onClick={() => setPieces(!pieces)} className="flex flex-row justify-between items-center text-md gap-3 border p-2 rounded-md md:w-24 w-40 border-[#1E7773] "><p>Pieces</p><p>{pieces ? <PiCaretUpThin /> : <PiCaretDownThin />}</p></h3>
                                    {pieces && (
                                        <div className="md:w-24 w-40  rounded-md my-2 h-32 absolute z-10 overflow-auto bg-white">ssd</div>
                                    )}
                                </div> */}
                                <div className="relative">
                                    {/* Dropdown button for pack size */}
                                    <h3
                                        onClick={() => setPiecesDropdown(!piecesDropdown)}
                                        className="flex flex-row justify-between items-center text-md gap-3 border p-2 rounded-md md:w-24 w-40 border-[#1E7773]">
                                        <p>{selectedPackSize ? selectedPackSize : 'Pieces'} Pcs</p> {/* Show selected pack size or default text */}
                                        <p>{piecesDropdown ? <PiCaretUpThin /> : <PiCaretDownThin />}</p>
                                    </h3>

                                    {/* Dropdown options for pack sizes */}
                                    {piecesDropdown && (
                                        <div className="md:w-24 w-40 rounded-md my-2 h-32 absolute z-10 overflow-auto bg-white text-black">
                                            {productVariants.map((variant) => (
                                                <div
                                                    key={variant.id}
                                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                                    onClick={() => {
                                                        setSelectedPackSize(variant.pack_size); // Set selected pack size
                                                        setSelectedPackPrice(variant.price_per_piece)
                                                        console.log(selectedPackPrice);

                                                        setPiecesDropdown(false); // Close dropdown after selection
                                                    }}>
                                                    {variant.pack_size}  {/* Display the pack size option */}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                </div>
                                {/* <div className="relative">
                                    <h3 onClick={() => setSize(!size)} className="flex flex-row justify-between items-center text-md gap-3 border p-2 rounded-md md:w-24 w-40 border-[#1E7773] "><p>Size</p><p>{size ? <PiCaretUpThin /> : <PiCaretDownThin />}</p></h3>
                                    {size && (
                                        <div className="md:w-24 w-40  rounded-md my-2 h-32 absolute z-10 overflow-auto bg-white">ssd</div>
                                    )}
                                </div> */}


                                {/* <div className="relative">
                                    <h3 onClick={() => setColors(!colors)} className="flex flex-row justify-between items-center text-md gap-3 border p-2 rounded-md w-40 border-[#1E7773] "><p>Colors Option</p><p>{colors ? <PiCaretUpThin /> : <PiCaretDownThin />}</p></h3>
                                    {colors && (
                                        <div className="w-40  rounded-md my-2 h-32 absolute z-10 overflow-auto bg-white">ssd</div>
                                    )}
                                </div> */}
                                <div className="relative">
                                    {/* Dropdown button for pack size */}
                                    <h3
                                        onClick={() => setOptionsDropdown(!optionsDropdown)}
                                        className="flex flex-row uppercase justify-between items-center text-md gap-3 border p-2 rounded-md md:w-52 w-40 border-[#1E7773]">
                                        <p>{selectedOption ? `${selectedOption.side_option} - ${selectedOption.print_location}` : 'Packaging Option'}</p> {/* Show selected pack size or default text */}
                                        <p>{optionsDropdown ? <PiCaretUpThin /> : <PiCaretDownThin />}</p>
                                    </h3>

                                    {/* Dropdown options for pack sizes */}
                                    {optionsDropdown && (
                                        <div className="md:w-52 w-40 rounded-md my-2 h-32 absolute z-10 overflow-auto bg-white text-black">
                                            {productPackageOptions.map((variant) => (
                                                <div
                                                    key={variant.id}
                                                    className="p-2 cursor-pointer uppercase hover:bg-gray-200"
                                                    onClick={() => {
                                                        setSelectedOption(variant); // Set selected pack size
                                                        setSelectedOptionPrice(variant.price);
                                                        setOptionsDropdown(false); // Close dropdown after selection
                                                    }}>
                                                                        {variant.side_option
                                                                        + '-' + variant.print_location}  {/* Display the pack size option */}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>


                            </div>
                            <div
                                id="upload"
                                className="flex flex-col relative md:w-3/2 w[23.5rem] w-full h60 p-5 px-3 items-center justify-center border-2 border-dashed rounded-lg border-[#1E7773]"
                            >
                                <p className="font-bazaar flex flex-row gap-2 pt-1">
                                    <BiSolidImageAdd size={22} />
                                    {designText}
                                </p>
                                <input
                                    type="file"
                                    id="upload-image"
                                    name="thumbnail"
                                    accept=".pdf,.ai,.cdr,.psd"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileChange} // Trigger function when a file is selected
                                />
                                {/* Optionally display the file name */}
                                {uploadedFile && (
                                    <p className="text-sm text-gray-500 mt-2">File: {uploadedFile.name}</p>
                                )}
                            </div>
                            <div className="w-full md:md:w-3/2 w[23.5rem]">
                                <textarea className='w-full rounded-lg p-2 outline-none bg-transparent border border-[#1E7773] resize-none' rows={2} placeholder='Additional Customization' name="" id="" value={customizeDetail} onChange={(e) => setCustomizeDetail(e.target.value)}></textarea>
                            </div>
                            <div className='flex flex-row gap-3'>
                                <div className="border border-[#1E7773] rounded-md flex flex-row justify-between items-center px-2 w-24 h-10">
                                    <button disabled={subQuantity === 1} onClick={() => setSubQuantity(subQuantity - 1)}>-</button>
                                    <p className=''>{subQuantity}</p>
                                    <button
                                    // onClick={() => setSubQuantity(subQuantity + 1)}
                                        onClick={() => {
                                          const limit = productDetail.product?.order_limit !== null ? productDetail.product?.order_limit : 1000;
                                          if (subQuantity < limit) {
                                            setSubQuantity(subQuantity + 1);
                                          } else {
                                            toast.warning(`Maximum order limit (${limit}) reached!`);
                                          }
                                        }}
                                        >+</button>
                                </div>
                              <button className='p-2 pt-3 bg-[#1E7773] w-full lg:text-[15px] font-bazaar text-xs rounded-md'
                                    onClick={() => handleAddCart(productDetail.product)}>
                                    ADD TO CART
                                </button>
                            </div>
                        </form>
                        <div> 
                        <p>
                            ₨ {subQuantity && selectedPackPrice && selectedPackSize || selectedOptionPrice
                                ? ((Number(subQuantity || 1) * Number(selectedPackSize || 1)) * (Number(selectedPackPrice || 1) + Number(selectedOptionPrice ? selectedOptionPrice : 0) + Number(selectedLidPrice ? selectedLidPrice : 0))).toFixed(2)
                                : 0}

                            / Per Pieces: {(Number(selectedPackPrice || 0) + Number(selectedOptionPrice || 0)) + Number(selectedLidPrice || 0)}
                        </p>
                                                 {/* <h3 className="text-[13px] font-semibold py-2 ">Printing Price :</h3> */}

{selectedOptionPrice ? (
  <p>
    Printing Price: {Number(selectedOptionPrice) * Number(selectedPackSize || 1)}
  </p>
) : (
    
  <p className="text-gray-400 text-sm">Select a variant to see price</p>
)}
                        {productDetail.product?.activeDiscount && ( <p className='text-sm '>{Number(productDetail.product?.activeDiscount?.discount_percentage)}% OFF ( {productDetail.product?.activeDiscount?.name} )</p>)}
                        </div>

                        <div className="flex flex-row md:gap-5 gap-2">
                            <button className='p-2 pt-3 border-b-4 border-[#1E7773] w-32 lg:text-[15px] font-bazaar cursor-pointer text-xs' onClick={() => handleWishlist(productDetail.product.id )}>ADD TO WISHLIST</button>
                            <button className='p-3 border flex flex-row justify-between items-center gap-2  border-[#1E7773] w32 lg:text-[15px]  font-bazaar text-xs rounded-md' onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${inquiryMessage}`, '_blank')}><FaWhatsapp className='text-[#1E7773] text-2xl' /> <p className="pt-2 cursor-pointer">ORDER ON WHATSAPP</p></button>
                        </div>
                        {/* <button className='p-3 pt-3 bg-[#1E7773] w-52 lg:text-[15px] font-bazaar text-xs rounded-md'>CUSTOMIZED PRINTING</button> */}
                    </div>
                </section>
                {/* Product Description and Additional Information */}
                <section className='flex flex-col gap-8 md:py-20 py-5 cursor-pointer'>
                    <div className="flex flexrow w-full border-b border-[#1E7773] justify-center items-center">
                        <div className="flex flex-row justify-center md:gap-5 gap-2 items-center">
                            <h3 onClick={() => setProductTextDetail('Description')} className={`font-bazaar py-2 ${productTextDetail === 'Description' ? ' border-b-2 border-[#1E7773]' : 'text-[#55555F]'} md:text-xl text-xs`}>Product Description </h3>
                            <h3 onClick={() => setProductTextDetail('Additional information')} className={`font-bazaar py-2 ${productTextDetail === 'Additional information' ? ' border-b-2 border-[#1E7773]' : 'text-[#55555F]'} md:text-xl text-xs`}>Additional information</h3>
                            <h3 onClick={() => setProductTextDetail('Watch Product Video')} className={`font-bazaar py-2 ${productTextDetail === 'Watch Product Video' ? ' border-b-2 border-[#1E7773]' : 'text-[#55555F]'} md:text-xl text-xs`}>Watch Product Video</h3>
                        </div>
                    </div>
                    <div>
                        {productTextDetail === 'Description' && (
                            <div className="flex flex-col gap-2">
                                {productDetail.product?.description ? (
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: productDetail.product.description,
                                        }}
                                        className="text-md"
                                    />
                                ) : (
                                    <p className="text-md">No Description Found</p>
                                )}
                                
                            </div>
                        )}
                        {productTextDetail === 'Additional information' && (
                            <div className="flex flex-col gap-2">
                                {productDetail.product?.additional_information ? (
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: productDetail.product.additional_information,
                                        }}
                                        className="text-md"
                                    />
                                ) : (
                                    <p className="text-md">No Additional Information Found</p>
                                )}
                            </div>
                        )}

                        {productTextDetail === 'Watch Product Video' && (
                            <div className="flex flex-col gap-2">
                                {productDetail.product?.product_video_url ? (
                                    <iframe
                                        className="w-full h-96"
                                        src={`https://www.youtube.com/embed/${productDetail.product.product_video_url.split('v=')[1]}`}
                                        title="Product Video"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <p>No Video Found</p>
                                )}

                            </div>
                        )}



                        {/* Add content for 'Additional information' and 'Watch Product Video' */}
                    </div>
                </section>
                {recomendedProducts.length === 0 ? (
                    <h3 className='text-center text-4xl py-10 font-bazaar'>No Related Product Found</h3>
                ) : (
                    <>

                        <RcmdProduct products={recomendedProducts} />
                    </>
                )}

                <div className="relative z-10">
                    {/* <Deals /> */}
                </div>
                <Review />
            </main>
            {/* Background Image */}
            <img
                data-aos="fade-left"
                className="absolute top-[44rem] right-0 md:w-28 w-16"
                src={`${Image_Url}plateRight.svg`}
                alt="Plate"
            />
            <img
                data-aos="fade-right"
                className="absolute top-[100rem] left-0 lg:w-16 w-8"
                src={`${Image_Url}leftCup.svg`}
                alt="Plate"
            />
            {/* <img
                // data-aos="fade-left"
                className="absolute z-0 top-[100rem] right-0 w-full h-screen"
                src={`${Image_Url}ShopAssets/bgGradient.svg`}
                alt="bgGradient"
            /> */}
          {isCartModalOpen && (
                       <div className="fixed inset-0 flex items-center justify-center z-50 text-black" onClick={() => setIsCartModalOpen(false)}>
                           <div className="fixed md:top-36 md:right-4 bg-white shadow-lg p-4 rounded-lg z-50 w-[300px] transition-transform duration-500">
                               <div className='flex justify-between  text-black'>
                                   <h4 className="text-md font-bold">Added to Cart</h4>
                                   <FiX size={24} onClick={() => setIsCartModalOpen(false)} />
                               </div>
                               
                               <CartModal />
                               <div className="flex flex-row gap-2 mt-2">
                                   <Link href='/shop/' className='p-1 flex justify-center items-center pt-2 border text-[#1E7773] border-[#1E7773] w-full lg:text-[15px] font-bazaar text-xs rounded-md'>
                                       CONTINUE
                                   </Link>
                                   <Link href='/cart/' className='p-1 flex justify-center items-center pt-2 bg-[#1E7773] w-full lg:text-[15px] text-white font-bazaar text-xs rounded-md'>
                                       CART
                                   </Link>
                               </div>
                           </div>
                       </div>
                   )}
            
        </div>
    )
}

