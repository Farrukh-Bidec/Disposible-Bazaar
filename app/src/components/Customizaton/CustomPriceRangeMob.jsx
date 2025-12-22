"use client"
import React, { useEffect, useState } from 'react';
import '../Shop/Shop.css';
import { FaCheck } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { PiCaretDownThin, PiCaretUpThin } from 'react-icons/pi';
import axios from '../../Utils/axios';

const CustomPriceRangeMob = ({ onFilter, isFilter, setIsFilter }) => {
    const min = 1000;
    const max = 15000;
    const [priceFrom, setPriceFrom] = useState(min);
    const [priceTo, setPriceTo] = useState(max);
    const [selected, setSelected] = useState('Z to A'); // Z to A is selected by default
    const [price, setPrice] = useState(false)
    const [sort, setSort] = useState(false)
    const [cate, setCate] = useState(false)
    const [quantity, setQuantity] = useState([])
    const [size, setSize] = useState(false)
    const [option, setOption] = useState(false)
    const [ratingCount, setRatingCount] = useState(false)
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isSize, setIsSize] = useState(false)
    const [isQuantity, setIsQuantity] = useState(true)
    const [isOption, setIsOption] = useState(false)
    
    


    const rating = [
        { id: 1, name: '1 Star' },
        { id: 2, name: '2 Star' },
        { id: 3, name: '3 Star' },
        { id: 4, name: '4 Star' },
        { id: 5, name: '5 Star' },
    ]
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.public.get('product/category');
                const categoryData = response.data.data;
                setCategories(categoryData);
                // setFilteredCategories(categoryData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
     // fetch Sizes
     useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.public.get('product/all/size');
                const sizeData = response.data.data;
                setSize(sizeData);
                // setFilteredCategories(categoryData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    // fetch Quantity
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.public.get('product/all/variants');
                const quantityData = response.data.data;
                setQuantity(quantityData);
                // setFilteredCategories(categoryData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
     // fetch Optons
     useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.public.get('product/all/option');
                const optionData = response.data.data;
                setOption(optionData);
                // setFilteredCategories(categoryData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), priceTo - 1); // Prevent overlap
        setPriceFrom(value);
        onFilter({ price_from: value });
    };

    // Handle the max price change
    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), priceFrom + 1); // Prevent overlap
        setPriceTo(value);
        onFilter({ price_to: value });
    };
     // Handle sorting checkbox change
     const handleChange = (value) => {
        setSelected(value);
        onFilter({ selected: value });
    };

    const handleCate = (id) => {
        setSelectedCategories((prev) =>
            prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
        );
        onFilter({ category_Id: selectedCategories.includes(id) ? selectedCategories.filter(cat => cat != id) : [...selectedCategories, id] });
    }
    const handleSize = (id) => {
        // console.log(size);
        // setsizes(size)
        setSelectedSizes((prev) =>
            prev.includes(id) ? prev.filter((siz) => siz !== id) : [...prev, id]
        );

        onFilter({size: selectedSizes.includes(id) ? selectedSizes.filter(size => size!= id ) : [...selectedSizes, id] });
    }
    const handleQuantity = (id) => {
        // console.log(selectedQuantity);
        // setPackSize(quantity)
        setSelectedQuantities((prev) =>
            prev.includes(id) ? prev.filter((quan) => quan !== id) : [...prev, id]
        );
        console.log(selectedQuantities);
        
        onFilter({ pack_size: selectedQuantities.includes(id) ? selectedQuantities.filter(quan => quan != id) : [...selectedQuantities, id] });
    }
    const handleOption = (id) => {
        // console.log(id);
        // setOptions(id)
        setSelectedOptions((prev) =>
            prev.includes(id) ? prev.filter((opt) => opt !== id) : [...prev, id]
        );
        onFilter({ option_id: selectedOptions.includes(id) ? selectedOptions.filter(opt => opt != id) : [...selectedOptions, id] });
    }
    const handleRating = (id) => {
        // Toggle rating selection
        setSelectedRatings((prev) =>
            prev.includes(id) ? prev.filter((rate) => rate !== id) : [...prev, id]
        );

        // Call onFilter with updated ratings
        onFilter({ rating: selectedRatings.includes(id) ? selectedRatings.filter(rate => rate !== id) : [...selectedRatings, id] });
    };

    return (
        <div className={`fixed lg:hidden flex min-h-screen h-full top-0 z-50 flex flex-col gap-4 sm:w-80 w-full right-0  pt-4 pb-8 px-4 transition-transform duration-300 border-l-2 border-[#1E7773] bg-[#20202c] bg-opacity-100 overflow-y-auto ${isFilter ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="py-4 w-full flex flex-col gap2 text-white rounded-lg">
                <form>
                    <div className="flex justify-between items-center">
                        <h3 className='text-4xl'>Filter</h3>
                        <button onClick={() => setIsFilter(false)} type="button">
                            <RxCross2 className='text-4xl rounded-full p-2 bg-white text-[#1E7773]' />
                        </button>
                    </div>
                    <div className="py-2">
                    <h3 onClick={() => setPrice(!price)} className="flex flex-row justify-between items-center text-[#9F9F9F] text-xl font-bazaar mt-4"><p>Price</p><p>{price ? <PiCaretUpThin /> : <PiCaretDownThin />}</p></h3>
                    {price && (
                        <section>
                            {/* Price Slider */}
                            <div className="flex justify-between py-3">
                                <h3>{priceFrom}</h3>
                                <h3>{priceTo}</h3>
                            </div>

                            <div className="relative mb-3 h-6">
                                {/* Min price input */}
                                <input
                                    type="range"
                                    min={min}
                                    max={max}
                                    value={priceFrom}
                                    onChange={handleMinChange}
                                    className="absolute w-full h-1.5 appearance-none slider-thumb-custom min-thumb"
                                    style={{ zIndex: priceFrom > priceTo ? 5 : 3 }}
                                />

                                {/* Max price input */}
                                <input
                                    type="range"
                                    min={min}
                                    max={max}
                                    value={priceTo}
                                    onChange={handleMaxChange}
                                    className="absolute w-full h-1.5 appearance-none slider-thumb-custom max-thumb"
                                    style={{ zIndex: priceFrom < priceTo ? 5 : 3 }}
                                />

                                {/* Track */}
                                <div className="absolute top-0 h-1.5 w-full bg-gray-300 rounded"></div>

                                {/* Filled range between min and max */}
                                <div
                                    className="absolute top-0 h-1.5 bg-[#1E7773] rounded"
                                    style={{
                                        left: `${((priceFrom - min) / (max - min)) * 100}%`,
                                        right: `${100 - ((priceTo - min) / (max - min)) * 100}%`,
                                    }}
                                ></div>
                            </div>

                            {/* Display price values */}
                            <div className="w-full flex flex-wrap items-center text-xs xl:text-md gap-2 justify-start">
                                <div className='flex items-center justify-between gap-2'>
                                    <span>From</span>
                                    <div className="p-2 bg-[#1E7773] rounded-md">
                                        Rs: {priceFrom}
                                    </div>
                                </div>

                                <div className='flex items-center justify-between gap-2'>
                                    <span>To</span>
                                    <div className="p-2 bg-[#1E7773] rounded-md">
                                        Rs: {priceTo}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    </div>
                    <hr className='my-2 border border-[#9F9F9F]' />

                    <div className=" py-2">
                        <div className="flex flex-col gap-2">
                            <h3 onClick={() => setSort(!sort)} className="flex flex-row justify-between items-center text-xl text-[#9F9F9F] font-bazaar mt4"><p>Sort By</p><p>{sort ? <PiCaretUpThin /> : <PiCaretDownThin />}</p></h3>
                            {sort && (

<section className="flex flex-col gap-2">
    {/* A to Z Checkbox */}
    <label className="flex items-center gap-2 cursor-pointer">
        <input
            type="checkbox"
            checked={selected === 1}
            onChange={() => handleChange(1)}
            className="hidden"
        />
        <span className={`custom-checkbox ${selected === 1 ? 'checked' : ''}`}>
            {selected === 1 && <span className="checkmark text-white"><FaCheck size={10} /></span>}
        </span>
        <span>A to Z</span>
    </label>

    {/* Z to A Checkbox */}
    <label className="flex items-center gap-2 cursor-pointer">
        <input
            type="checkbox"
            checked={selected === 2}
            onChange={() => handleChange(2)}
            className="hidden"
        />
        <span className={`custom-checkbox ${selected === 2 ? 'checked' : ''}`}>
            {selected === 2 && <span className="checkmark text-white"><FaCheck size={10} /></span>}
        </span>
        <span>Z to A</span>
    </label>
</section>
)}
                        </div>
                    </div>

                    <hr className='my-2 border border-[#9F9F9F]' />
                    <div className="py-2">
                        <h3 onClick={() => setCate(!cate)} className="flex flex-row justify-between items-center text-xl text-[#9F9F9F] font-bazaar mt4"><p>Products Categories</p><p>{cate ? <PiCaretUpThin /> : <PiCaretDownThin />}</p></h3>
                        {cate && (
                        <section className="flex flex-col gap-2 py-3 ">
                            {categories.map((cate) => (
                                <label key={cate.id} className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedQuantities.includes(cate.id)}
                                        onChange={() => { handleCate(cate.id) }}
                                        className="hidden"
                                    />
                                    <span
                                        className={`custom-checkbox  ${selectedCategories.includes(cate.id) ? 'checked' : ''}`}
                                    >
                                         {selectedCategories.includes(cate.id) && (
                                        <span className="checkmark text-white">
                                            <FaCheck size={10} />
                                        </span>
                                    )}
                                    </span>
                                    <span>{cate.name}</span>
                                </label>
                            ))}
                           <p
                            className="pt-3 cursor-pointer"
                            onClick={() => {
                                setSelectedCategories([]); // Clear all selected ratings
                                onFilter({ category_Id: [] }); // Send an empty array to clear filter
                            }}
                        >
                            Clear all
                        </p>
                        </section>
                    )}
                    </div>
                    <hr className='my-2 border border-[#9F9F9F]' />
                    <div className="py-2">
                        <h3 onClick={() => setIsQuantity(!isQuantity)} className="flex flex-row justify-between items-center text-[#9F9F9F] text-xl font-bazaar mt4"><p>Quantity</p><p>{isQuantity ? <PiCaretUpThin /> : <PiCaretDownThin />}</p></h3>
                        {isQuantity && (
                        <section className="flex flex-col gap-2 py-3 ">
                            {quantity.map((quantitys, index) => (
                                <label key={index} className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedQuantities.includes(quantitys.pack_size)}
                                        onChange={() => { handleQuantity(quantitys.pack_size) }}
                                        className="hidden"
                                    />
                                    <span
                                        className={`custom-checkbox  ${selectedQuantities.includes(quantitys.pack_size) ? 'checked' : ''}`}
                                    >
                                         {selectedQuantities.includes(quantitys.pack_size) && (
                                        <span className="checkmark text-white">
                                            <FaCheck size={10} />
                                        </span>
                                    )}
                                    </span>
                                    <span>{quantitys.pack_size} Pieces</span>
                                </label>
                            ))}
                            <p
                            className="pt-3 cursor-pointer"
                            onClick={() => {
                                setSelectedQuantities([]); // Clear all selected ratings
                                onFilter({ pack_size: [] }); // Send an empty array to clear filter
                            }}
                        >
                            Clear all
                        </p>
                        </section>
                    )}
                    </div>
                    <hr className='my-2 border border-[#9F9F9F]' />
                <div className="py-2">
                    <h3 onClick={() => setIsSize(!isSize)} className="flex flex-row justify-between items-center text-[#9F9F9F] text-xl font-bazaar mt4"><p>Size</p><p>{isSize ? <PiCaretUpThin /> : <PiCaretDownThin />}</p></h3>
                    {isSize && (
                        <section className="flex flex-col gap-2 py-3 ">
                            {size.map((sizes, index) => (
                                <label key={index} className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedSizes.includes(sizes.id)}
                                        onChange={() =>  handleSize(sizes.id) }
                                        className="hidden"
                                    />
                                    <span
                                        className={`custom-checkbox  ${selectedSizes.includes(sizes.id) ? 'checked' : ''}`}
                                    >
                                         {selectedSizes.includes(sizes.id) && (
                                        <span className="checkmark text-white">
                                            <FaCheck size={10} />
                                        </span>
                                    )}
                                    </span>
                                    <span>{sizes.size}</span>
                                </label>
                            ))}
                            <p
                            className="pt-3 cursor-pointer"
                            onClick={() => {
                                setSelectedSizes([]); // Clear all selected ratings
                                onFilter({ size: [] }); // Send an empty array to clear filter
                            }}
                        >
                            Clear all
                        </p>
                        </section>
                    )}
                </div>
                <hr className='my-2 border border-[#9F9F9F]' />
                <div className="py-2">
                    <h3 onClick={() => setIsOption(!isOption)} className="flex flex-row justify-between items-center text-[#9F9F9F] text-xl font-bazaar mt4"><p>Option</p><p>{isOption ? <PiCaretUpThin /> : <PiCaretDownThin />}</p></h3>
                    {isOption && (
                        <section className="flex flex-col gap-2 py-3 ">
                            {option.map((options, index) => (
                                <label key={index} className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedOptions.includes(options.id)}
                                        onChange={() => handleOption(options.id) }
                                        className="hidden"
                                    />
                                    <span
                                        className={`custom-checkbox  ${selectedOptions.includes(options.id) ? 'checked' : ''}`}
                                    >
                                         {selectedOptions.includes(options.id) && (
                                        <span className="checkmark text-white">
                                            <FaCheck size={10} />
                                        </span>
                                    )}
                                    </span>
                                    <span>{options.name}</span>
                                </label>
                            ))}
                            <p
                            className="pt-3 cursor-pointer"
                            onClick={() => {
                                setSelectedOptions([]); // Clear all selected ratings
                                onFilter({ option_id: [] }); // Send an empty array to clear filter
                            }}
                        >
                            Clear all
                        </p>
                        </section>
                    )}
                </div>
                <hr className='my-2 border border-[#9F9F9F]' />
                <div className="py-2">
                    <h3 onClick={() => setRatingCount(!ratingCount)} className="flex flex-row justify-between items-center text-[#9F9F9F] text-xl font-bazaar mt4"><p>Product rating count</p><p>{ratingCount ? <PiCaretUpThin /> : <PiCaretDownThin />}</p></h3>
                    {ratingCount && (
                    <section className="flex flex-col gap-2 py-3">
                        {rating.map((rate, index) => (
                            <label key={index} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedRatings.includes(rate.id)} // Check if this rating is selected
                                    onChange={() => handleRating(rate.id)} // Toggle the rating selection
                                    className="hidden"
                                />
                                <span
                                    className={`custom-checkbox ${selectedRatings.includes(rate.id) ? 'checked' : ''}`}
                                >
                                    {selectedRatings.includes(rate.id) && (
                                        <span className="checkmark text-white">
                                            <FaCheck size={10} />
                                        </span>
                                    )}
                                </span>
                                <span>{rate.name}</span>
                            </label>
                        ))}
                        <p
                            className="pt-3 cursor-pointer"
                            onClick={() => {
                                setSelectedRatings([]); // Clear all selected ratings
                                onFilter({ rating: [] }); // Send an empty array to clear filter
                            }}
                        >
                            Clear all
                        </p>
                    </section>
                    )}
                </div>
            </form >
        </div >
        </div>
    );
};

export default CustomPriceRangeMob;
