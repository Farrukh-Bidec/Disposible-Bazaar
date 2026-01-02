"use client";
import React, { useEffect, useState } from 'react';
import { Image_Url } from '../src/const';
import { RiFilter3Line } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import BlogSlider from '../src/components/BlogSlider';
import { usePathname } from 'next/navigation';
import axios from '../src/Utils/axios';
import { Loader } from '../src/components/Loader';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';
import CustomDetailSeo from '../src/components/CustomDetailSeo';
import BlogBody from '../src/components/BlogBody';

const BlogDetail = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [blog, setBlog] = useState(null);
  const [recommendedBlogs, setRecomendedBlogs] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const location = usePathname();
  const blogId = location.split("/")[1];
  
  const fetchBlogById = async (blogId) => {
    setIsLoading(true);
    try {
      const response = await axios.public.post(`blogs/s/details`,{
        slug: `${blogId}/`,
      });
      if (response.data.status === "warning") {
        setBlog(null);
        setErrorMessage(response.data.message);
      } else if (response.data.status === "success") {
        setBlog(response.data.data.blog);
        setRecomendedBlogs(response.data.data.recommended_blogs)
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to load blog");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogByCategory = async (categoryId) => {
    setIsLoading(true);
    try {
      const response = await axios.public.get(`blogs/category_wise/${categoryId}`);
      if (response.data.status === "warning") {
        setBlog(null);
        setErrorMessage(response.data.message);
      } else if (response.data.data && response.data.data.length > 0) {
        setBlog(response.data.data[0]);
      }
    } catch (error) {
      console.log("API error:", error);
      setErrorMessage("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchBlogById(blogId);
    }
  }, [blogId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.public.get('product/category');
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  if (isLoading) return <Loader />;
  if (errorMessage) {
    return (
      <div className='bg-[#20202C] min-h-screen flex items-center justify-center'>
        <div className='text-white text-center'>
          <h2 className='text-2xl font-bold mb-4'>Error</h2>
          <p>{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-[#20202C] w-full overflow-x-hidden'>
      <CustomDetailSeo  
        title={blog?.blogSeoMetadata?.meta_title} 
        des={blog?.blogSeoMetadata?.meta_description} 
        focuskey={blog?.blogSeoMetadata?.focus_keyword} 
        canonicalUrl={blog?.blogSeoMetadata?.canonical_url} 
        schema={blog?.blogSeoMetadata?.schema}
      />
      
      {/* Blog Cover */}
      {blog && (
        <div
          className="flex items-end relative   min-h-[550px] text-white w-full"
          style={{
            background: `url('${Image_Url}BlogsSection/BlogCover.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '25rem',
          }}
        >
          <div className='pl-2 md:pl-32 pb-24'>
            <div className='flex gap-2'>
              <p>Categories: {blog.category} -</p> 
              <p>{blog.date}</p>
            </div>
            <h1 className='text-2xl md:text-4xl md:w-2/3'>{blog.title}</h1>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className='w-full mt-16 overflow-x-hidden'>
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-white text-xl flex justify-center items-center bg-[#1E7773] p-2 rounded-full"
          >
            <RiFilter3Line />
          </button>
        </div>
        
        <div className='flex gap-0'>
          {/* Sidebar */}
          <div className='md:ml-10 ml-0 w-full md:w-72 flex-shrink-0'>
            <BlogSidebar
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
              onCategorySelect={fetchBlogByCategory}
              categories={categories}
            />
          </div>

          {/* Blog Content */}
          <div className='text-white p-10 flex-1 min-w-0'>
            {blog ? (
              <div>
                <BlogBody body={blog.body} />
              </div>
            ) : (
              <p>No blog selected yet.</p>
            )}
          </div>
        </div>

        {recommendedBlogs && <BlogSlider blogsCategories={recommendedBlogs} />}
      </div>
    </div>
  );
};

const BlogSidebar = ({ toggleSidebar, isSidebarOpen, onCategorySelect, categories }) => {
  return (
    <div>
      {/* Sidebar Content */}
      <div
        className={`fixed lg:static lg:block top-0 left-0 min-h-screen md:h-auto overflow-y-auto bg-[#33333F] text-white p-4 lg:rounded-lg transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-72`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={toggleSidebar}
            className="text-white text-xl p-2"
          >
            <RxCross2 />
          </button>
        </div>

        {/* Categories Section */}
        <div className="mb-6 p-4 bg-[#33333F] rounded-lg w-full">
          <h2 className="text-lg font-semibold mb-4">CATEGORIES</h2>
          <ul className="h-auto overflow-y-auto max-h-96">
            {categories.map((category) => (
              <li
                key={category.id}
                className="text-base hover:text-gray-400 cursor-pointer border-b border-gray-500 py-4"
                onClick={() => {
                  onCategorySelect(category.id);
                  toggleSidebar();
                }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Share Article Section - Inside Sidebar */}
        <div className="mb-6 p-4 rounded-lg w-full">
          <h3 className='font-bazaar text-xl text-white mb-4'>SHARE ARTICLE</h3>
          <ul className='flex flex-row gap-4'>
            <li className='text-white p-2 rounded-full hover:bg-[#1E7773]'><a aria-label='Facebook' href="https://www.facebook.com/DisposableBazar/"><FaFacebookF /></a></li>
            <li className='text-white p-2 rounded-full hover:bg-[#1E7773]'><a aria-label='Instagram' href="https://www.instagram.com/disposablebazaar/"><FaInstagram /></a></li>
            <li className='text-white p-2 rounded-full hover:bg-[#1E7773]'><a aria-label='Tiktok' href="https://www.tiktok.com/@disposablebazaar"><FaTiktok /></a></li>
            <li className='text-white p-2 rounded-full hover:bg-[#1E7773]'><a aria-label='Youtube' href="https://www.youtube.com/@disposablebazaar"><FaYoutube /></a></li>
          </ul>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed top-0 left-0 w-full h-full z-40 lg:hidden"
        />
      )}
    </div>
  );
};

export default BlogDetail;