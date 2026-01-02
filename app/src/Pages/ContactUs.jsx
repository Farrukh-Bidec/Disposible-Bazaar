"use client";
import React, { useEffect, useState } from 'react';
import { Image_Url } from '../const';
import Aos from 'aos';
import 'aos/dist/aos.css';
import axios from '../Utils/axios';
import Link from 'next/link';

import CustomHeroSection from '../components/CustomHeroSection';
import { PiWhatsappLogo } from "react-icons/pi";
import { MdEmail } from 'react-icons/md';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { RiTiktokLine, RiTwitterXLine } from 'react-icons/ri';
import { LuFacebook } from 'react-icons/lu';
import { FiYoutube } from 'react-icons/fi';
import CustomSeo from '../components/CustomSeo';

function ContactUs() {
    const [formData, setFormData] = useState({
        first_name: '',
        mobile_no: '',
        email: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        Aos.init({ duration: '2000', delay: '0' });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setStatus('');

        try {
            // Replace 'YOUR_API_URL' with the actual API endpoint
            const response = await axios.public.post('contact_add', formData);

            if (response.status === 200) {
                setStatus('Message sent successfully!');
                setFormData({ first_name: '', mobile_no: '', email: '', message: '' }); // Clear the form
            }
        } catch (err) {
            setError('Failed to send the message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative py-10 flex flex-col justify-center items-center text-white overflow-hidden">
            <CustomSeo id={9} />
            <CustomHeroSection heading='Contact Us' path='Contact Us '  bgImage="CustomHeroAssets/banners.png" />
           
               {/* <div className="flex justify-start items-center text-black relative min-h-[450px]" style={{
                           background: `url('${Image_Url}CustomHeroAssets/banners.png')`,
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                           width: '100%',
                           height: '55rem',
                       }}>
           
           
            <div className='md:w-[50%] md:pl-20 pl-10'>
                    <h3 className='md:text-6xl text-5xl font-bazaar text-white'>Contact Us </h3>

                    <p className='text-lg text-white'><Link href='/'> Home </Link> / Contact Us</p>
                </div>
           </div> */}
            <div className='flex flex-col m-20 mb-0 md:m-0 md:w-1/4  justify-center '>
                <img data-aos='fade-left' src={`${Image_Url}CustomHeroAssets/banners.png`} className='hidden md:block absolute right-0 w-32' alt="" />
                <h3 className='text-3xl text-center -mt-10 font-bold font-bazaar m-4'>Get In Touch</h3>
                <p className='text-center text-sm'>We're here to assist you with any information you need. Let's start a conversation.</p>

                {/* Contact Info */}
                <div className='flex items-center justify-center gap-2 mt-12 pb-12 border-b'>
                    <div className='p-2 bg-[#1E7773] w-fit h-fit rounded-full'><PiWhatsappLogo size={'1.5rem'} /></div>
                    <div className=''>
                        <h3 className='font-bazaar'>Whatsapp</h3>
                        <p className='text-[10px]'>0321-38650002</p>
                    </div>
                    <div className='p-2 ml-8 bg-[#1E7773] h-fit w-fit rounded-full'><MdEmail size={'1.5rem'} /></div>
                    <div className=''>
                        <h3 className='font-bazaar'>E-Mail</h3>
                        <p className='text-[10px]'>info@disposablebazaar.com</p>
                    </div>
                </div>
                <h3 className='font-bazaar text-xl text-center py-5'>Follow Us:</h3>
                <ul className="flex flex-row justify-center gap-3 py3 text-sm cursor-pointer">
                    <li className="bg-[#1E7773] text-white p-2 rounded-full">
                        <a aria-label='Facebook' href="https://www.facebook.com/DisposableBazar/">
                            <LuFacebook className="text-white  text-2xl" />
                        </a>
                    </li>
                    <li className="bg-[#1E7773] text-white p-2 rounded-full">
                        <a aria-label='Instagram' href="https://www.instagram.com/disposablebazaar/">
                            <FaInstagram className="text-white  text-2xl" />
                        </a>
                    </li>
                    <li className="bg-[#1E7773] text-white p-2 rounded-full">
                        <a aria-label='Youtube' href="https://www.youtube.com/@disposablebazaar">
                            <FiYoutube className="text-white  text-2xl" />
                        </a>
                    </li>
                    <li className="bg-[#1E7773] text-white p-2 rounded-full">
                        <a aria-label='Tiktok' href="https://www.tiktok.com/@disposablebazaar">
                            <RiTiktokLine className="text-white  text-2xl" />
                        </a>
                    </li>
                    <li className="bg-[#1E7773] text-white p-2 rounded-full">
                        <a aria-label='Linkedin' href="https://pk.linkedin.com/company/disposablebazaar">
                            <FaLinkedinIn className="text-white  text-2xl" />
                        </a>
                    </li>
                    {/* <li className="bg-[#1E7773] text-white p-2 rounded-full">
                        <RiTwitterXLine className="text-white  text-2xl" />{" "}
                    </li> */}
                </ul>
            </div>

            {/* Form Section */}
            <div className="flex flex-col justify-center items-center my-5 py-16 mx-auto md:w-4/5 w-11/12 min-h-screen">
                <h2 className="text-2xl mb-2 text-[#1E7773] text-center font-bazaar">Contact with us</h2>
                <h3 className="text-5xl mb-4 text-white text-center font-bazaar">Write a Message</h3>
                <form onSubmit={handleSubmit} className="text-white p-6 rounded-lg md:w-4/5 w-11/12">
                    <div className='flex flex-col md:flex-row m-0'>
                        <div className="m-4 md:w-1/2">
                            <label className="block text-xl mb-2">First Name</label>
             <input
    type="text"
    name="first_name"
    value={formData.first_name}
    className="mt-1 block w-full p-2 text-white text-lg border border-gray-300 rounded-lg bg-transparent"
    placeholder='Enter Your Name'
    onChange={(e) => {
        const value = e.target.value;
        // Allow only A–Z and space
        if (/^[A-Za-z ]*$/.test(value)) {
            setFormData({ ...formData, first_name: value });
        }
    }}
    required
/>

                        </div>

                        <div className="m-4 md:w-1/2">
                            <label className="block text-xl mb-2">Mobile Number</label>
                            <input
                                type="number"
                                name="mobile_no"
                                value={formData.mobile_no}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 text-white text-lg border border-gray-300 rounded-lg bg-transparent"
                                placeholder='Enter Your Number'
                                required
                            />
                        </div>
                    </div>

                    <div className="m-4">
                        <label className="block text-xl mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 text-white text-lg border border-gray-300 rounded-lg bg-transparent"
                            placeholder='Enter Your Email'
                            required
                        />
                    </div>

                    <div className="m-4">
                        <label className="block text-xl mb-2">Message</label>
                      <textarea
    name="message"
    value={formData.message}
   onChange={handleChange}
    className="mt-1 block w-full p-2 text-white text-lg border border-gray-300 rounded-lg bg-transparent"
    rows="5"
    placeholder='Write a message'
    required
></textarea>

                    </div>

                    <div className='w-full flex justify-center'>
                        <button
                            type="submit"
                            className={`w-fit py-3 bg-[#1E7773] text-sm mt-6 px-6 text-white rounded-lg transition duration-300 ${loading ? ' cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>

                    {/* Display Success or Error Messages */}
                    {status && <p className="mt-4 text-center text-green-500">{status}</p>}
                    {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default ContactUs;
