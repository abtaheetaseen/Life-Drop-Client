import { useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
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
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const { data: blog = [], refetch } = useQuery({
    queryKey: ["all-blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blog");
      setAllBlogs(res?.data);
      setFilteredData(res?.data);
      return res?.data;
    }
  })

  const {data: currentUser = []} = useQuery({
    queryKey: ["profileUser", user?.email],
    queryFn: async() => {
        const res = await axiosSecure.get(`/users?email=${user?.email}`)
        console.log(res.data)
        return res.data;
    }
})
console.log(currentUser)

const handleAllDraftBlogs = () => {

  const result = allBlogs?.filter(item => item.status === "draft");
  setFilteredData(result);

}

const handleAllPublishedBlogs = () => {

  const result = allBlogs?.filter(item => item.status === "published");
  setFilteredData(result);
}

const handleShowAll = () => {
setFilteredData(allBlogs);
}

  return (
    <>
      <SectionTitle heading={"Publish Content"} />

      <div className='flex items-center justify-between mb-[50px]'>

        <div>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-sm btn-neutral m-1">Filtered By</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><button onClick={handleShowAll} className='btn btn-sm mb-3'>All Content</button></li>
              <li><button onClick={handleAllDraftBlogs} className='btn btn-sm mb-3'>Draft</button></li>
              <li><button onClick={handleAllPublishedBlogs} className='btn btn-sm'>Published</button></li>
            </ul>
          </div>
        </div>

        <div>
          <Link to="/dashboard/volunteer-add-blog">
            <button className='bg-red-600 border-none hover:bg-red-500 text-white btn btn-sm'>
              Add Blog
            </button>
          </Link>
        </div>
        
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
          filteredData?.map(blog => <tr key={blog._id}>
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
