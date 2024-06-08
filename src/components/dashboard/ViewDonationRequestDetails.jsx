import React, { useContext } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import SectionTitle from '../SectionTitle';
import thanks from "../../assets/images/thanks.png"
import { AuthContext } from '../../provider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const ViewDonationRequestDetails = () => {

    const navigate = useNavigate();

    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const donationRequests = useLoaderData();
    const {id} = useParams();

    const requestDetails = donationRequests.find(request => request._id === id);
    console.log(requestDetails);

    const handleDonate = (e) => {
        e.preventDefault();
        const form = e.target;
        const donorName = form.donorName.value;
        const donorEmail = form.donorEmail.value;

        const donorDetails = {
            donorName,
            donorEmail
        }

        axiosPublic.patch(`/donationRequest/${requestDetails._id}`, donorDetails)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount){
                toast.success("Your Donation request is in progress");
                navigate("/")
            }
        })
    }

  return (
    
    <div>
            <Helmet>
        <title>LIFE-DROP | DONATION-REQUEST-DETAILS</title>
    </Helmet>
        <SectionTitle heading={"View Details"} />

<div className='flex items-center justify-center mb-[100px]'>
        <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <img className="object-cover w-full h-64" src={thanks} alt="Article" />

    <div className="p-6">
        <div>
            <span className="text-xs text-red-600 uppercase font-extrabold">{requestDetails.bloodGroup}, {requestDetails.donationDate}, {requestDetails.donationTime}</span>
            <p className="block mt-2 text-xl font-semibold text-gray-800" tabIndex="0" role="link">Address : {requestDetails.fullAddress}, {requestDetails.upazila}, {requestDetails.district}, {requestDetails.division}</p>
            <p className="block mt-2 text-xl font-semibold text-gray-800" tabIndex="0" role="link">Hospital Name : {requestDetails.hospitalName}</p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{requestDetails.requestMessage}</p>
        </div>

        <div className="mt-4">
            <div className="flex items-center">
                
                <p>
                    Recipient Name : <span className='font-bold'>{requestDetails.recipientName.toUpperCase()}</span>
                </p>

            </div>
        </div>

        {/* <div className='mt-5'>
            <button disabled={requestDetails.status === "inProgress" || requestDetails.status === "done" || requestDetails.status === "canceled" ? true : false} className='btn btn-sm bg-red-600 text-white hover:bg-red-500 border-none'>
                Donate
            </button>
        </div> */}

<div className='flex items-center justify-start mt-5'>
        <div>

        <button disabled={requestDetails.status === "inProgress" || requestDetails.status === "done" || requestDetails.status === "canceled" ? true : false}                onClick={() => document.getElementById('my_modal_5').showModal()} className='btn btn-sm bg-red-600 text-white hover:bg-red-500 border-none'>
                Donate
            </button>

        </div>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className='mb-5 text-xl font-bold'>
              Please share your experience
            </div>
            <form onSubmit={handleDonate} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className='mb-5'>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="donorName">Your Name</label>
                <input id="donorName" name='donorName' type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 dark:focus:border-red-300 focus:outline-none focus:ring" required defaultValue={user?.displayName} readOnly={true} />
              </div>

              <div className='mb-5'>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="donorEmail">Your Email</label>
                <input id="donorEmail" name='donorEmail' type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 dark:focus:border-red-300 focus:outline-none focus:ring" required defaultValue={user?.email} readOnly={true} />
              </div>
              
              <button className="btn btn-sm bg-red-600 text-white hover:bg-red-500 border-none">
                <input className='cursor-pointer' type="submit" disabled value="Donate" />
              </button>
              
              
              
            </form>

            <div className="modal-action">
      <form method="dialog">
        <button className="btn btn-sm btn-neutral">Close</button>
      </form>
      </div>
          </div>
        </dialog>
      </div>
    </div>
</div>
    </div>
    </div>
  )
}

export default ViewDonationRequestDetails
