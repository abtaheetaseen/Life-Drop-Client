import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useVolunteer from '../../../hooks/useVolunteer';
import SectionTitle from '../../../components/SectionTitle';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const VolunteerContentManagement = () => {

  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext);

  const {data: allBlogs = []} = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async() => {
      const res = await axiosSecure.get("/blog");
      return res.data;
    }
  })
  console.log(allBlogs)

  const {data: currentUser = []} = useQuery({
    queryKey: ["profileUser", user?.email],
    queryFn: async() => {
        const res = await axiosSecure.get(`/users?email=${user?.email}`)
        console.log(res.data)
        return res.data;
    }
})
console.log(currentUser)

  return (
    <>
      <SectionTitle heading={"Publish Content"} />

      <div className='flex items-center justify-end mb-[50px]'>
        <Link to="/dashboard/volunteer-add-blog">
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
              <button disabled={currentUser?.role === "volunteer" ? true : false} className='btn btn-xs btn-neutral'>
                Publish
              </button>
            </td>

            <td>
              <button disabled={currentUser?.role === "volunteer" ? true : false} className='btn btn-xs btn-neutral'>
                Unpublish
              </button>
            </td>

            <td>
              <button disabled={currentUser?.role === "volunteer" ? true : false}  className='btn btn-sm bg-red-600 text-white hover:bg-red-500 border-none'>
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

export default VolunteerContentManagement
