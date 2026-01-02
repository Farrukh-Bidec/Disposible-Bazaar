"use client";
import React, { useEffect, useState } from 'react'
import { Image_Url } from '../../const';
// import './animation.css'
import AOS from "aos";
import 'aos/dist/aos.css';

function CircleSlider() {
    const [rotation, setRotation] = useState();
    const [translateLeft, setTranslateLeft] = useState(0);
    const [translateRight, setTranslateRight] = useState(500);

    useEffect(() => {
        AOS.init({ duration: '1000', delay: '0' });
    }, []);


    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const rotateDegree = scrollTop / 10;
        const maxScroll = 0;
        let newTranslateLeft = Math.min(scrollTop / 3 - 500, 0);
        let newTranslateRight = Math.max(scrollTop / 3 - 500, 0);

        if (newTranslateLeft === maxScroll) {
            newTranslateLeft = Math.max(0 - (scrollTop - 1000) / 10, -500);
        }
        if (newTranslateRight === maxScroll) {
            newTranslateRight = Math.min(0 - (scrollTop - 1000) / 10, 500);
        }

        setRotation(rotateDegree + 180);
        setTranslateLeft(newTranslateLeft);
        setTranslateRight(newTranslateRight);

        // console.log('Right :', newTranslateRight);
        // console.log('', scrollTop);
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const optimizedScroll = () => {
        requestAnimationFrame(handleScroll);
    };

    useEffect(() => {
        window.addEventListener('scroll', optimizedScroll);

        return () => {
            window.removeEventListener('scroll', optimizedScroll);
        };
    }, []);
    return (
        <div className="pt-20 md:pt-32">
            <div className="relative w-full md:h-[450px] h-64 flex justify-center items-start" style={{
                backgroundImage: `url('${Image_Url}CircleSliderAssets/sliderBg.svg')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover', // or 'cover' depending on your design
                backgroundRepeat: 'no-repeat',
            }}>
                <img style={{ transform: `rotate(${rotation}deg)` }} className='md:w-60 w-32 ' src={`${Image_Url}CircleSliderAssets/circleLogo.svg`} alt="" />
                {/* <img style={{
                    transform: `translateX(${translateLeft}px)`,
                    transition: 'transform 0.2s ease-out',
                }} className='absolute left-0 md:w-80 w-32 md:-top-28' src={`${Image_Url}CircleSliderAssets/leftImg.svg`} alt="" /> */}
                {/* <img
                    style={{
                        transform: `translateX(${translateRight}px)`,
                        transition: 'transform 0.2s ease-out',
                    }} className='absolute md:-right-20 -right-28 -md:top-16 md:w-80 w-32' src={`${Image_Url}CircleSliderAssets/rightImg.svg`} alt="" /> */}
                <img data-aos='fade-up-right' className='absolute md:left-[350px] left-12 w-16 md:w-fit md:-top-10' src={`${Image_Url}CircleSliderAssets/shoper.svg`} alt="" />
                <img data-aos='fade-right' className='absolute w-16 md:w-fit  md:left-[450px] left-20 md:top-40 top-32' src={`${Image_Url}CircleSliderAssets/plate.svg`} alt="" />
                <img data-aos='fade-up-right' className='absolute w-16 md:w-fit  md:right-[450px] right-16 md:top-40 top-32' src={`${Image_Url}CircleSliderAssets/fork.svg`} alt="" />
                <img data-aos='fade-up-left' className='absolute w-16 md:w-fit  md:right-[350px] right-12 md:-top-12' src={`${Image_Url}CircleSliderAssets/spoon.svg`} alt="" />
            </div>
        </div>
    )
}

export default CircleSlider
