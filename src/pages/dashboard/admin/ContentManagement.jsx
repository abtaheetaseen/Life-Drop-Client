import React from 'react'
import SectionTitle from '../../../components/SectionTitle'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { RiDeleteBin6Fill } from 'react-icons/ri'
import Swal from 'sweetalert2'

const ContentManagement = () => {

  const axiosSecure = useAxiosSecure();

  const {data: allBlogs = [], refetch} = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async() => {
      const res = await axiosSecure.get("/blogs");
      return res.data;
    }
  })
  console.log(allBlogs)

  const handleDelete = (blog) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
  }).then((result) => {
      if (result.isConfirmed) {
          axiosSecure.delete(`/blogs/${blog._id}`)
          .then(res => {
              if(res.data.deletedCount > 0){
                  Swal.fire({
                      title: "Deleted!",
                      text: "This Blog has been deleted.",
                      icon: "success"
                  });
                  refetch();
              }
          })
      }
  });
  }

  const handlePublish = (blog) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!"
  }).then((result) => {
      if (result.isConfirmed) {
          axiosSecure.patch(`/blogs/publish/${blog._id}`)
          .then(res => {
              if(res.data.modifiedCount){
                  Swal.fire({
                      title: "Done",
                      text: `You published this blog`,
                      icon: "success"
                  });
                  refetch();
              }
          })
      }
  });
  }

  const handleUnpublish = (blog) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!"
  }).then((result) => {
      if (result.isConfirmed) {
          axiosSecure.patch(`/blogs/draft/${blog._id}`)
          .then(res => {
              if(res.data.modifiedCount){
                  Swal.fire({
                      title: "Done",
                      text: `You unpublished this blog`,
                      icon: "success"
                  });
                  refetch();
              }
          })
      }
  });
  }

  return (
    <>
      <SectionTitle heading={"Publish New Content"} />

      <div className='flex items-center justify-end mb-[50px]'>
        <Link to="/dashboard/add-blog">
        <button className='bg-red-600 border-none hover:bg-red-500 text-white btn btn-sm'>
          Add Blog
        </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Title</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>

        {
          allBlogs?.map(blog => <tr key={blog._id}>
            <td>{blog.title}</td>
            <td>{blog.status}</td>
            <td>
              <button onClick={() => handlePublish(blog)} disabled={blog.status === "published" ? true : false} className='btn btn-xs btn-neutral'>
                Publish
              </button>
            </td>

            <td>
              <button onClick={() => handleUnpublish(blog)} disabled={blog.status === "draft" ? true : false} className='btn btn-xs btn-neutral'>
                Unpublish
              </button>
            </td>

            <td>
              <button onClick={() => handleDelete(blog)} className='btn btn-sm bg-red-600 text-white hover:bg-red-500 border-none'>
              <RiDeleteBin6Fill />
              </button>
            </td>
          </tr>)
        }

    </tbody>
  </table>
</div>
    </>
  )
}

export default ContentManagement
