"use client";
import React, { useEffect, useState } from 'react'
import { Image_Url } from '../../const'
import AOS from "aos";
import 'aos/dist/aos.css';
// import { Link } from 'react-router-dom';

function Introduction() {
    const [isRead, setIsRead] = useState(false)

    const para = [
        {
            web: "In the vast world of food packaging, the emphasis on sustainability and safety has never been higher. At Disposable Bazaar, we understand the modern consumer's pulse, marrying the needs of both the environment and convenience to offer a curated range of disposable food packaging products."
        },
        {
            mob: "In the vast world of food packaging, the emphasis on sustainability and safety has never been higher. At Disposable Bazaar, we understand the modern consumer's pulse, marrying the needs of both the environment and convenience to offer a curated range of disposable food packaging products.",
        }
    ]
    // const sentences = para[0].split('. ');

    useEffect(() => {
        AOS.init({ duration: '2000', delay: '0' });
    }, []);

    const data = [
        {
            head: 'Online Disposable Items Store karachi',
            des: 'Every food business, from the quaint corner cafes to bustling street vendors, needs reliable packaging materials. Not just any packaging, but one that ensures the contents remain fresh, untainted, and safe for consumption. Our range of online disposable products, ensuring your culinary creations are delivered to your customers in the best state possible.'
        },
        {
            head: 'Disposable Goods Online Store karachi',
            des: 'Disposable Bazaar stands as a beacon of eco-conscious shopping in a market inundated with the ordinary. Our brand doesn’t just sell products; we endorse a lifestyle of sustainable choices powered by renewable resources. Our curated collection of packaging materials transcends mere functionality; they are a testament to our unwavering commitment towards a greener Earth. In a world grappling with the detrimental impacts of single-use plastics, we offer a sanctuary of eco-friendly alternatives. Our passion for environmental sustainability isn’t a selling point—it’s our promise to you and the planet. Experience a greener shopping journey with Disposable Bazaar, where quality meets conscience.'
        },
        {
            head: 'Food Safety Packaging – A Promise of Quality and Trust',
            des: 'The assurance of food safety cant be stressed enough.We recognize that every morsel or sip taken by your consumers should be free from contaminants and safe.Our food safety packaging standards are uncompromising.With rigorous quality checks, we ensure that every packaging product you receive from Disposable Bazaar meets the highest safety standards.'
        },
        {
            head: 'Online Household and Kitchen Shopping Pakistan',
            des: 'We have a range of our High-Quality Disposable Item. From kitchenware to packaging solutions, our items promise convenience without compromising on quality. Embrace a hassle-free lifestyle with our durable disposables, designed for modern living. Shop with us and experience the perfect blend of quality, functionality, and eco-friendliness, making your shopping journey an epitome of excellence.'
        },
    ]

    return (
        <div className="overflow-hidden relative  text-white md:pt-20 p-5">
            <div data-aos='fade-up' data-aos-duration='3000' className="flex flex-col justify-center items-center sm:gap-5 gap-2 ">
                <h3 className='md:pt-20 pt-0 md:text-6xl text-4xl font-bazaar md:w-3/2 w-11/12 text-center'>Welcome to Disposable Bazaar <br /> Buy Disposable Items Online karachi
                </h3>

            
       {para.map((p, i) => (
    <div key={i} className="w-11/12 flex flex-col items-center">
        <p className="hidden lg:block text-center md:text-lg text-xs w-full">{p.web}</p>
        <p className="lg:hidden block text-center md:text-lg text-xs w-4/5">{p.mob}</p>
    </div>
))}

{isRead && (
    <div className="px-10 flex flex-col gap-10">
        {data.map((d, i) => (
            <div key={i} className="flex flex-col gap-5">
                <h2 className="text-3xl">{d.head}</h2>
                <p>{d.des}</p>
            </div>
        ))}
    </div>
)}

                {/* <Link to='/about-us/'> */}
                <button onClick={() => setIsRead(!isRead)} className='bg-[#1E7773] cursor-pointer md:p-3 p-2 font-bazaar rounded-lg md:text-base md:pt-4 pt-3 text-sm md:px-8 px-4 md:mt-5 '>{isRead ? 'READ LESS' : 'READ MORE'}</button>
               
               
                {/* </Link> */}
            </div>
            {/* <img data-aos='fade-up-right' src={`${Image_Url}HomeAssets/Introduction/intro-img01.svg`} className='absolute md:w-40 w-20 md:top-20 bottom-0 md:left-[200px] -left-4' alt="" /> */}
            {/* <img data-aos='fade-up' src={`${Image_Url}HomeAssets/Introduction/intro-img02.svg`} className='absolute md:w-40 w-20 md:top-10 bottom-0 md:right-[200px] -right-8' alt="" /> */}
            {/* <img data-aos='fade-up-left' src={`${Image_Url}HomeAssets/Introduction/intro-img03.svg`} className='absolute md:w-40 w-20 top-0 md:right-0 -right-2' alt="" /> */}
            <img data-aos='fade-right' src={`${Image_Url}HomeAssets/Introduction/intro-img04.svg`} className='absolute md:w-40 w-20 top-0 left-0' alt="" />
        </div>
    )
}

export default Introduction
