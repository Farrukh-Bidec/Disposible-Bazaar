"use client";

import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { PiCaretDownThin, PiCaretUpThin } from "react-icons/pi";
import { FiCornerDownRight } from "react-icons/fi";
import axios from "../../Utils/axios";     
import { useSearchParams } from "next/navigation";

const CustomPriceRange = ({ onFilter }) => {
  const min = 0;
  const max = 100;

  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // <-- replaces useParams()

  const [priceFrom, setPriceFrom] = useState(min);
  const [priceTo, setPriceTo] = useState(max);

  const [selected, setSelected] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [option, setOption] = useState([]);

  const [price, setPrice] = useState(true);
  const [sort, setSort] = useState(true);
  const [cate, setCate] = useState(true);
  const [isSize, setIsSize] = useState(true);
  const [isQuantity, setIsQuantity] = useState(true);
  const [isOption, setIsOption] = useState(true);
  const [ratingCount, setRatingCount] = useState(true);

  const rating = [
    { id: 1, name: "1 Star" },
    { id: 2, name: "2 Star" },
    { id: 3, name: "3 Star" },
    { id: 4, name: "4 Star" },
    { id: 5, name: "5 Star" },
  ];

  // ---------------- FETCH APIS -------------------
  useEffect(() => {
    axios.public.get("product/category").then((res) => {
      setCategories(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.public.get("product/all/size").then((res) => {
      setSize(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.public.get("product/all/option").then((res) => {
      setOption(res.data.data);
    });
  }, []);

  useEffect(() => {
    axios.public.get("product/all/variants").then((res) => {
      setQuantity(res.data.data);
    });
  }, []);

  // ---------------- PRICE FILTER -------------------
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), priceTo - 1);
    setPriceFrom(value);
    onFilter({ price_from: value, price_to: priceTo, selected });
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), priceFrom + 1);
    setPriceTo(value);
    onFilter({ price_from: priceFrom, price_to: value, selected });
  };

  // ---------------- SORTING -------------------
  const handleChange = (value) => {
    setSelected(value);
    onFilter({ selected: value });
  };

  // ---------------- CATEGORY -------------------
  const handleCate = (id) => {
    const updated = selectedCategories.includes(id)
      ? selectedCategories.filter((x) => x !== id)
      : [...selectedCategories, id];

    setSelectedCategories(updated);
    onFilter({ category_Id: updated });
  };

  // ---------------- QUANTITY -------------------
  const handleQuantity = (id) => {
    const updated = selectedQuantities.includes(id)
      ? selectedQuantities.filter((x) => x !== id)
      : [...selectedQuantities, id];

    setSelectedQuantities(updated);
    onFilter({ pack_size: updated });
  };

  // ---------------- SIZE -------------------
  const handleSize = (id) => {
    const updated = selectedSizes.includes(id)
      ? selectedSizes.filter((x) => x !== id)
      : [...selectedSizes, id];

    setSelectedSizes(updated);
    onFilter({ size: updated });
  };

  // ---------------- OPTION -------------------
  const handleOption = (id) => {
    const updated = selectedOptions.includes(id)
      ? selectedOptions.filter((x) => x !== id)
      : [...selectedOptions, id];

    setSelectedOptions(updated);
    onFilter({ option_id: updated });
  };

  // ---------------- RATING -------------------
  const handleRating = (id) => {
    const updated = selectedRatings.includes(id)
      ? selectedRatings.filter((x) => x !== id)
      : [...selectedRatings, id];

    setSelectedRatings(updated);
    onFilter({ rating: updated });
  };

  return (
    <div className="py-4 w-full flex flex-col gap2 text-white rounded-lg">
      <form>
        {/* PRICE */}
        <div className="py-2">
          <h3 className="text-4xl">Filter</h3>
          <h3
            onClick={() => setPrice(!price)}
            className="flex justify-between items-center text-[#9F9F9F] text-xl font-bazaar mt-4"
          >
            <p>Price</p>
            <p>{price ? <PiCaretUpThin /> : <PiCaretDownThin />}</p>
          </h3>

          {price && (
            <section>
              <div className="flex justify-between py-3">
                <h3>{priceFrom}</h3>
                <h3>{priceTo}</h3>
              </div>

              <div className="relative mb-3 h-6">
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={priceFrom}
                  onChange={handleMinChange}
                  className="absolute w-full h-1.5 appearance-none slider-thumb-custom min-thumb"
                />
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={priceTo}
                  onChange={handleMaxChange}
                  className="absolute w-full h-1.5 appearance-none slider-thumb-custom max-thumb"
                />

                <div className="absolute top-0 h-1.5 w-full bg-gray-300 rounded"></div>

                <div
                  className="absolute top-0 h-1.5 bg-[#1E7773] rounded"
                  style={{
                    left: `${((priceFrom - min) / (max - min)) * 100}%`,
                    right: `${100 - ((priceTo - min) / (max - min)) * 100}%`,
                  }}
                ></div>
              </div>

              <div className="w-full flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2">
                  <span>From</span>
                  <div className="p-2 bg-[#1E7773] rounded-md">Rs: {priceFrom}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span>To</span>
                  <div className="p-2 bg-[#1E7773] rounded-md">Rs: {priceTo}</div>
                </div>
              </div>
            </section>
          )}
        </div>

        <hr className="my-2 border border-[#9F9F9F]" />

        {/* SORT */}
        <div className="py-2">
          <h3
            onClick={() => setSort(!sort)}
            className="flex justify-between items-center text-[#9F9F9F] text-xl"
          >
            Sort By
            {sort ? <PiCaretUpThin /> : <PiCaretDownThin />}
          </h3>

          {sort && (
            <section className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected === 1}
                  onChange={() => handleChange(1)}
                  className="hidden"
                />
                <span className={`custom-checkbox ${selected === 1 ? "checked" : ""}`}>
                  {selected === 1 && (
                    <span className="checkmark text-white">
                      <FaCheck size={10} />
                    </span>
                  )}
                </span>
                <span>A to Z</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected === 2}
                  onChange={() => handleChange(2)}
                  className="hidden"
                />
                <span className={`custom-checkbox ${selected === 2 ? "checked" : ""}`}>
                  {selected === 2 && (
                    <span className="checkmark text-white">
                      <FaCheck size={10} />
                    </span>
                  )}
                </span>
                <span>Z to A</span>
              </label>
            </section>
          )}
        </div>

        <hr className="my-2 border border-[#9F9F9F]" />

        {/* CATEGORY */}
        <div className="py-2">
          <h3
            onClick={() => setCate(!cate)}
            className="flex justify-between text-[#9F9F9F] text-xl"
          >
            Products Categories
            {cate ? <PiCaretUpThin /> : <PiCaretDownThin />}
          </h3>

          {cate && (
            <section className="flex flex-col gap-2 py-3">
              {categories.map((cate) => (
                <div key={cate.id}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cate.id)}
                      onChange={() => handleCate(cate.id)}
                      className="hidden"
                    />
                    <span
                      className={`custom-checkbox ${
                        selectedCategories.includes(cate.id) ? "checked" : ""
                      }`}
                    >
                      {selectedCategories.includes(cate.id) && (
                        <span className="checkmark text-white">
                          <FaCheck size={10} />
                        </span>
                      )}
                    </span>
                    <span>{cate.name}</span>
                  </label>

                  {cate.subCategories?.map((sub) => (
                    <label
                      key={sub.id}
                      className="flex items-center gap-3 cursor-pointer ml-6"
                    >
                      <FiCornerDownRight />
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(sub.id)}
                        onChange={() => handleCate(sub.id)}
                        className="hidden"
                      />
                      <span
                        className={`custom-checkbox ${
                          selectedCategories.includes(sub.id) ? "checked" : ""
                        }`}
                      >
                        {selectedCategories.includes(sub.id) && (
                          <span className="checkmark text-white">
                            <FaCheck size={10} />
                          </span>
                        )}
                      </span>
                      <span>{sub.name}</span>
                    </label>
                  ))}
                </div>
              ))}

              <p
                className="pt-3 cursor-pointer"
                onClick={() => {
                  setSelectedCategories([]);
                  onFilter({ category_Id: [] });
                }}
              >
                Clear all
              </p>
            </section>
          )}
        </div>

        <hr className="my-2 border border-[#9F9F9F]" />

        {/* QUANTITY */}
        <div className="py-2">
          <h3
            onClick={() => setIsQuantity(!isQuantity)}
            className="flex justify-between text-[#9F9F9F] text-xl"
          >
            Quantity
            {isQuantity ? <PiCaretUpThin /> : <PiCaretDownThin />}
          </h3>

          {isQuantity && (
            <section className="flex flex-col gap-2 py-3">
              {quantity.map((item, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedQuantities.includes(item.pack_size)}
                    onChange={() => handleQuantity(item.pack_size)}
                    className="hidden"
                  />
                  <span
                    className={`custom-checkbox ${
                      selectedQuantities.includes(item.pack_size) ? "checked" : ""
                    }`}
                  >
                    {selectedQuantities.includes(item.pack_size) && (
                      <span className="checkmark text-white">
                        <FaCheck size={10} />
                      </span>
                    )}
                  </span>
                  <span>{item.pack_size} Pieces</span>
                </label>
              ))}

              <p
                className="pt-3 cursor-pointer"
                onClick={() => {
                  setSelectedQuantities([]);
                  onFilter({ pack_size: [] });
                }}
              >
                Clear all
              </p>
            </section>
          )}
        </div>

        <hr className="my-2 border border-[#9F9F9F]" />

        {/* SIZE */}
        <div className="py-2">
          <h3
            onClick={() => setIsSize(!isSize)}
            className="flex justify-between text-[#9F9F9F] text-xl"
          >
            Size
            {isSize ? <PiCaretUpThin /> : <PiCaretDownThin />}
          </h3>

          {isSize && (
            <section className="flex flex-col gap-2 py-3">
              {size.map((item, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(item.id)}
                    onChange={() => handleSize(item.id)}
                    className="hidden"
                  />
                  <span
                    className={`custom-checkbox ${
                      selectedSizes.includes(item.id) ? "checked" : ""
                    }`}
                  >
                    {selectedSizes.includes(item.id) && (
                      <span className="checkmark text-white">
                        <FaCheck size={10} />
                      </span>
                    )}
                  </span>
                  <span>{item.size}</span>
                </label>
              ))}

              <p
                className="pt-3 cursor-pointer"
                onClick={() => {
                  setSelectedSizes([]);
                  onFilter({ size: [] });
                }}
              >
                Clear all
              </p>
            </section>
          )}
        </div>

        <hr className="my-2 border border-[#9F9F9F]" />

        {/* OPTION */}
        <div className="py-2">
          <h3
            onClick={() => setIsOption(!isOption)}
            className="flex justify-between text-[#9F9F9F] text-xl"
          >
            Option
            {isOption ? <PiCaretUpThin /> : <PiCaretDownThin />}
          </h3>

          {isOption && (
            <section className="flex flex-col gap-2 py-3">
              {option.map((item, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(item.id)}
                    onChange={() => handleOption(item.id)}
                    className="hidden"
                  />
                  <span
                    className={`custom-checkbox ${
                      selectedOptions.includes(item.id) ? "checked" : ""
                    }`}
                  >
                    {selectedOptions.includes(item.id) && (
                      <span className="checkmark text-white">
                        <FaCheck size={10} />
                      </span>
                    )}
                  </span>
                  <span>{item.name}</span>
                </label>
              ))}

              <p
                className="pt-3 cursor-pointer"
                onClick={() => {
                  setSelectedOptions([]);
                  onFilter({ option_id: [] });
                }}
              >
                Clear all
              </p>
            </section>
          )}
        </div>

        <hr className="my-2 border border-[#9F9F9F]" />

        {/* RATING */}
        <div className="py-2">
          <h3
            onClick={() => setRatingCount(!ratingCount)}
            className="flex justify-between text-[#9F9F9F] text-xl"
          >
            Product rating count
            {ratingCount ? <PiCaretUpThin /> : <PiCaretDownThin />}
          </h3>

          {ratingCount && (
            <section className="flex flex-col gap-2 py-3">
              {rating.map((rate, index) => (
                <label key={index} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rate.id)}
                    onChange={() => handleRating(rate.id)}
                    className="hidden"
                  />
                  <span
                    className={`custom-checkbox ${
                      selectedRatings.includes(rate.id) ? "checked" : ""
                    }`}
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
                  setSelectedRatings([]);
                  onFilter({ rating: [] });
                }}
              >
                Clear all
              </p>
            </section>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomPriceRange;
