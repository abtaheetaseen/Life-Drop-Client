import React, { useContext, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider';
import SectionTitle from '../../../components/SectionTitle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { imageUpload } from '../../../imageAPI';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Profile = () => {

    const [selectDivision, setSelectDivision] = useState("");
    const [selectDistrict, setSelectDistrict] = useState("");
    const [selectUpazila, setSelectUpazila] = useState("");
    const [selectBloodGroup, setSelectBloodGroup] = useState("");

    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);
    const axiosPublic = useAxiosPublic();

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    }

    const handleDivision = (e) => {
        setSelectDivision(e.target.value);
    }

    const handleDistrict = (e) => {
        setSelectDistrict(e.target.value);
    }

    const handleUpazila = (e) => {
        setSelectUpazila(e.target.value);
    }

    const handleBloodGroup = (e) => {
        setSelectBloodGroup(e.target.value);
    }

    const {data: divisions = []} = useQuery({
        queryKey: ["divisions"],
        queryFn: async() => {
            const res = await axiosPublic.get("/divisions")
            return res.data;
        }
    })

    const {data: districts = []} = useQuery({
        queryKey: ["districts"],
        queryFn: async() => {
            const res = await axiosPublic.get("/districts")
            return res.data;
        }
    })

    const {data: upazilas = []} = useQuery({
        queryKey: ["upazilas"],
        queryFn: async() => {
            const res = await axiosPublic.get("/upazilas")
            return res.data;
        }
    })

    const {data, refetch} = useQuery({
        queryKey: ["profileUser", user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            console.log(res.data)
            return res.data;
        }
    })
    console.log(data)

    const handleUpdate = async(e) => {
        e.preventDefault();
        console.log('saved clicked');
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.files[0];
        const division = selectDivision;
        const district = selectDistrict;
        const upazila = selectUpazila;
        const bloodGroup = selectBloodGroup;

        try {

            // upload image and get image url
            const image_url = await imageUpload(image);

            // update user

            const updatedUser = {
                name,
                email,
                image_url,
                division,
                district,
                upazila,
                bloodGroup
            }

            const res = await axiosPublic.put(`/users/${data?._id}`, updatedUser)
            console.log(res.data)
            if(res.data.modifiedCount){
                refetch();
                toast.success("Your info is updated");
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

  return (
    <>
    <Helmet>
        <title>LIFE-DROP | PROFILE</title>
    </Helmet>

      <SectionTitle heading={`Your Profile : ${data?.name.toUpperCase()}`} subHeading={"To update your information, kindly provide your Image, Division, District, Upazila and Blood-Group again."} />

      <div>
      <form onSubmit={handleUpdate}>

        <div className="flex justify-center my-10">
            <button onClick={handleEditClick} className="px-5 btn btn-sm bg-red-600 hover:bg-red-500 cursor-pointer leading-5 text-white duration-300 transform rounded-md">
            <input type="submit" value={!isEditing ? "Edit" : "Save"} />
            </button>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="name">Name</label>
                <input defaultValue={data?.name} readOnly={!isEditing ? true : false} name='name' type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 dark:focus:border-red-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                <input defaultValue={user?.email} readOnly={true} name='email' type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 dark:focus:border-red-300 focus:outline-none focus:ring" />
            </div>

            <div>
                    <label className="text-black" htmlFor="divisions">Division</label>
                    <select value={!isEditing ? data?.division : selectDivision} disabled={!isEditing ? true : false} onChange={handleDivision} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
                        {
                            divisions.map(division => <option key={division._id}>
                                {division.division_name}
                            </option>)
                        }
                    </select>
                    </div>

                    
            <div>
                    <label className="text-black" htmlFor="divisions">District</label>
                    <select value={!isEditing ? data?.district : selectDistrict} disabled={!isEditing ? true : false} onChange={handleDistrict} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
                        {
                            districts.map(district => <option key={district._id}>
                                {district.name}
                            </option>)
                        }
                    </select>
                    </div>

                    <div>
                    <label className="text-black" htmlFor="divisions">Upazila</label>
                    <select value={!isEditing ? data?.upazila : selectUpazila} disabled={!isEditing ? true : false} onChange={handleUpazila} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
                    {
                            upazilas.map(upazila => <option key={upazila._id}>
                                {upazila.name}
                            </option>)
                        }
                    </select>
                    </div>

                    <div>
                    <label className="text-black" htmlFor="divisions">Blood Group</label>
                    <select value={!isEditing ? data?.bloodGroup : selectBloodGroup} disabled={!isEditing ? true : false} onChange={handleBloodGroup} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
                    <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>O+</option>
                        <option>O-</option>
                    </select>
                    </div>

            <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Image</label>

            <div className='flex items-center justify-center'>
            <img className='w-10 h-10' src={data?.image_url} alt="" />

                            <input disabled={!isEditing ? true : false} required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*' className="block w-full py-3 ml-1 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>
                        </div>
        </div>

        
    </form>
      </div>
    </>
  )
}

export default Profile
