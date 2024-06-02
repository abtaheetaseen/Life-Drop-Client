import React from 'react'
import SectionTitle from '../../../components/SectionTitle'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure();

    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user`)
            console.log(res.data)
            return res.data;
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

    return (
        <>

            <SectionTitle heading={"All Users"} subHeading={"Manage your users"} />

            
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
                                    allUsers.map(user => <tr key={user?._id}>
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
                                            <button disabled={user?.role === "user" ||user.role === "admin" ? false : true} onClick={() => handleVolunteer(user)} className="btn btn-xs bg-orange-400 text-white hover:bg-orange-300 border-none">Volunteer</button>
                                        </th>

                                        

                                        <th>
                                            <button disabled={user?.role === "user" ||user?.role === "volunteer" ? false : true} onClick={() => handleAdmin(user)} className="btn btn-xs bg-cyan-500 text-white hover:bg-cyan-400 border-none">Admin</button>
                                        </th>

                                    </tr>)
                                }
                            </tbody>


                        </table>
                    </div>
                </div>

        </>
    )
}

export default AllUsers
