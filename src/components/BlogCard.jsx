import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = ({blog}) => {
  return (
    <div>
<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img className='h-[200px] w-full lg:h-[250px] md:h-[250px]' src={blog.thumbnail} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{blog.title}</h2>
    <div className="card-actions justify-start">
        <Link to={`/blog/${blog._id}`}>
      <button className="mt-3 btn btn-sm bg-red-600 text-white border-none hover:bg-red-500">Read Blog</button>
      </Link>
    </div>
  </div>
</div>
    </div>
  )
}

export default BlogCard
