// "use client";
// import React, { useEffect, useState } from 'react';
// import { Image_Url } from '../const';
// import { RiFilter3Line } from 'react-icons/ri';
// import { RxCross2 } from 'react-icons/rx';
// import BlogSlider from '../components/BlogSlider';
// import { usePathname } from 'next/navigation';
// import axios from '../Utils/axios';
// import { Loader } from '../components/Loader';
// import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
// import { RiTwitterXLine } from 'react-icons/ri'
// import CustomDetailSeo from '../components/CustomDetailSeo';
// import BlogBody from '../components/BlogBody';
// import ErrorPage from './ErrorPage';

// export const BlogDetail = () => {
 

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [blog, setBlog] = useState(null);
//   const [recommendedBlogs, setRecomendedBlogs] = useState(null)
//   const [showFullContent, setShowFullContent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // New state for loading
//   const [errorMessage, setErrorMessage] = useState(false); // New state for loading


//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };



//   const location = usePathname();

    

// const blogId = location.split("/")[2];
//   const fetchBlogById = async (blogId) => {
//     setIsLoading(true); // Start loading
//     try {
//       const response = await axios.public.post(`blogs/s/details`,{
//         slug: `${blogId}/`,
//     });
//     if (response.data.status === "warning") {
//       // Blog not found case
//       setBlog(null);
//       setErrorMessage(response.data.message); // optional
//     } else if (response.data.status === "success") {
//       // Update to access the correct path
//       setBlog(response.data.data.blog);
//       setRecomendedBlogs(response.data.data.recommended_blogs)
//     }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

 
// const fetchBlogByCategory = async (categoryId) => {
//   setIsLoading(true);
//   try {
//     const response = await axios.public.get(`blogs/category_wise/${categoryId}`);

//     if (response.data.status === "warning") {
    
//       setBlog(null);
//       setErrorMessage(response.data.message); // optional
//     } else if (response.data.data && response.data.data.length > 0) {
//       setBlog(response.data.data[0]);
//     }
//   } catch (error) {
//     console.log("API error:", error);
//     setErrorMessage("Something went wrong, please try again later.");
//   } finally {
//     setIsLoading(false);
//   }
// };


//   useEffect(() => {
//     if (blogId) {
//       fetchBlogById(blogId);
//     }
//   }, [blogId]);


//   useEffect(() => {
//     const fetchCategories = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.public.get('product/category');
//         setCategories(response.data.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Toggle between showing full content or a truncated version
//   const toggleContent = () => {
//     setShowFullContent(!showFullContent);
//   };
//   if (isLoading) return <Loader />;
//   if (errorMessage) {
//     return <ErrorPage message={errorMessage} />;
//   }
//   return (
//     <div className='bg-[#20202C]'>
//       <CustomDetailSeo  title={blog?.blogSeoMetadata?.meta_title} des={blog?.blogSeoMetadata?.meta_description} focuskey={blog?.blogSeoMetadata?.focus_keyword} canonicalUrl={blog?.blogSeoMetadata?.canonical_url} schema={blog?.blogSeoMetadata?.schema}/>
//       {/* Blog Cover */}
//       {errorMessage ? (
//       <ErrorPage message={errorMessage} />
//     ) : (
//       blog && (
//         <div
//           className="flex items-end relative mt-24 min-h-[550px] text-white"
//           style={{
//             background: `url('${Image_Url}BlogsSection/BlogCover.svg')`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             width: '100%',
//             height: '25rem',
//           }}
//         >
//           <div className='pl-2 md:pl-32 pb-24'>
//             <div className='flex'>
//               <p>Categories: {blog.category} -</p> <p>{blog.date}</p>
//             </div>
//             <h1 className='text-2xl md:text-4xl md:w-2/3'>{blog.title}</h1>
//           </div>
//         </div>
//       ))}

//       {/* Main Content */}
//       <div className='w-full mt-16'>
//         <div className="lg:hidden flex justify-end p-4">
//           <button
//             onClick={toggleSidebar}
//             className="text-white text-xl flex justify-center items-center bg-[#1E7773] p-2 rounded-full"
//           >
//             <RiFilter3Line />
//           </button>
//         </div>
//         <div className='flex'>
//           {/* Sidebar */}
//           <div className='md:ml-10 ml-0 w-full md:w-72'>
//             <BlogSidebar
//               toggleSidebar={toggleSidebar}
//               isSidebarOpen={isSidebarOpen}
//               onCategorySelect={fetchBlogByCategory} // Pass category selection handler
//               categories={categories}
//             />
//           </div>

//           {/* Blog Content */}
//           <div className='text-white p-10'>
//             {blog ? (
//               <div>
//                 <div
            
//                 />
//                 <BlogBody body={blog.body} />
        
//               </div>
//             ) : (
//               <p>No blog selected yet.</p>
//             )}
//           </div>
//         </div>

//         <BlogSlider blogsCategories={recommendedBlogs} />
//       </div>
//     </div>
//   );
// };


// export const BlogSidebar = ({ toggleSidebar, isSidebarOpen, onCategorySelect, categories }) => {
//   return (
//     <div>
//       {/* Sidebar Content */}
//       <div
//         className={`fixed lg:static lg:block top-0 left-0  min-h-screen md:h-auto overflow-y-auto bg-[#33333F] text-white p-4 lg:rounded-lg transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//           } lg:translate-x-0`}
//       >
//         {/* Close button for mobile */}
//         <div className="lg:hidden flex justify-end">
//           <button
//             onClick={toggleSidebar}
//             className="text-white text-xl p-2"
//           >
//             <RxCross2 />
//           </button>
//         </div>

//         {/* Categories Section */}
//         <div className="mb-6 p-4 h-96 bg-[#33333F] rounded-lg w-full">
//           <h2 className="text-lg font-semibold mb-4">CATEGORIES</h2>
//           <ul className="h-[500px] lg:h-auto overflow-y-auto">
//             {categories.map((category) => (
//               <li
//                 key={category.id}
//                 className="text-base hover:text-gray-400 cursor-pointer border-b border-gray-500 py-4"
//                 onClick={() => onCategorySelect(category.id)} // Pass selected category ID
//               >
//                 {category.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Share Article Section */}
//       <div className="hidden md:block mb-6 p-4 rounded-lg w-full justify-center items-center">
//         <h3 className='font-bazaar text-xl text-white mr-4'>SHARE ARTICLE</h3>
//         <ul className='flex flex-row justify-center gap-4'>
//           <li className='text-white p-2 rounded-full'><a href="https://www.facebook.com/DisposableBazar/"><FaFacebookF /></a></li>
//           <li className='text-white p-2 rounded-full'><a href="https://www.instagram.com/disposablebazaar/"><FaInstagram /></a></li>
//           <li className='text-white p-2 rounded-full'><a href="https://www.tiktok.com/@disposablebazaar"><FaTiktok /></a></li>
//           <li className='text-white p-2 rounded-full'><a href="https://www.youtube.com/@disposablebazaar"><FaYoutube /></a></li>
//           {/* <li className='text-white p-2 rounded-full'><RiTwitterXLine /></li> */}
//         </ul>
//       </div>

//       {/* Overlay for mobile when sidebar is open */}
//       {isSidebarOpen && (
//         <div
//           onClick={toggleSidebar}
//           className="fixed top-0 left-0 w-full h-full  z-40 lg:hidden"
//         />
//       )}
//     </div>
//   );
// };
