"use client";
import React, { useEffect, useState } from 'react'
import { Image_Url, Profile_Assets_Url } from '../const'
import Aos from 'aos';
import 'aos/dist/aos.css';
import ReviewSlider from '../components/Reviews/ReviewSlider';
import { Rating } from '../components/Reviews/Rating';
import { motion } from 'framer-motion';   // ✅ FIXED HERE
import { CiSearch } from 'react-icons/ci';
import { PiStarFill } from 'react-icons/pi';
import { VscShare } from 'react-icons/vsc';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import axios from '../Utils/axios';
import CustomSeo from '../components/CustomSeo';


const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [isloading, setIsLoading] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.public.get('all_reviews');
                setReviews(response.data);
                setFilteredReviews(response.data.data);

                if (response.data.rating_counts) {
                    const ratingCounts = response.data.rating_counts;
                    const totalPoints = Object.entries(ratingCounts).reduce((sum, [rating, count]) => {
                        return sum + (parseFloat(rating) * count);
                    }, 0);

                    const totalReviews = Object.values(ratingCounts).reduce((sum, count) => sum + count, 0);

                    const average = totalReviews > 0 ? (totalPoints / totalReviews) : 0;
                    setAverageRating(average.toFixed(1));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        Aos.init({ duration: '2000', delay: '0' });
    }, []);

    return (
        <div>
            <CustomSeo id={4} />
            <div className='relative mb-12 py-30'>
                <div className="flex justify-center items-center text-black relative min-h-[500px]  "
                    style={{
                        background: `url('${Image_Url}CustomHeroAssets/banners.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: '25rem',
                        
                    }}>
                    <div className='md:w-[45%] md:pl-30 pl-10 '>
                        <h1 className='md:text-6xl text-5xl md:mr-30 text-center font-bazaar text-white'>
                            Our Story Through Your Words
                        </h1>
                        <div className='flex justify-center items-center gap-2 mt-4 md:mr-30'>
                            <p className='text-lg font-medium text-white'>{reviews.total_reviews_count} + Reviews </p>
                            <span className='text-lg text-white'>|</span>
                            <p className='text-lg font-medium text-white'>Average of {averageRating} star</p>
                        </div>
                    </div>

                    <img data-aos='fade-down' src={`${Image_Url}CustomHeroAssets/glass.svg`}
                        className='absolute top-6 md:right-36 right-0 w-25' alt="" />
              
                    <img data-aos='fade-up' src={`${Image_Url}CustomHeroAssets/basket.svg`}
                        className='absolute hidden md:block bottom-16 right-[30rem] w-25' alt="" />
                </div>

                <div className='absolute -bottom-55 w-full'>
                    <ReviewSlider />
                </div>
            </div>

            <div className='mt-80 px-4 md:px-14'>
                <Rating productReview={reviews} readOnly={true} />
            </div>

            <ReviewFilter setFilteredReviews={setFilteredReviews} filteredReviews={filteredReviews} />

            <ReviewStatement filteredReviews={filteredReviews} setFilteredReviews={setFilteredReviews} />

        </div>
    )
}

export default Reviews

function ReviewStatement({ filteredReviews, setFilteredReviews }) {

    const handleLike = async (reviewId) => {
        try {
            const response = await axios.protected.post(`reviews/${reviewId}/like`, {
                is_like: 1,
            });
            if (response.status === 200) {
                setFilteredReviews(prevReviews =>
                    prevReviews.map(review =>
                        review.id === reviewId ? { ...review, likes_count: response.data.likes_count, dislikes_count: response.data.dislikes_count } : review
                    )
                );
            }
        } catch (error) {
            console.error("Error liking review:", error);
        }
    };

    const handleDislike = async (reviewId) => {
        try {
            const response = await axios.protected.post(`reviews/${reviewId}/like`, {
                is_like: 0,
            });
            if (response.status === 200) {
                setFilteredReviews(prevReviews =>
                    prevReviews.map(review =>
                        review.id === reviewId ? { ...review, dislikes_count: response.data.dislikes_count, likes_count: response.data.likes_count } : review
                    )
                );
            }
        } catch (error) {
            console.error("Error disliking review:", error);
        }
    };

    return (
        <div className="mx-12 my-20 border-t border-[#9F9F9F]">
            {filteredReviews.map((review, index) => (
                <div key={index} className="py-10 border-b border-[#9F9F9F]">
                    <div className="flex justify-start items-center">
                        <img
                            className='w-16 h-16 rounded-full'
                            src={review.user ? `${Profile_Assets_Url}/${review.user.photo}` : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`} alt={`${review.name}`}
                        />
                        <div className="ml-4 text-white">
                            <h2 className="text-2xl">{review.name}</h2>
                            <p className="text-md text-[#9F9F9F]">{review.created_at.slice(0, 10).split('-').join('/')}</p>
                        </div>
                    </div>
                    <div className="flex gap-1 pt-2">
                        {[...Array(review.rating)].map((_, i) => (
                            <PiStarFill key={i} className="text-yellow-500" size={'1.3rem'} />
                        ))}
                    </div>
                    <p className="text-xl text-white my-6">{review.description}</p>

                    <div className="flex justify-between">
                        <div className="flex items-center gap-2 text-white text-xl">
                            <VscShare />
                            <h2>Share</h2>
                        </div>

                        <div className="flex items-center gap-2 text-white text-xl">
                            <h2 className='hidden md:block'>Was this helpful?</h2>
                            <AiFillLike onClick={() => handleLike(review.id)} />
                            <span>{review.likes_count}</span>
                            <AiFillDislike onClick={() => handleDislike(review.id)} />
                            <span>{review.dislikes_count}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ReviewFilter({ setFilteredReviews, filteredReviews }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('Most Recent');

    const filters = ['Most Recent', 'Highest Rated', 'Lowest Rated'];

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectFilter = (filter) => {
        setSelectedFilter(filter);
        setIsOpen(false);
        filterReviewsBy(filter);
    };

    const filterReviewsBy = (filter) => {
        let sortedReviews = [...filteredReviews];

        switch (filter) {
            case 'Most Recent':
                sortedReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                break;
            case 'Highest Rated':
                sortedReviews.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
                break;
            case 'Lowest Rated':
                sortedReviews.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
                break;
        }

        setFilteredReviews(sortedReviews);
    };

    return (
        <div className='md:mx-16 mx-4 text-white'>
            <div className='flex w-52 text-3xl text-[#1E7773] gap-4 border-b border-[#1E7773] font-medium p-4'>
                <h3>Review</h3>
                <h3>{filteredReviews.length}</h3>
            </div>

            <div className='flex flex-col md:flex-row flex-wrap justify-between mx-0 md:mx-2 mt-4 md:mt-12'>
                <div className='w-full md:w-auto'>
                    <h2 className='text-[#9F9F9F]'>Filter Review</h2>
                    <div className='flex items-center border border-[#9F9F9F] rounded-lg mt-2 px-2'>
                        <CiSearch />
                        <input
                            type="text"
                            placeholder='Search Review'
                            className='w-full md:w-[300px] p-2 bg-transparent text-[#9F9F9F] focus:outline-none'
                            onChange={(e) => {
                                const searchValue = e.target.value.toLowerCase();
                                if (Array.isArray(filteredReviews)) {
                                    const newFilteredReviews = filteredReviews.filter(review =>
                                        review.name.toLowerCase().includes(searchValue) ||
                                        review.title_of_review.toLowerCase().includes(searchValue) ||
                                        review.description.toLowerCase().includes(searchValue)
                                    );
                                    setFilteredReviews(newFilteredReviews);
                                }
                            }}
                        />
                    </div>
                </div>

                <div className="relative inline-block text-left mt-4 md:mt-0">
                    <button
                        type="button"
                        className="inline-flex justify-between items-center w-full md:w-auto px-6 py-3 text-sm font-medium text-gray-400 bg-transparent border border-gray-500 rounded-md shadow-sm focus:outline-none"
                        onClick={toggleDropdown}
                    >
                        {selectedFilter}
                        <span className='ml-2'>|</span>
                        <svg
                            className={`w-5 h-5 ml-2 -mr-1 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 8l4 4 4-4" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute z-10 right-0 mt-2 w-full md:w-full origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                            <div className="py-1">
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        onClick={() => selectFilter(filter)}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
