import React, { useContext, useState } from 'react'
import SectionTitle from '../../../components/SectionTitle'
import { AuthContext } from '../../../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const CreateDonationRequest = () => {

    const [selectDivision, setSelectDivision] = useState("");
    const [selectDistrict, setSelectDistrict] = useState("");
    const [selectUpazila, setSelectUpazila] = useState("");
    const [selectBloodGroup, setSelectBloodGroup] = useState("");

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
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

    const handleRequest = (e) => {
        e.preventDefault();
        const form = e.target;
        const requesterName = form.requesterName.value;
        const requesterEmail = form.requesterEmail.value;
        const recipientName = form.recipientName.value;
        const division = selectDivision;
        const district = selectDistrict;
        const upazila = selectUpazila;
        const bloodGroup = selectBloodGroup;
        const hospitalName = form.hospitalName.value;
        const fullAddress = form.fullAddress.value;
        const donationDate = form.donationDate.value;
        const donationTime = form.donationTime.value;
        const requestMessage = form.requestMessage.value;

        const donationRequest = {
            requesterName,
            requesterEmail,
            recipientName,
            division,
            district,
            upazila,
            bloodGroup,
            hospitalName,
            fullAddress,
            donationDate,
            donationTime,
            requestMessage,
            status: "pending"
        }
        console.log(donationRequest);

        axiosPublic.post("/donationRequest", donationRequest)
        .then(res => {
            if(res.data.insertedId){
                toast.success("Donation request created");
                form.reset();
                navigate("/dashboard/my-donation-requests")
            }
        })
    }

  return (
    <>
      <SectionTitle heading={"Request"} subHeading={"Place a donation request"} />

      <section className="bg-white min-h-screen mb-[70px]">
                <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
                    <form onSubmit={handleRequest} className="w-full max-w-md">

                        <div className="mb-5 mt-4">
                        <label className="text-red-600">Requester Name</label>

                            <input defaultValue={user?.displayName} readOnly={true} type="text" name='requesterName' className="block w-full py-2.5 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>

                        <div className="mb-5 mt-4">
                        <label className="text-red-600" htmlFor="divisions">Requester Email</label>

                            <input defaultValue={user?.email} readOnly={true} type="email" name='requesterEmail' className="block w-full py-2.5 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>

                        <div className="mb-5 mt-4">
                        <label className="text-red-600" htmlFor="divisions">Recipient Name</label>

                            <input type="text" name='recipientName' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
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

                    <div className="mb-5 mt-4">
                        <label className="text-red-600" htmlFor="divisions">Hospital Name</label>

                            <input type="text" name='hospitalName' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>

                        <div className="mb-5 mt-4">
                        <label className="text-red-600" htmlFor="divisions">Full Address</label>

                            <input type="text" name='fullAddress' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>

                        <div className="mb-5 mt-4">
                        <label className="text-red-600">Donation Date</label>

                            <input id='dateInput' type="date" name='donationDate' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>

                        <div className="mb-5 mt-4">
                        <label className="text-red-600" htmlFor="divisions">Donation Time : AM/PM</label>

                            <input type="text" name='donationTime' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>

                        <div className="mb-5 mt-4">
                        <label className="text-red-600" htmlFor="divisions">Request Message : Why you need blood?</label>

                            <input type="text" name='requestMessage' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>
                        
                        <div className='flex items-center justify-center'>
                        <input className='mt-[30px] btn btn-sm px-7 bg-red-600 border-none hover:bg-red-500 text-white' type="submit" value="Request" />
                        </div>

                    </form>
                </div>

            </section>
    </>
  )
}

export default CreateDonationRequest
