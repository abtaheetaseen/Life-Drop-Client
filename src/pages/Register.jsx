import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { imageUpload } from '../imageAPI';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Register = () => {

    const [selectDivision, setSelectDivision] = useState("");
    const [selectDistrict, setSelectDistrict] = useState("");
    const [selectUpazila, setSelectUpazila] = useState("");
    const [selectBloodGroup, setSelectBloodGroup] = useState("");

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || "/";
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

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

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const image = form.image.files[0];
        const division = selectDivision;
        const district = selectDistrict;
        const upazila = selectUpazila;
        const bloodGroup = selectBloodGroup;

        try {

            // pass validation
            if (!/[A-Z]/.test(password)) {
                toast.error("Password must have at least one capital letter");
                return;
            } else if (!/[a-z]/.test(password)) {
                toast.error("Password must have at least one small letter");
                return;
            } else if (password !== confirmPassword) {
                toast.error("Password and Confirm Password is not matched");
                return;
            }

            // upload image and get image url
            const image_url = await imageUpload(image);

            // register user
            const result = await createUser(email, password)
            console.log(result);

            // update profile
            await updateUserProfile(name, image_url)

            // send user data to mongodb

            const user = {
                name,
                email,
                image_url,
                division,
                district,
                upazila,
                bloodGroup
            }

            const res = await axiosSecure.post("/users", user)
            console.log(res.data)
            if(res.data.insertedId){
                console.log("User created")
            }
            

            toast.success("User registered successfully");
            navigate(from);

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return (
        <>
            <Helmet>
                <title>LIFE-DROP | REGISTER</title>
            </Helmet>

            <section className="bg-white min-h-screen">
                <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                    <form onSubmit={handleRegister} className="w-full max-w-md">
                        <h1 className='font-bold text-red-600'>* LIFE-DROP</h1>

                        <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">Create Account</h1>

                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>


                            </span>

                            <input type="text" name='name' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Your Name" required />
                        </div>

                        <div className="relative flex items-center mt-8">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>



                            </span>

                            <input required
                                type='file'
                                id='image'
                                name='image'
                                accept='image/*' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                        </div>

                        <div className='mb-5 mt-4'>
                    <label className="text-red-600" htmlFor="divisions">Division</label>
                    <select value={selectDivision} onChange={handleDivision} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
                        {
                            divisions.map(division => <option key={division._id}>
                                {division.division_name}
                            </option>)
                        }
                    </select>
                    </div>

                    <div className='mb-5 mt-4'>
                    <label className="text-red-600" htmlFor="districts">District</label>
                    <select value={selectDistrict} onChange={handleDistrict} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
                        {
                            districts.map(district => <option key={district._id}>
                                {district.name}
                            </option>)
                        }
                    </select>
                    </div>

                    <div className='mb-5 mt-4'>
                    <label className="text-red-600" htmlFor="upazilas">Upazila</label>
                    <select value={selectUpazila} onChange={handleUpazila} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
                        {
                            upazilas.map(upazila => <option key={upazila._id}>
                                {upazila.name}
                            </option>)
                        }
                    </select>
                    </div>

                    <div className='mb-5 mt-4'>
                    <label className="text-red-600" htmlFor="bloodGroup">Blood Group</label>
                    <select value={selectBloodGroup} onChange={handleBloodGroup} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
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

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </span>

                            <input type="email" name='email' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" required />
                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input type="password" name='password' className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" required />


                        </div>

                        <div className="relative flex items-center mt-4">
                            <span className="absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </span>

                            <input type="password" name='confirmPassword' className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" required />


                        </div>

                        <div className="mt-6">
                            <input className="cursor-pointer w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500" type="submit" value="Register" />

                            <div className="mt-6 text-center ">
                                <Link to="/login" className="text-sm text-red-600 hover:underline dark:text-red-600">
                                    Already have an account? Login
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

            </section>
        </>
    )
}

export default Register
