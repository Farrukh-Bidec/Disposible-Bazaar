"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import axios from '../../src/Utils/axios';
import Image from 'next/image';
import Link from 'next/link';
import { Assets_Url, Image_Url } from '../../src/const';
import { FaAngleDown, FaCircle, FaWhatsapp } from 'react-icons/fa';
import RcmdProduct from '../../src/components/Shop/RcmdProduct';
import Review from '../../src/components/Reviews/Review';
import { Loader } from '../../src/components/Loader';
import { useWishlist } from '../../src/Context/WishlistContext';
import { useCart } from '../../src/Context/CartContext';
import { useUser } from '../../src/Context/UserContext';
import CustomDetailSeo from '../../src/components/CustomDetailSeo';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
import DecodeTextEditor from '../../src/components/DecodeTextEditor';
import CartModal from '../../src/components/cart/CartModal';
import { FiX } from 'react-icons/fi';
// import { headers } from 'next/headers';

function ShopDetails() {
    const { slug } = useParams(); // ✅ Correct slug
    const router = useRouter();

    const [productDetail, setProductDetail] = useState([]);
    const [productVariants, setProductVariants] = useState([]);
    const [selectedProductVariants, setSelectedProductVariants] = useState([]);
    const [productLids, setProductLids] = useState([]);
    const [recomendedProducts, setRecomendedProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState();
    const [selectedBrandId, setSelectedBrandId] = useState();
    const [productReview, setProductReview] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [productId, setProductId] = useState(0);
    const [selectedImage, setSelectedImage] = useState(''); // State to track the selected image
    const [quantity, setQuantity] = useState(null);
    const [selectedVariantId, setSelectedVariantId] = useState(null);
    const [selectedVariantPrice, setSelectedVariantPrice] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [selectedLidId, setSelectedLidId] = useState(null);
    const [selectedLidPrice, setSelectedLidPrice] = useState(0);
    const [selectedLid, setSelectedLid] = useState(0);
    const [subQuantity, setSubQuantity] = useState(1);
    const [productTextDetail, setProductTextDetail] = useState('Description');
    const [isLoading, setIsLoading] = useState(false); // New state for loading
    const [brandsOpen, setBrandsOpen] = useState(false); // New state for loading
    const { addToWishlist } = useWishlist();  // Access the addToWishlist function from context
    const { addToCart } = useCart();
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const { user } = useUser();
    const [IsCustomizeable, setIsCustomizeable] = useState([])
    const navigate = useRouter()
    const dropdownRef = useRef(null);
    const [productUrl, setProductUrl] = useState('');
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

    const fetchData = async () => {
        if (!slug) return;
        setIsLoading(true);

        try {
            const response = await axios.public.post("product/s/details", {
                slug: slug,
            });

            const resData = response.data.data;
            setProductDetail(resData);
            setProductImages(resData.product.product_image);
            setSelectedImage(resData.product.product_image[0]?.image);

            setRecomendedProducts(resData.recommended_products);

            setBrands(resData?.product?.product_brands?.filter((b) => b.status === 1) || []);
            const firstBrand = resData?.product?.product_brands?.find((b) => b.status === 1);
            setSelectedBrands(firstBrand?.name || '');
            setSelectedBrandId(firstBrand?.id || null);

            setProductVariants(resData.product.product_variants);
            setSelectedProductVariants(
                resData.product.product_variants.filter(
                    (v) => v.brand_id === firstBrand?.id
                )
            );

            setProductLids(resData.product.product_lid_options);
            setProductId(resData.product.id);

            const firstVariant = resData.product.product_variants.filter(
                (v) => v.brand_id === firstBrand?.id
            )[0];
            if (firstVariant) {
                setQuantity(firstVariant.pack_size);
                setSelectedVariantId(firstVariant.id);
                setSelectedVariantPrice(Number(firstVariant.price_per_piece ?? firstVariant.price ?? 0));
                setSelectedVariant(firstVariant.pack_size);
            }
        } catch (error) {
            console.log("Product Fetch Error →", error);
        }

        setIsLoading(false);
    };


    const fetchReviews = async () => {
        try {
            const res = await axios.public.get(`product_reviews/${slug}`);
            setProductReview(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
        fetchReviews();
    }, [slug]);

    //   const handleWishlist = async (id) => {
    //     if (!user) {
    //       router.push("/login");
    //       return;
    //     }

    //     try {
    //       const check = await axios.protected.get(`/user/wishlist/${id}/check`);
    //       if (check.data.exists) return toast.error("Already in wishlist");

    //       await axios.protected.post(`/user/wishlist/${id}/add`);
    //       addToWishlist();
    //       toast.success("Added to wishlist");
    //     } catch (e) {
    //       toast.error("Error adding to wishlist");
    //     }
    //   };




    // Ensure the URL ends with a slash


    const pathname = usePathname();   // <-- ADD THIS

    let path = pathname;
    if (!path.endsWith('/')) {
        path += '/';
    }
    // const { slug } = useParams();

    // Extract product slug/id
    const id = path.split("/product/")[1] || '';

    const fetchDataById = async (id) => {

        setIsLoading(true);
        try {
            const response = await axios.public.post(`product/s/details`, {
                slug: id,
            });
            const resData = response.data.data
            // console.log("is_customizeable", resData.product.product.childProducts[0]);
            const hasChildProducts = productDetail.product?.childProducts?.length > 0;

            if (hasChildProducts) {
                console.log("resData Show button");
            } else {
                console.log("resData Hide button");
            }


            setProductDetail(resData);
            setSelectedImage(resData?.product?.product_image?.[0]?.image || ''); // Set initial image
            setProductImages(resData?.product?.product_image || [])
            setRecomendedProducts(resData?.recommended_products || [])
            const productBrands = resData?.product?.product_brands || [];
            setBrands(productBrands.filter(i => i.status === 1))
            const selectedBrand = productBrands.find(i => i.status === 1);
            setSelectedBrands(selectedBrand?.name)
            setSelectedBrandId(selectedBrand?.id)
            setProductVariants(resData?.product?.product_variants || [])
            setProductLids(resData?.product?.product_lid_options || [])
            setProductId(resData?.product?.id)
            const seletedBrandId = selectedBrand?.id
            if (seletedBrandId && resData?.product?.product_variants?.filter(i => i.brand_id === seletedBrandId)) {
                console.log(true);
                setSelectedProductVariants(resData.product.product_variants.filter(i => i.brand_id === seletedBrandId))
            }
            const firstVariant = resData?.product?.product_variants?.find(i => i.brand_id === seletedBrandId);

            setIsCustomizeable(productDetail.product?.childProducts?.length > 0)


            if (firstVariant) {
                setQuantity(firstVariant.pack_size);
                setSelectedVariantId(firstVariant.id); // Set the default selected variant
                setSelectedVariant(firstVariant.pack_size)
                setSelectedVariantPrice(Number(firstVariant.price_per_piece ?? firstVariant.price ?? 0));
            }
            const price = quantity && selectedVariantPrice && (quantity * subQuantity * selectedVariantPrice)
            // console.log('Price', selectedVariantPrice);
            // console.log('P', quantity);


            setIsLoading(false);
        } catch (error) {
            console.log('Error fetching product details:', error);
        } finally {

        }
    };
    const handleCategoryLink = (item) => {
        // console.log('id', item.subCategories);
        // setCategory(item);
        // console.log('id', category);

        navigate(`/product-category/${item.slug}`, { state: item.id })
    }


    const fetchReviewById = async (id) => {

        setIsLoading(true);
        try {
            const response = await axios.public.get(`product_reviews/${id}`);
            setProductReview(response.data)
            // console.log('shop', productReview);

            // console.log('productReview', productReview);
        } catch (error) {
            console.log('Error fetching product review:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch product details by ID when the component mounts

    useEffect(() => {
        if (id) {
            fetchDataById(id); // Call the function with the ID
            fetchReviewById(id)
        }
    }, [id]);

    useEffect(() => {
        console.log("selectedBrands", selectedBrands);
        console.log("selectedBrandId", selectedBrandId);
        console.log('productLids', productLids)
    },);
    // const handleWishlist = (id) => {
    //     if (!user) {
    //         navigate('/login')
    //     }


    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.protected.post(`user/wishlist/${id}/add`);
    //             if (id) {
    //                 // Call addToWishlist to update the wishlist count in the context
    //                 addToWishlist();
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }

    //         toast.success(` added to cart`);
    //     };

    //     fetchData();
    // };
    const handleWishlist = async (id) => {
        if (!user) {
            router.push("/login");   // ✅ FIXED
            return;
        }

        try {
            // Make a request to check if the item is already in the wishlist
            const wishlistResponse = await axios.protected.get(`/user/wishlist/${id}/check`);
            // console.log(wishlistResponse.data);

            if (wishlistResponse.data.exists) {
                toast.error('Product already added to wishlist');
            } else {
                const response = await axios.protected.post(`/user/wishlist/${id}/add`, null, {
                    headers: { Accept: "application/json" }
                });
                if (response.status === 200) {
                    addToWishlist(); // Call to update wishlist count in context
                    toast.success('Product added to wishlist');
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('An error occurred while adding to wishlist');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleSelectedBrand = (data) => {
        setSelectedBrands(data.name)
        setSelectedBrandId(data.id)
        setSelectedProductVariants(productVariants.filter(i => i.brand_id === data.id))

        const firstVariant = productVariants.filter(i => i.brand_id === data.id)[0];

        if (firstVariant) {
            setQuantity(firstVariant.pack_size);
            setSelectedVariantId(firstVariant.id); // Set the default selected variant
            setSelectedVariant(firstVariant.pack_size)
            setSelectedVariantPrice(Number(firstVariant.price_per_piece ?? firstVariant.price ?? 0));
        }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image); // Update the selected image when clicked
    };

    // Handle Add to Cart Logic
    const handleAddCart = (product) => {
        // ❗Check if pieces/variant is not selected
        if (!selectedVariantId) {
            toast.warning("Please select pieces before adding to cart!");
            return;
        }

        const product_id = product.id;
        const product_name = product.name;

        const selectedVar = productVariants.find(v => v.id === selectedVariantId);
        const variantPrice = selectedVar ? Number(selectedVar.price_per_piece ?? selectedVar.price ?? 0) : 0;

        const pack_size = Number(selectedVariant);
        const product_quantity = Number(subQuantity);
        const total_pieces = pack_size * product_quantity;

        const baseTotal = (pack_size * subQuantity * variantPrice) + (pack_size * subQuantity * Number(selectedLidPrice || 0));
        let finalTotal = baseTotal;

        const discountPercentage = parseFloat(product?.activeDiscount?.discount_percentage);
        if (!isNaN(discountPercentage) && discountPercentage > 0) {
            finalTotal -= baseTotal * (discountPercentage / 100);
        }

        const product_total = finalTotal.toFixed(2);

        const product_img = selectedImage
            ? selectedImage
            : product.product_image?.[0]?.image;

        const lid = selectedLidId || null;
        const lid_Price = selectedLidPrice ? Number(selectedLidPrice) : 0;

        addToCart(
            product_id,
            product_name,
            product_quantity,
            pack_size,
            total_pieces,
            variantPrice,
            product_img,
            product_total,
            selectedProductVariants,
            null,
            null,
            null,
            null,
            productLids,
            lid,
            lid_Price,
            null,
            0,
            false,
            product?.order_limit ?? 1000
        );

        setIsCartModalOpen(true);
        toast.success(`${product.name} added to cart`);
    };

    console.log("product detail");

    useEffect(() => {
        setProductUrl(window.location.href);
    }, []);

    const whatsappNumber = "+923213850002";
    const inquiryMessage = encodeURIComponent(
        `Hello! I am interested in the following product:\n\n${productDetail?.product?.name}\n\n${productUrl}`
    );

    if (isLoading) return <Loader />;
    return (
        <div className="relative py-32 px-10 text-white overflow-hidden">
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
            {/* {console.log('product', productDetail)} */}
            <ToastContainer autoClose={500} />
            {/* Breadcrumb and Title */}
            <div className="flex flex-col py-5">
                <p>
                    <Link href="/">Home</Link> /{" "}
                    <Link href="/shop/">Shop</Link> /{" "}
                    <span
                        onClick={() => handleCategoryLink(productDetail?.product?.category)}
                        className="inline cursor-pointer"
                    >
                        {productDetail?.product?.category?.name || "Category Name"}
                    </span>

                    {productDetail?.product?.subCategory?.name && (
                        <> / <Link href="/shop/">{productDetail.product?.subCategory.name || 'Category Name'}</Link></>
                    )}{" "}
                    / {productDetail?.product?.name || "Product Name"}

                </p>
            </div>
            <main className=''>
                <section className='flex lg:flex-row flex-col gap-8'>

                    <div className="lg:w-3/5 md:h-[34rem] h-[20rem] flex flex-row md:gap-5 gap-2">
                        {/* Thumbnails */}
                        <div className="w-1/5 flex flex-col gap-1">

                            {/* CASE 1: productImages is undefined or null */}
                            {!Array.isArray(productImages) ? (
                                <p>No images found</p>
                            ) : productImages.length === 0 ? (

                                /* CASE 2: Array but empty */
                                <div className="w-full h-1/4 py-1">
                                    <Image
                                        src={`https://ecommerce-inventory.thegallerygen.com${productDetail?.product?.image_path}`}
                                        alt="Default Product Image"
                                        width={500}
                                        height={500}
                                        className="w-full h-full bg-[#32303e] rounded-xl border-2 border-[#1E7773] object-cover cursor-pointer"
                                    />
                                </div>

                            ) : (

                                /* CASE 3: Array with images */
                                productImages.slice(0, 4).map((prod, index) => (
                                    <div key={index} className="w-full h-1/4 py-1">
                                        <Image
                                            src={
                                                prod?.image
                                                    ? `${Assets_Url.replace(/\/$/, "")}/${prod.image.replace(/^\/+/, "")}`
                                                    : `${Image_Url}defaultImage.svg`
                                            }
                                            alt={prod?.image_alt || "Product Image"}
                                            width={500}
                                            height={500}
                                            className="w-full h-full bg-[#32303e] rounded-xl border-2 border-[#1E7773] object-cover cursor-pointer"
                                            onClick={() => handleImageClick(prod?.image)}
                                        />
                                    </div>
                                ))

                            )}

                        </div>

                        {/* Large Image Display */}
                        <div className="w-4/5 rounded-lg bg-[#32303e] relative min-h-[300px]">
                            {selectedImage ? (
                                <>
                                    {/* DEBUG: Log the image URL construction */}
                                    {console.log("DEBUG: selectedImage raw:", selectedImage)}
                                    {console.log("DEBUG: Constructed URL:", `${Assets_Url.replace(/\/$/, "")}/${selectedImage.replace(/^\/+/, "")}`)}
                                    <Image
                                        src={
                                            selectedImage
                                                ? `${Assets_Url.replace(/\/$/, "")}/${selectedImage.replace(/^\/+/, "")}`
                                                : `${Image_Url}defaultImage.svg`
                                        }
                                        alt={productImages?.[0]?.image_alt || "Product Image"}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    </>
                                    ) : (
                                    <img
                                        src={`https://ecommerce-inventory.thegallerygen.com${productDetail?.product?.image_path}`}
                                        alt={productImages?.[0]?.image_alt || "Product Image"}
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                            )}
                                </div>
                                


                        </div>

                        <div className="lg:w-2/5 flex flex-col gap-5 text-white h[300px]">
                            <div>
                                <p className='text-sm text-gray-300'>
                                    {productDetail?.product?.stock_status === 1 ? "In Stock" : "Out Of Stock"}
                                </p>                         <h1 className='md:text-5xl text-3xl font-semibold'>
                                    {productDetail?.product?.name + '111' || 'Product Name'}
                                    {console.log(productDetail)}
                                </h1>

                            </div>
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

                            <p className='text-xl font-semibold'>
                                {/* {productVariants && productVariants.length > 0 ? (
                                <>
                                    Rs {productVariants[0].price} - {productVariants[productVariants.length - 1].price}
                                    ₨ {quantity && selectedVariantPrice && (quantity * subQuantity * selectedVariantPrice)}
                                </>
                            ) : (
                                <span>No variants available</span>
                            )} */}
                                Rs {selectedProductVariants[0]?.price}
                            </p>

                            <form onSubmit={handleSubmit} className='max-w-130  w-full flex flex-col gap-5 '>
                                {/* Quantity Selection */}
                                <div className="my-form border w-full border-[#1E7773] rounded-full flex items-stretch">
                                    <p className="my-form-heading bg-[#1E7773] rounded-l-full h-full p-1 px-5 flex items-center">Pieces</p>
                                    <div className="flex flex-wrap gap-4 justify-start p-1 px-2 items-center">
                                        {/* <div className="flex flex-row items-center justify-center gap-2">
                                        <input onClick={() => setQuantity(25)} defaultChecked id="1" type="radio" name="option" />
                                        <label htmlFor="1">25 Pcs</label>
                                    </div>
                                    <div className="flex flex-row pr-2 items-center justify-center gap-2">
                                        <input onClick={() => setQuantity(50)} id="2" type="radio" name="option" />
                                        <label htmlFor="2">50 Pcs</label>
                                    </div>
                                    <div className="flex flex-row items-center justify-center gap-2">
                                        <input onClick={() => setQuantity(100)} id="3" type="radio" name="option" />
                                        <label htmlFor="3">100 Pcs</label>
                                    </div> */}
                                        {selectedProductVariants && selectedProductVariants.length > 0 ? (
                                            selectedProductVariants.map((variant, index) => (
                                                <div key={variant.id} className="flex flex-row items-center gap-2">
                                                    <input
                                                        id={`variant-${variant.id}`}
                                                        type="radio"
                                                        name="variant"
                                                        value={variant.id}
                                                        checked={selectedVariantId === variant.id}
                                                        defaultChecked={true}
                                                        onChange={() => {
                                                            setQuantity(variant.pack_size);
                                                            setSelectedVariantId(variant.id);
                                                            setSelectedVariantPrice(Number(variant.price_per_piece ?? variant.price ?? 0));
                                                            setSelectedVariant(variant.pack_size);
                                                        }}
                                                    />
                                                    <label htmlFor={`variant-${variant.id}`}>{variant.pack_size} Pcs</label>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No variants available.</p>
                                        )}



                                    </div>
                                </div>

                                <div className='flex flex-row gap-3'>
                                    {/* <div className="border border-[#1E7773] rounded-md flex flex-row justify-between items-center px-2 w-24 h-10">
                                    <button disabled={subQuantity === 1} onClick={() => setSubQuantity(subQuantity - 1)}>-</button>
                                    <p className=''>{subQuantity}</p>
                                    <button disabled={subQuantity >= productDetail.product?.order_limit} onClick={() => setSubQuantity(subQuantity + 1)}>+</button>
                                </div> */}
                                    <div className="border border-[#1E7773] rounded-md flex flex-row justify-between items-center px-2 w-24 h-10">
                                        <button
                                            disabled={subQuantity === 1}
                                            onClick={() => setSubQuantity(subQuantity - 1)}
                                        >
                                            -
                                        </button>

                                        <p>{subQuantity}</p>

                                        <button
                                            onClick={() => {
                                                const limit = productDetail.product?.order_limit !== null ? productDetail.product?.order_limit : 1000;
                                                if (subQuantity < limit) {
                                                    setSubQuantity(subQuantity + 1);
                                                } else {
                                                    toast.warning(`Maximum order limit (${limit}) reached!`);
                                                }
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button className='p-2 pt-3 px-20  bg-[#1E7773] cursor-pointer w-full lg:text-[15px] font-bazaar text-xs rounded-md'
                                        onClick={() => handleAddCart(productDetail.product)}>
                                        ADD TO CART
                                    </button>
                                </div>

                                {/* Product Lids Selection*/}
                                {productLids && productLids.length > 0 && (
                                    <>
                                        <div className=" my-form border rounded-lg h32 w-6/7 md:w-96 border-[#1E7773]">
                                            <p className="bg-[#1E7773] rounded-t-lg py-0.5 px-5">Lids</p>
                                            <div className="flex flex-wrap gap-4 justify-start p-3 items-center">
                                                {/* <div className="flex flex-row items-center justify-center gap-2">
                                        <input onClick={() => setQuantity(25)} defaultChecked id="1" type="radio" name="option" />
                                        <label htmlFor="1">25 Pcs</label>
                                    </div>
                                    <div className="flex flex-row pr-2 items-center justify-center gap-2">
                                        <input onClick={() => setQuantity(50)} id="2" type="radio" name="option" />
                                        <label htmlFor="2">50 Pcs</label>
                                    </div>
                                    <div className="flex flex-row items-center justify-center gap-2">
                                        <input onClick={() => setQuantity(100)} id="3" type="radio" name="option" />
                                        <label htmlFor="3">100 Pcs</label>
                                    </div> */}
                                                <input
                                                    onClick={() => {
                                                        // setQuantity(lid.pack_size);
                                                        setSelectedLidId(null); // Set selected lid on click
                                                        setSelectedLidPrice(null);
                                                        setSelectedLid(null);
                                                        setSelectedImage(productDetail?.product?.product_image[0]?.image);
                                                        // console.log(selectedLidId, "-", lid.id)
                                                    }}
                                                    id={123}
                                                    type="radio"
                                                    name="lid"
                                                    checked={selectedLidId === null}
                                                />
                                                <label htmlFor={123}>No Lids</label>
                                                {productLids && productLids.length > 0 ? (
                                                    productLids.map((lid) => (
                                                        <div key={lid.id} className="flex flex-row items-center justify-center pr-3 gap-2">
                                                            <input
                                                                onClick={() => {
                                                                    // setQuantity(lid.pack_size);
                                                                    setSelectedLidId(lid.id); // Set selected lid on click
                                                                    setSelectedLidPrice(lid.price);
                                                                    setSelectedLid(lid.name);
                                                                    setSelectedImage(lid.image);
                                                                    console.log(selectedLidId, "-", lid.id)
                                                                }}
                                                                id={lid.id}
                                                                type="radio"
                                                                name="lid"
                                                                checked={selectedLidId === lid.id}
                                                            />
                                                            <label htmlFor={lid.id}>{lid.name} Pcs</label>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No lids available.</p> // Message if no variants exist
                                                )}
                                            </div>
                                        </div>
                                        {(selectedLidId && selectedVariant > 0) && <p className='text-sm'>Lids Pieces {selectedVariant}</p>}
                                    </>
                                )}


                            </form>



                            {/* <p>₨ {quantity && subQuantity && (quantity * subQuantity * productDetail.product?.current_sale_price)} / Per Pieces : {productDetail.product?.current_sale_price}</p> */}
                            <div>
                                <p className='text-sm'>
                                    <span className='text-lg text-bolder'>
                                        ₨ {selectedLid
                                            ? quantity && selectedVariantPrice && selectedLidPrice && ((quantity * subQuantity * selectedVariantPrice) + (quantity * subQuantity * selectedLidPrice))
                                            : quantity && selectedVariantPrice && (quantity * subQuantity * selectedVariantPrice)}
                                        /
                                    </span>
                                    Per Piece: ₨ {Number(selectedVariantPrice) + Number(selectedLidPrice)}
                                </p>

                                {productDetail?.product?.activeDiscount && (
                                    <p className='text-sm'>
                                        {Number(productDetail?.product?.activeDiscount?.discount_percentage)}% OFF (
                                        {productDetail?.product?.activeDiscount?.name})
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-row md:gap-5 gap-2 cursor-pointe">
                                <button onClick={() => handleWishlist(productDetail.product.id)} className='p-2 pt-3 border-b-4 border-[#1E7773]  lg:text-[15px] font-bazaar cursor-pointer text-xs '>ADD TO WISHLIST</button>
                                <button className='p-3 border flex flex-row justify-between items-center gap-2  border-[#1E7773] w32 lg:text-[15px]  font-bazaar text-xs rounded-md'
                                    onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=${inquiryMessage}`, '_blank')}>
                                    <FaWhatsapp size={25} className="text-[#1E7773]" />
                                    <p className="pt-2 text-[12px] cursor-pointer">ORDER ON WHATSAPP</p>
                                </button>
                            </div>
                            {productDetail?.product?.childProducts?.length > 0 ? (
                                <Link href={`/customization/${productDetail?.product?.childProducts[0]?.slug}`}>
                                    {/* <button className='p-3 pt-4 bg-[#1E7773] w-52 lg:text-[15px] font-bazaar text-xs rounded-md'>CUSTOMIZED PRINTING</button> */}
                                </Link>
                            ) : null}
                            {/* <Link to={`/customization/${productDetail.product?.slug}`}>
                            <button className='p-3 pt-4 bg-[#1E7773] w-52 lg:text-[15px] font-bazaar text-xs rounded-md'>CUSTOMIZED PRINTING</button>
                        </Link> */}
                        </div>
                </section>

                {/* Product Description and Additional Information */}
                <section className='flex flex-col gap-8 md:py-20 py-5'>
                    <div className="flex flexrow w-full border-b border-[#1E7773] justify-center items-center">
                        <div className="flex flex-row justify-center md:gap-5 gap-2 items-center">
                            <h2 onClick={() => setProductTextDetail('Description')} className={`font-bazaar cursor-pointer py-2 ${productTextDetail === 'Description' ? ' border-b-2 border-[#1E7773]' : 'text-[#55555F]'} md:text-xl text-xs`}>Product Description </h2>
                            <h2 onClick={() => setProductTextDetail('Additional information')} className={`font-bazaar cursor-pointer py-2 ${productTextDetail === 'Additional information' ? ' border-b-2 border-[#1E7773]' : 'text-[#55555F]'} md:text-xl text-xs`}>Additional information</h2>
                            <h2 onClick={() => setProductTextDetail('Watch Product Video')} className={`font-bazaar cursor-pointer py-2 ${productTextDetail === 'Watch Product Video' ? ' border-b-2 border-[#1E7773]' : 'text-[#55555F]'} md:text-xl text-xs`}>Watch Product Video</h2>
                        </div>
                    </div>
                    <div>
                        {productTextDetail === 'Description' && (
                            <div className="flex flex-col gap-2">
                                {console.log("aa", productDetail)}

                                {productDetail?.product?.description ? (
                                    <DecodeTextEditor body={productDetail.product.description} />

                                ) : (
                                    <p className="text-md">No Description Found</p>
                                )}
                            </div>
                        )}
                        {productTextDetail === 'Additional information' && (
                            <div className="flex flex-col gap-2">
                                {productDetail?.product?.additional_information ? (
                                    <DecodeTextEditor body={productDetail.product.additional_information} />
                                ) : (
                                    <p className="text-md">No Additional Information Found</p>
                                )}
                            </div>

                        )}

                        {productTextDetail === 'Watch Product Video' && (
                            <div className="flex flex-col gap-2">
                                {productDetail?.product?.product_video_url ? (
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
                    <h2 className='text-center text-4xl py-10 font-bazaar'>No Related Product Found</h2>
                ) : (
                    <>

                        <RcmdProduct products={recomendedProducts} setIsCartModalOpen={setIsCartModalOpen} />
                    </>
                )}

                <div className="relative z-10">
                    {/* <Deals /> */}
                </div>
                <Review productId={productId} setProductReview={setProductReview} productReview={productReview} />





            </main>
            {/* Background Image */}
            <div className="absolute top-[44rem] right-0 md:w-28 w-16 h-16 md:h-28 relative">
                <Image
                    data-aos="fade-left"
                    src={`${Image_Url}plateRight.svg`}
                    alt="Plate"
                    fill
                    className="object-contain"
                />
            </div>


            <div className="absolute top-[100rem] left-0 lg:w-16 w-8 lg:h-16 h-8 relative">
                <Image
                    data-aos="fade-right"
                    src={`${Image_Url}leftCup.svg`}
                    alt="Plate"
                    fill
                    className="object-contain"
                />
            </div>


            {/* <img
                // data-aos="fade-left"
                className="absolute z-0 top-[100rem] right-0 w-full h-screen"
                src={`${Image_Url}ShopAssets/bgGradient.svg`}
                alt="bgGradient"
            /> */}
            {isCartModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50" onClick={() => setIsCartModalOpen(false)}>
                    <div className="fixed md:top-32 md:right-4 bg-white shadow-lg p-4 rounded-lg z-50 w-[300px] transition-transform duration-500">
                        <div className='flex justify-between  text-black'>
                            <h4 className="text-md font-bold">Added to Cart</h4>
                            <FiX size={24} onClick={() => setIsCartModalOpen(false)} />
                        </div>
                        <CartModal />
                        <div className="flex flex-row gap-2 mt-2">
                            <Link href='/shop/' className='p-1 flex justify-center items-center pt-2 border text-[#1E7773] border-[#1E7773] w-full lg:text-[15px] font-bazaar text-xs rounded-md'>
                                CONTINUE
                            </Link>
                            <Link href='/cart/' className='p-1 flex justify-center items-center pt-2 bg-[#1E7773] w-full lg:text-[15px] font-bazaar text-xs rounded-md'>
                                CART
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}

export default ShopDetails;
