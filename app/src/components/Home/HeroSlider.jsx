"use client";
import React, { useEffect, useState } from 'react';
// import "../Custom.css";
import "../../../globals.css";


import { Image_Url } from '../../const';
// import { Link } from 'react-router-dom';

function HeroSlider() {
  const slides = [
    {
      img: "HomeAssets/HeroSecton/Banner1.png",
      heading1Part1: "Elevate Your",
      heading1Part2: "Disposable Needs",
      heading2: "Quality you can trust, delivered to your doorstep",
      heading3:
        "Explore our wide range of eco-friendly disposable products perfect for every occasion.",
    },
    {
      img: "HomeAssets/HeroSecton/Banner2.png",
      heading1Part1: "Elevate Your",
      heading1Part2: "Disposable Needs",
      heading2: "Quality you can trust, delivered to your doorstep",
      heading3:
        "Explore our wide range of eco-friendly disposable products perfect for every occasion.",
    },
    {
      img: "HomeAssets/HeroSecton/Banner3.png",
      heading1Part1: "Elevate Your",
      heading1Part2: "Disposable Needs",
      heading2: "Quality you can trust, delivered to your doorstep",
      heading3:
        "Explore our wide range of eco-friendly disposable products perfect for every occasion.",
    },
    {
      img: "HomeAssets/HeroSecton/Banner4.png",
      heading1Part1: "Elevate Your",
      heading1Part2: "Disposable Needs",
      heading2: "Quality you can trust, delivered to your doorstep",
      heading3:
        "Explore our wide range of eco-friendly disposable products perfect for every occasion.",
    },
    {
      img: "HomeAssets/HeroSecton/Banner5.png",
      heading1Part1: "Elevate Your",
      heading1Part2: "Disposable Needs",
      heading2: "Quality you can trust, delivered to your doorstep",
      heading3:
        "Explore our wide range of eco-friendly disposable products perfect for every occasion.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
 

 

 

   useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const currentBg = slides[currentSlide].img;

  return (
  //   <div className="relative w-screen h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
  //   {slides.map((slide, index) => (
  //     <div
  //       key={index}
  //       className={`slide ${currentSlide === index ? 'current' : 'animateOut'} `}
  //       style={{
  //         backgroundImage: `url('${Image_Url}${visibleItems}')`,
  //         backgroundPosition: 'center',
  //         backgroundSize: 'cover',
  //         backgroundRepeat: 'no-repeat',
  //       }}
  //     >
  //       <div className={`heading absolute h-full items-center text-center z-20 lg:text-start top-0 left-0 w-full md:w-[800px] mt-10 md:mt-0 px-14 md:px-0 p-6 md:p-12 lg:p-24 text-[#20202c]`}>
  //         <h3 className='text-3xl md:text-5xl lg:text-6xl font-bazaar fontbold mb-6 md:mb8 lg:mb12'>
  //           {slide.heading1Part1} <br /> {slide.heading1Part2}
  //         </h3>
  //         <h2 className='font-semibold mb-2 text-md md:text-xl  lg:text-xl'>{slide.heading2}</h2>
  //         <h2 className='text-xs lg:text-md lg:w-3/4 mb-4'>{slide.heading3}</h2>
  //         <Link to='/shop'>
  //         <button className='px-4 py-2 md:px-6 md:py-3 bg-[#1e7773] font-bazaar rounded-xl text-white text-sm md:text-base '>Explore Products</button>
  //         </Link>
  //       </div>
  //       <div className='absolute w-full h-full top-0 left-0'>
  //         <img src={`${Image_Url}HomeAssets/HeroSecton/emptycup.svg`} alt="" className='emptyCup hidden lg:block absolute w-[200px] md:w-[250px] right-[37%] -top-10' />
  //         <img src={`${Image_Url}HomeAssets/HeroSecton/basket.svg`} alt="" className='Basket hidden lg:block absolute right-[15%] top-[25%] md:top-[15%]' />
  //         <img src={`${Image_Url}HomeAssets/HeroSecton/box.svg`} alt="" className='Box hidden lg:block absolute right-[40%] bottom-[10%] md:bottom-[40%]' />
  //         <img src={`${Image_Url}HomeAssets/HeroSecton/cup.svg`} alt="" className='Cup hidden lg:block absolute w-[300px] md:w-[550px] right-[13%] -bottom-10' />
  //         <img src={`${Image_Url}HomeAssets/HeroSecton/plate.svg`} alt="" className='Plate hidden lg:block absolute w-[150px] md:w-[280px] -right-20 top-[20%] md:top-[15%]' />
  //         <img src={`${Image_Url}HomeAssets/HeroSecton/shoper.svg`} alt="" className='Shopper hidden lg:block absolute right-[10%] bottom-[15%] md:right-[15%] md:bottom-[25%]' />

  //         <img src={`${Image_Url}HomeAssets/HeroSecton/emptycup.svg`} alt="" className='emptyCup block lg:hidden absolute w-[200px] md:w-[250px] -right-32 -top-10' style={{ transform: 'rotate(-100deg)' }}/>
  //         <img src={`${Image_Url}HomeAssets/HeroSecton/basket.svg`} alt="" className='Basket block lg:hidden absolute w-20 -left-10 bottom-0' />
  //         <img src={`${Image_Url}HomeAssets/HeroSecton/box.svg`} alt="" className='Box block lg:hidden absolute -left-6 top-0 w-16' />
  //         <img src={`${Image_Url}HomeAssets/HeroSecton/cup.svg`} alt="" className='Cup block lg:hidden absolute z-10 w-[250px] -right-20 -bottom-2' />
  //         <img src={`${Image_Url}HomeAssets/HeroSecton/plate.svg`} alt="" className='Plate block lg:hidden absolute w-[150px] md:w-[280px] -left-20 top-[20%] md:top-[15%]' style={{ transform: 'rotate(-180deg)' }}/>
  //         <img src={`${Image_Url}HomeAssets/HeroSecton/shoper.svg`} alt="" className='Shopper block lg:hidden absolute w-16 right-16 bottom-[5%]' />
          
  //       </div>
  //     </div>
  //   ))}
  // </div>
<div
  className="relative w-screen h-[90vh] overflow-hidden"
>
  {slides.map((slide, index) => (
    
 

    <div
      key={index}
      className={` 2xl-w[2300px] absolute bgcontain 3xl:h-[900px] 4xl:h-[1200px]  pt-16 lg: bg-cover lg:bg-right bg-center top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
        index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
      }`}
      style={{
       
        backgroundImage: `url('${Image_Url}${slide.img}')`,
        backgroundPosition: "right top 22px",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    ></div>

   

  ))}

  {/* Overlay text (stays on top) */}
  <div className="absolute inset-0 flex flex-col justify-center items-center lg:items-start z-30 lg:w-[800px] p-6 md:p-12 lg:p-24 text-white">
    <h3 className="text-3xl md:text-5xl lg:text-6xl font-bazaar font-bold mb-6 text-center lg:text-left">
      {slides[currentSlide].heading1Part1} <br /> {slides[currentSlide].heading1Part2}
    </h3>
    <h2 className="font-semibold text-md md:text-xl lg:text-xl text-center lg:text-left">
      {slides[currentSlide].heading2}
    </h2>
    <h2 className="text-xs lg:text-lg lg:w-3/4 my-4 text-center lg:text-left">
      {slides[currentSlide].heading3}
    </h2>
  </div>
</div>

  
  );
}

export default HeroSlider;


// import React, { useEffect, useState } from 'react';
// import "../Custom.css";
// import { Image_Url } from '../../const';
// import { Link } from 'react-router-dom';

// function HeroSlider() {
//   const slides = [
//     {
//       img: "HomeAssets/HeroSecton/Banner1.png",
//       heading1Part1: "Elevate Your",
//       heading1Part2: "Disposable Needs",
//       heading2: "Quality you can trust, delivered to your doorstep",
//       heading3:
//         "Explore our wide range of eco-friendly disposable products perfect for every occasion.",
//     },
//     {
//       img: "HomeAssets/HeroSecton/Banner2.png",
//       heading1Part1: "Elevate Your",
//       heading1Part2: "New Collection",
//       heading2: "Reliable products, right at your doorstep",
//       heading3:
//         "Discover our diverse selection of eco-friendly products, tailored for every occasion.",
//     },
    
//     {
//       img: "HomeAssets/HeroSecton/Banner3.png",
//       heading1Part1: "Elevate Your",
//       heading1Part2: "New Collection",
//       heading2: "Reliable products, right at your doorstep",
//       heading3:
//         "Discover our diverse selection of eco-friendly products, tailored for every occasion.",
//     },
//     ,
//     {
//       img: "HomeAssets/HeroSecton/Banner4.png",
//       heading1Part1: "Elevate Your",
//       heading1Part2: "New Collection",
//       heading2: "Reliable products, right at your doorstep",
//       heading3:
//         "Discover our diverse selection of eco-friendly products, tailored for every occasion.",
//     },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const slide = slides[currentSlide]; // Only current slide data

//   return (
//     <div
//       className="relative w-screen h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden transition-all duration-700 ease-in-out"
//       style={{
//         backgroundImage: `url('${Image_Url}${slide.img}')`,
//         backgroundPosition: "center",
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       {/* Overlay content (always same position) */}
//       <div className="absolute inset-0 flex flex-col justify-center items-center lg:items-start z-20 lg:w-[800px] p-6 md:p-12 lg:p-24">
//         <h3 className="text-3xl md:text-5xl lg:text-6xl font-bazaar font-bold mb-6 text-center lg:text-left text-white">
//           {slide.heading1Part1} <br /> {slide.heading1Part2}
//         </h3>

//         <h2 className="font-semibold text-md md:text-xl lg:text-xl text-center lg:text-left text-white">
//           {slide.heading2}
//         </h2>

//         <h2 className="text-xs lg:text-lg lg:w-3/4 my-4 text-center lg:text-left text-white">
//           {slide.heading3}
//         </h2>

//         <Link to="/shop/">
//           <button className="px-4 py-2 md:px-6 md:py-3 bg-[#1e7773] font-bazaar rounded-xl text-white text-sm md:text-base">
//             Explore Products
//           </button>
//         </Link>
//       </div>

      
//     </div>
//   );
// }

// export default HeroSlider;
