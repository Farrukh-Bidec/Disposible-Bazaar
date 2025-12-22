"use client";
import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import { Assets_Url, Image_Url, Profile_Assets_Url } from '../../const';
import axios from '../../Utils/axios';

// Sample review data
// const review = [
//   {
//     image: 'Reviews/review4.svg', // Replace with actual image URLs
//     name: 'Carly',
//     client_image: 'Reviews/client1.svg',
//     description: 'Lorem ipsum ispsum ...',
//   },
//   {
//     image: 'Reviews/review1.svg',
//     name: 'John',
//     client_image: 'Reviews/client3.svg',
//     description: 'Lorem ipsum ispsum ...',
//   },
//   {
//     image: 'Reviews/review2.svg',
//     name: 'Mike',
//     client_image: 'Reviews/client1.svg',
//     description: 'Lorem ipsum ispsum ...',
//   },
//   {
//     image: 'Reviews/review3.svg',
//     name: 'Sarah',
//     client_image: 'Reviews/client3.svg',
//     description: 'Lorem ipsum ispsum ...',
//   },
//   {
//     image: 'Reviews/review4.svg', // Replace with actual image URLs
//     name: 'Carly',
//     client_image: 'Reviews/client1.svg',
//     description: 'Lorem ipsum ispsum ...',
//   },
//   {
//     image: 'Reviews/review1.svg',
//     name: 'John',
//     client_image: 'Reviews/client3.svg',
//     description: 'Lorem ipsum ispsum ...',
//   },
//   {
//     image: 'Reviews/review2.svg',
//     name: 'Mike',
//     client_image: 'Reviews/client1.svg',
//     description: 'Lorem ipsum ispsum ...',
//   },
//   {
//     image: 'Reviews/review3.svg',
//     name: 'Sarah',
//     client_image: 'Reviews/client3.svg',
//     description: 'Lorem ipsum ispsum ...',
//   },
// ];



const ReviewSlider = () => {
  const [reviews, setReviews] = useState([])
  const [isloading, setIsLoading] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch categories from the API
        const response = await axios.public.get('all_reviews');
        setReviews(response.data.data)
        console.log('Reviews slider', reviews);

      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchData();
  }, []);
  return (
    <div className="py-12 px-4 text-white">
      <Swiper
        data-aos='fade-up'
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          100: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1100: {
            slidesPerView: 5,
          },
          // width: 220,
        }}
        spaceBetween={0}
        modules={[Autoplay]}
        className="mySwiper"
      >

        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div
              data-aos="fade-up"
              className={`${index % 2 === 0 ? 'mb-10' : 'mt-10'} flex flex-col mx-5 items-center rounded-xl overflow-hidden bg-transparent`}
              style={{
                width: '100%',
                // maxWidth: '300px',
                minHeight: '400px',
              }}
            >
              {/* Main Image Section */}
              <img src={`${Profile_Assets_Url}/${review.image}`} alt="" className='h-[250px] rounded-2xl mb-5 object-fit w-full' />

              {/* Profile and Description Section */}
              <div className=" w-full flex items-center gap-4 mt-2 text-white rounded-b-xl">
                <img className='w-12 h-12 rounded-full' src={review.user ? `${Profile_Assets_Url}/${review.user.photo}` : `https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg`} alt={`${review.name}`} />
                <div>
                  <h2 className="text-xl font-bold">{review.name}</h2>
                  <p className="text-sm">{review.description.slice(0, 50)}...</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default ReviewSlider;
// https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg