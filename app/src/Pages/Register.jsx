"use client";
// import React, { useState, useEffect } from 'react';
// import { FaFacebookF, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
// import axios from '../Utils/axios'; // Adjust path as necessary
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// // import { useGoogleLogin } from '@react-oauth/google';
// // import { GoogleLogin } from '@react-oauth/google';
// import { setAccessToken, setUserData } from '../Utils/storage';
// import { FcGoogle } from 'react-icons/fc';
// import { Image_Url } from '../const';
// // import { useUser } from '../Context/UserContext';
// // import { GoogleLogin } from '@react-oauth/google';



// function Register() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [mobileNumber, setMobileNumber] = useState();
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     // const { setUser } = useUser();


//     const navigate = useNavigate();

//     useEffect(() => {
//         AOS.init({ duration: '500', delay: '0' });
//     }, []);



//     return (
//         <div className="flex items-center md:flex-row flex-col justify-center text-white h-screen container mx-auto py-[470px] md:py-[430px] lg:px-40 px-8">
//             <div
//                 data-aos="fade-left"
//                 className="flex flex-col items-center justify-center md:py-24 py-8 bg-[#1E7773] h-[500px] md:w-2/5 md:rounded-l-3xl w-full"
//             >
//                 <h3 className="text-center text-xl md:text-4xl font-bazaar">Welcome Back!</h3>
//                 <h3 className="text-center p-4 w-80">
//                     To keep connected with us please login with your personal info
//                 </h3>
//                 <Link to='/login' className='mt-6 rounded-lg border-2 border-[#fff] py-2 px-10 pt-3 w40 font-bazaar text-lg text-white duration-300'>LOGIN </Link>
//                 {/* <Link to='/contributor-login' className='md:mb-16 mt-4 rounded-full flex justify-center p-2 px-4 w-58 bg-white font-bold hover:px-10 text-[#272887] duration-500'>Login AS CONTRIBUTOR</Link> */}

//             </div>

//             <div
//                 data-aos="fade-right"
//                 className="relative h-[500px] md:w-3/5 w-full flex md:py-12 bg-[#20202c] py-8 flex-col items-center justify-center border-4 border-[#1E7773] md:rounded-r-3xl"
//             >
//                 <h3 className="text-xl md:text-4xl text-center font-bazaar">Register</h3>
//                 {/* <p>or use your email for registration</p>    */}
//                 <div className="flex items-center mt-2 mb-2">
//                     <hr className="flex-grow w-12 border-t border-gray-400"></hr>
//                     <span className="mx-2 text-white text-lg font-bold">OR</span>
//                     <hr className="flex-grow w-12 border-t border-gray-400"></hr>
//                 </div>
//                 <section className='flex flex-row gap-3 justify-center items-center'>
//                     {/* google auth */}
//                     <div className='relative overflow-hidden'>
//                         <div className='opacity-0 inset-0 absolute cursor-pointer'>
//                             {/* <GoogleLogin onSuccess={handleGoogleLogin} /> */}
//                         </div>
//                         <button className='flex justify-center gap-2 items-center rounded-full p-2 border-2 text-[#1E7773] border-[#1E7773]'>
//                             {/* <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google Icon" className="w-5 h-5 mr-2" /> */}
//                             <FaGoogle size={20} />
//                             {/* <span className='textblack text-md text-white fontbazaar '>Register with Google</span> */}
//                         </button>
//                     </div>
//                     {/* facebook auth */}
//                     <div className='relative overflow-hidden'>
//                         <div className='opacity-0 inset-0 absolute cursor-pointer'>
//                             {/* <GoogleLogin onSuccess={handleGoogleLogin} /> */}
//                         </div>
//                         <button className='flex justify-center gap-2 items-center rounded-full p-2 border-2 text-[#1E7773] border-[#1E7773]'>
//                             {/* <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google Icon" className="w-5 h-5 mr-2" /> */}
//                             <FaFacebookF size={20} />
//                             {/* <span className='textblack text-md text-white fontbazaar '>Register with Google</span> */}
//                         </button>
//                     </div>
//                 </section>
//                 <form
//                     className="md:w-4/5 w-full flex justify-center mx-auto flex-col items-center text-white py-3 gap-3"
//                 // onSubmit={handleSubmit}
//                 >
//                     <input
//                         className="w-4/5 p-2 px-4 border-2 border-[#55555f] bg-transparent rounded-lg "
//                         type="text"
//                         name="name"
//                         placeholder="Name"
//                         required
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                     <input
//                         className="w-4/5 p-2 px-4  border-2 border-[#55555f] bg-transparent  rounded-lg "
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         required
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <div className="w-4/5 flex gap-2">
//                         <input
//                             className="w-full flex-1 p-2 px-4  border-2 border-[#55555f] bg-transparent  rounded-lg "
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             required
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <input
//                             className="w-full flex-1 p-2 px-4  border-2 border-[#55555f] bg-transparent  rounded-lg "
//                             type="password"
//                             name="confirmPassword"
//                             placeholder="Confirm Password"
//                             required
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                         />
//                     </div>
//                     {/* <input
//                         className="w-4/5 p-2 px-4 rounded-lg text-black"
//                         type="tel"
//                         name="mobileNumber"
//                         placeholder="Mobile Number"
//                         required
//                         minLength={11}
//                         maxLength={11}
//                         pattern="\d{11}"
//                         value={mobileNumber}
//                         onChange={(e) => {
//                             const value = e.target.value;
//                             // Only allow numbers and restrict the length to 11 digits
//                             if (/^\d{0,11}$/.test(value)) {
//                                 setMobileNumber(value);
//                             }
//                         }}
//                     /> */}
//                     {/* <input
//                         className="w-4/5 p-2 px-4 rounded-lg text-black"
//                         type="text"
//                         name="coupon_code"
//                         placeholder="Coupon Code"
//                         required
//                         value={coupon_code}
//                         onChange={(e) => setCoupon_Code(e.target.value)}
//                     /> */}
//                     {error && <p className="text-red-500 text-center text-sm">{error}</p>}
//                     {success && <p className="text-green-500 text-center text-sm">{success}</p>}
//                     <button
//                         type="submit"
//                         className="mt-6 rounded-lg bg-[#1E7773] py-2 px-10 pt-3 w40 font-bazaar text-lg text-white duration-300"
//                         disabled={loading}
//                     >
//                         {loading ? 'REGISTERING...' : 'REGISTER'}
//                     </button>
//                 </form>
//                 {/* bgimages */}
//                 <img
//                     // data-aos="fade-down"
//                     className="absolute z-0 top-10 right-0 w-16 hscreen"
//                     src={`${Image_Url}basket.svg`}
//                     alt="bgGradient"
//                 />
//                 <img
//                     // data-aos="fade-down"
//                     className="absolute z-0 top-30 left-0 w-12 hscreen"
//                     src={`${Image_Url}plate.svg`}
//                     alt="bgGradient"
//                 />
//                 <img
//                     // data-aos="fade-down"
//                     className="absolute z-0 bottom-0 right-20 w-20 hscreen"
//                     src={`${Image_Url}FooterAssets/footerCenterImg.svg`}
//                     alt="bgGradient"
//                 />
//             </div>
//             {/* <ToastContainer /> */}
//         </div>
//     );
// }

// export default Register;

import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import axios from '../Utils/axios'; // Adjust path as necessary
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import { setAccessToken, setUserData } from '../Utils/storage';
import { Image_Url } from '../const';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useRouter();

    useEffect(() => {
        AOS.init({ duration: 500, delay: 0 });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
    
        // Basic password confirmation check
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.public.post('signup', {
                name,
                email,
                password,
                password_confirmation: password,
            });
            
            // Check for HTTP status code 200 (success)
            if (response.status === 200 && response.data.status === 'success') {
                setEmail('');
                setName('');
                setPassword('');
                setConfirmPassword('');
                toast.success('Registration successful! Redirecting to login...');
                
                // Navigate to login after a short delay
                setTimeout(() => {
                    navigate('/login/');
                }, 2000);
            } else {
                // Handle unexpected response
                setError(response.data.message || 'Registration failed.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center md:flex-row flex-col  justify-center text-white h-screen container mx-auto py-[530px] m lg:px-40 px-8">
            <div
                data-aos="fade-left"
                className="flex flex-col items-center justify-center md:py-24 py-8 bg-[#1E7773] h-[500px] md:w-2/5 md:rounded-l-3xl w-full"
            >
                <h3 className="text-center text-xl md:text-4xl font-bazaar">Welcome Back!</h3>
                <h3 className="text-center p-4 w-80">
                    To keep connected with us please login with your personal info
                </h3>
                <Link href='/login/' className='mt-6 rounded-lg border-2 border-[#fff] py-2 px-10 pt-3 w40 font-bazaar text-lg text-white duration-300'>LOGIN </Link>
            </div>

            <div
                data-aos="fade-right"
                className="relative h-[500px] md:w-3/5 w-full flex md:py-12 bg-[#20202c] py-8 flex-col items-center justify-center border-4 border-[#1E7773] md:rounded-r-3xl"
            >
                <h3 className="text-xl md:text-4xl text-center font-bazaar">Register</h3>
                {/* <div className="flex items-center mt-2 mb-2">
                    <hr className="flex-grow w-12 border-t border-gray-400"></hr>
                    <span className="mx-2 text-white text-lg font-bold">OR</span>
                    <hr className="flex-grow w-12 border-t border-gray-400"></hr>
                </div>
                <section className='flex flex-row gap-3 justify-center items-center'>
                    <button className='flex justify-center gap-2 items-center rounded-full p-2 border-2 text-[#1E7773] border-[#1E7773]'>
                        <FaGoogle size={20} />
                    </button>
                    <button className='flex justify-center gap-2 items-center rounded-full p-2 border-2 text-[#1E7773] border-[#1E7773]'>
                        <FaFacebookF size={20} />
                    </button>
                </section> */}
                <form
                    className="md:w-4/5 w-full flex justify-center mx-auto flex-col items-center text-white py-3 gap-3"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="w-4/5 p-2 px-4 border-2 border-[#55555f] bg-transparent placeholder-[#55555f] text-white rounded-lg "
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        className="w-4/5 p-2 px-4  border-2 border-[#55555f] bg-transparent  rounded-lg placeholder-[#55555f]"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <div className="w-4/5 flex gap-2">
                        <input
                            className="w-full flex-1 p-2 px-4  border-2 border-[#55555f] bg-transparent  rounded-lg "
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        
                        <input
                            className="w-full flex-1 p-2 px-4  border-2 border-[#55555f] bg-transparent  rounded-lg "
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-center text-sm">{success}</p>}
                    <button
                        type="submit"
                        className="mt-6 rounded-lg cursor-pointer bg-[#1E7773] py-2 px-10 pt-3 w40 font-bazaar text-lg text-white duration-300"
                        disabled={loading}
                    >
                        {loading ? 'REGISTERING...' : 'REGISTER'}
                    </button>
                </form>
                <img
                    className="absolute z-0 top-10 right-0 w-16 hscreen"
                    src={`${Image_Url}basket.svg`}
                    alt="bgGradient"
                />
                <img
                    className="absolute z-0 top-30 left-0 w-12 hscreen"
                    src={`${Image_Url}plate.svg`}
                    alt="bgGradient"
                />
                <img
                    className="absolute z-0 bottom-0 right-20 w-20 hscreen"
                    src={`${Image_Url}FooterAssets/footerCenterImg.svg`}
                    alt="bgGradient"
                />
            </div>
            <ToastContainer autoClose={500} />
        </div>
    );
}

export default Register;
