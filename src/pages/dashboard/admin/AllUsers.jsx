import React, { useState } from 'react'
import SectionTitle from '../../../components/SectionTitle'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();

    const [allUsers, setAllUsers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [allUsersTotal, setAllUsersTotal] = useState("");
    const allUsersCount = allUsersTotal.totalUsersCount;
    const itemsPerPage = 10;
    const numberOfPages = Math.ceil(allUsersCount / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = []
    for (let i = 0; i < numberOfPages; i++) {
      pages.push(i)
    }

    const { data: users = [], refetch } = useQuery({
        queryKey: ["allUsers", currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?page=${currentPage}&size=${itemsPerPage}`);
            setAllUsers(res?.data);
            setFilteredData(res?.data);
            return res?.data;
        }
    })

    const {data: totalUsers = []} = useQuery({
        queryKey: ["totalUsersCount"],
        queryFn: async() => {
            const res = await axiosSecure.get("/totalUsersCount");
            setAllUsersTotal(res?.data);
            return res?.data;
        }
    })

    const handleVolunteer = (user) => {
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
                axiosSecure.patch(`/user/admin/make-volunteer/${user._id}`)
                .then(res => {
                    if(res.data.modifiedCount){
                        Swal.fire({
                            title: "Done",
                            text: `${user?.name.toUpperCase()} is Volunteer now.`,
                            icon: "success"
                        });
                        refetch();
                    }
                })
            }
        });
    }

    const handleAdmin = (user) => {
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
                axiosSecure.patch(`/user/admin/make-admin/${user._id}`)
                .then(res => {
                    if(res.data.modifiedCount){
                        Swal.fire({
                            title: "Done",
                            text: `${user?.name.toUpperCase()} is Admin now.`,
                            icon: "success"
                        });
                        refetch();
                    }
                })
            }
        });
    }

    const handleBlock = (user) => {
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
                axiosSecure.patch(`/user/admin/block-user/${user._id}`)
                .then(res => {
                    if(res.data.modifiedCount){
                        Swal.fire({
                            title: "Done",
                            text: `You blocked ${user?.name.toUpperCase()}.`,
                            icon: "success"
                        });
                        refetch();
                    }
                })
            }
        });
    }

    const handleUnblock = (user) => {
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
                axiosSecure.patch(`/user/admin/unblock-user/${user._id}`)
                .then(res => {
                    if(res.data.modifiedCount){
                        Swal.fire({
                            title: "Done",
                            text: `You unblock ${user?.name.toUpperCase()}.`,
                            icon: "success"
                        });
                        refetch();
                    }
                })
            }
        });
    }

    const handlePrev = () => {
        if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
        }
      }
    
      const handleNext = () => {
        if (currentPage < pages.length - 1) {
          setCurrentPage(currentPage + 1);
        }
      }

      const handleActiveUsers = () => {

        const result = allUsers?.filter(item => item.status === "active");
        setFilteredData(result);
      }
      
      const handleBlockedUsers = () => {
      
        const result = allUsers?.filter(item => item.status === "blocked");
        setFilteredData(result);
      }
      
      const handleShowAll = () => {
        setFilteredData(allUsers);
      }

    return (
        <>
            <Helmet>
        <title>LIFE-DROP | ALL USERS</title>
    </Helmet>

            <SectionTitle heading={"All Users"} subHeading={"Manage your users"} />


            <div className='flex items-center justify-center mb-[70px]'>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-sm btn-neutral m-1">Filtered By</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><button onClick={handleShowAll} className='btn btn-sm mb-3'>All Users</button></li>

              <li><button onClick={handleActiveUsers} className='btn btn-sm mb-3'>Active Users</button></li>

              <li><button onClick={handleBlockedUsers} className='btn btn-sm mb-3'>Blocked Users</button></li>
            </ul>
          </div>
        </div>

            
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>

                                    <th>User Info</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredData?.map(user => <tr key={user?._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user?.image_url} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user?.name}</div>
                                                    <div className="text-sm opacity-50">{user?.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user.role}
                                        </td>
                                        <td>{user.status}</td>

                                        <th>
                                            <button disabled={user?.status === "active" ? true : false} onClick={() => handleUnblock(user)} className="btn btn-xs bg-green-500 text-white hover:bg-green-400 border-none">Unblock</button>
                                        </th>

                                        <th>
                                            <button disabled={user?.status === "active" ? false : true} onClick={() => handleBlock(user)} className="btn btn-xs bg-red-600 text-white hover:bg-red-500 border-none">Block</button>
                                        </th>

                                        <th>
                                            <button disabled={user?.role === "donor" ||user.role === "admin" ? false : true} onClick={() => handleVolunteer(user)} className="btn btn-xs bg-orange-400 text-white hover:bg-orange-300 border-none">Volunteer</button>
                                        </th>

                                        

                                        <th>
                                            <button disabled={user?.role === "donor" ||user?.role === "volunteer" ? false : true} onClick={() => handleAdmin(user)} className="btn btn-xs bg-cyan-500 text-white hover:bg-cyan-400 border-none">Admin</button>
                                        </th>

                                    </tr>)
                                }
                            </tbody>


                        </table>
                    </div>
                </div>

                <div className='flex items-center justify-center gap-3 mt-[80px] mb-[30px]'>

<button className='btn btn-sm bg-white border-red-600 hover:bg-red-500 hover:text-white hover:border-none' onClick={handlePrev}>
  Prev
</button>

{
  pages.map((page, index) => <button onClick={() => setCurrentPage(page)} className={currentPage === page ? "btn btn-sm border-none bg-red-600 text-white hover:bg-red-500" : "btn btn-sm bg-white border-red-600 hover:bg-red-500 hover:text-white hover:border-none"} key={index}>
    {page}
  </button>)
}

<button className='btn btn-sm bg-white border-red-600 hover:bg-red-500 hover:text-white hover:border-none' onClick={handleNext}>
  Next
</button>
</div>

        </>
    )
}

export default AllUsers
