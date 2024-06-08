import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosPublic from '../hooks/useAxiosPublic'
import SectionTitle from '../components/SectionTitle';
import BlogCard from '../components/BlogCard';
import { Helmet } from 'react-helmet-async';

const Blog = () => {

  const axiosPublic = useAxiosPublic();

  const {data: publishedBlogs = []} = useQuery({
    queryKey: ["publishedBlogs"],
    queryFn: async() => {
      const res = await axiosPublic.get("/publishedBlogs");
      return res.data;
    }
  })
  console.log(publishedBlogs)

  return (
    <>
        <Helmet>
        <title>LIFE-DROP | BLOGS</title>
    </Helmet>
      <SectionTitle heading={"Published Blogs"} />

<div className='flex items-center justify-center mb-[70px]'>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10'>
        {
          publishedBlogs?.map(blog => <BlogCard blog={blog} key={blog._id} />)
        }
      </div>
      </div>
    </>
  )
}

export default Blog
