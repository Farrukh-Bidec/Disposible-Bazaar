"use client";
import React, { useEffect, useState } from 'react';
import { PiStarFill, PiStarThin } from 'react-icons/pi';
import '../../Pages/Pages.css';
import axios from '../../Utils/axios';
import { Assets_Url, Image_Url, Profile_Assets_Url } from '../../const';

export const Rating = ({ productReview }) => {
    const [getRating, setGetRating] = useState(null);
    const [ratingCounts, setRatingCounts] = useState({});
    // const [personRating, setPersonRating] = useState(62);

    const [images, setImages] = useState([]);

    // Fetch product reviews
    useEffect(() => {
        if (productReview) {
            setGetRating(productReview?.average_rating);
            setRatingCounts(productReview?.rating_counts || {});
            setImages(productReview?.data); // Assuming it's an array
            // console.log(productReview.data[1].image);
            // console.log(images);

        }
    }, [productReview]);

    const totalReviews = Object.values(ratingCounts).reduce((acc, count) => acc + count, 0);

    return (
        <div className="py-5 flex flex-wrap justify-between items-center text-white">
            <section>
                <div className="flex flex-row justify-center gap-2 items-baseline">
                    <h3 className='text-6xl'>
                        {getRating ? Number(getRating).toFixed(1) : 'N/A'}
                    </h3> {/* Display the rating value */}
                    <div className="flex">
                        {/* Render stars based on rating */}
                        {Array(5).fill(0).map((_, index) => (
                            index < getRating ? (
                                <PiStarFill key={index} className="text-4xl text-yellow-500" />
                            ) : (
                                <PiStarThin key={index} className="text-4xl" />
                            )
                        ))}
                    </div>
                </div>
                <p className='text-xl my-2'>Based on {productReview?.total_reviews || totalReviews} Reviews</p>
            </section>

            <section>
                {/* Display the ratings breakdown */}
                {Object.entries(ratingCounts).map(([rating, count], index) => (
                    <div key={index} className="flex flex-row items-center gap-2 my-2">
                        <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                                i < parseInt(rating) ? (
                                    <PiStarFill key={i} className="text-xl text-yellow-500" />
                                ) : (
                                    <PiStarThin key={i} className="text-xl" />
                                )
                            ))}
                        </div>
                        <div className="w-32 h-4 bg-[#20313a] rounded relative">
                            <div
                                style={{ width: `${(count / totalReviews) * 100}%` }}
                                className="absolute h-4 bg-[#1E7773] rounded"
                            ></div>
                        </div>
                        <p>{`(${count})`}</p>
                    </div>
                ))}
            </section>

            <section className='flex flex-wrap w-80 my-10'>
                {/* Display images */}
                {images && images.length > 0 ? (
                    images.slice(0, 6).map((data, index) => (
                        <div key={index}>
                            {data.image ? (
                                <img
                                    className='w-16 h-12 m-1'
                                    src={`${Profile_Assets_Url}/${data.image}`}  // Concatenating the base URL and relative image path
                                    alt={data.name || 'Image'}
                                />
                            ) : (
                                <img src={`${Image_Url}defaultImage.svg`} alt="" className='w-16 h-12 m-1' />
                            )}
                        </div>
                    ))
                ) : (
                    <p>No images to display</p>
                )}
            </section>
        </div>
    );
};
