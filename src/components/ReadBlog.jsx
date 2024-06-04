import React from 'react'
import { useLoaderData } from 'react-router-dom'
import HTMLToPlainText from './dashboard/HTMLToPlainText';

const ReadBlog = () => {

    const blog = useLoaderData();
    console.log(blog);
    const blogContent = blog.blogContent;
    console.log(blogContent)


  return (
    <div className='flex items-center justify-center my-[100px]'>
<div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <img className="object-cover w-full h-64" src={blog.thumbnail} alt="Article" />

    <div className="p-6">
        <div>
            <h1 className='font-extrabold tracking-wider text-3xl mb-10 mt-5'>{blog.title}</h1>
            {/* <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{blogContent}</p> */}
            <div>
              <HTMLToPlainText blogContent={blogContent}/>
            </div>
        </div>
    </div>
</div>
</div>
  )
}

export default ReadBlog
