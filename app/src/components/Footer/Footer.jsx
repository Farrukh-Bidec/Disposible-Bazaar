"use client"
import React, { useEffect, useState } from 'react';
import { Image_Url } from '../../const';
import FooterBottom from './FooterBottom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from '../../Utils/axios';

function Footer() {
    const [visibleItems, setVisibleItems] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage('Please enter a valid email');
            return;
        }

        try {
            setLoading(true);
            setMessage('');
            const response = await axios.public.post('/subscribe', { email });
            setEmail('');
            setMessage('Subscription successful!');
            setTimeout(() => {
               setMessage('') 
            }, 2000);
        } catch (error) {
            setEmail('');
            setMessage(error.response?.data?.message);
            setTimeout(() => {
                setMessage('') 
             }, 2000);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Aos.init({ duration: '2000', delay: '0' });
    }, []);

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setVisibleItems('FooterAssets/footer-bg-Mob.svg'); // Show 2 items on mobile
        } else {
            setVisibleItems('FooterAssets/footer-bg.svg'); // Show 3 items on larger screens
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize(); // Call it once on component mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative bg-[#20202c] pt-20 text-black font-bold flex flex-col justify-center items-center "
            style={{
                backgroundImage: `url('${Image_Url}${visibleItems}')`,
                backgroundSize: 'cover',        // Cover the entire element
                backgroundRepeat: 'no-repeat',  // Prevent repeating the image
                backgroundPosition: 'top',
            }}>
            <img data-aos='fade-up' src={`${Image_Url}FooterAssets/footerCenterImg.svg`} className='absolute w-[80px] md:w-auto -top-6' alt="" />
            {/* <img data-aos='fade-right' src={`${Image_Url}FooterAssets/footerLeftImg.svg`} className='absolute w-[80px] md:w-auto -left-4 top-2 lg:top-32' alt="" /> */}
            {/* <img data-aos='fade-left' src={`${Image_Url}FooterAssets/footerRightImg.svg`} className='absolute w-[80px] md:w-auto -right-4 top-2 lg:top-32' alt="" /> */}

            <div className="py-10 pb-20 w-full md:w-1/2 flex gap-5 text-white flex-col justify-center items-center" data-aos='fade-up'>
                <h3 className='text-4xl md:text-3xl lg:text-6xl font-bazaar '>Subscribe today</h3>
                <p className='w-2/4 text-center font-[400]'>Stay updated with our latest offers, exclusive deals, and exciting news. Subscribe now!</p>
                {/* <form className='flex flex-col justify-center items-center gap-6'>
                    <input className='border border-white bg-transparent p-2 rounded-xl w-72 md:w-96 pl-5 focus:outline-none' type="emai" placeholder='Email address' />
                    <button className='bg-white text-black font-bold p-1 py-2 rounded-lg w-1/2 duration-300'>SUBSCRIBE</button>
                </form> */}
                <form className='flex flex-col justify-center items-center  gap-6' onSubmit={handleSubscribe}>
                    <input
                        className='border border-white bg-transparent p-2 rounded-xl w-72 md:w-96 pl-5 focus:outline-none'
                        type="email"
                        placeholder='Email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className='bg-white cursor-pointer text-black font-bold p-1 py-2 rounded-lg w-1/2 duration-300'
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                    </button>
                    {message && <p>{message}</p>}
                </form>
            </div>
            <p className='border-t w-full'></p>
            <FooterBottom />
<p className='bg-[#1b6b67] w-full text-center py-2 text-white'>
  © {new Date().getFullYear()} 
  <span className="md:text-xl font-[500]"> Disposable Bazaar</span> All Rights Reserved.
</p>
        </div>
    );
}

export default Footer;
