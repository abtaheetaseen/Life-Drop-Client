import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import SectionTitle from '../SectionTitle';
import thanks from "../../assets/images/thanks.png"

const ViewDonationRequestDetails = () => {

    const donationRequests = useLoaderData();
    const {id} = useParams();

    const requestDetails = donationRequests.find(request => request._id === id);
    console.log(requestDetails);

  return (
    
    <div>
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

        <div className='mt-5'>
            <button disabled={requestDetails.status === "inProgress" || requestDetails.status === "done" || requestDetails.status === "canceled" ? true : false} className='btn btn-sm bg-red-600 text-white hover:bg-red-500 border-none'>
                Donate
            </button>
        </div>
    </div>
</div>
    </div>
    </div>
  )
}

export default ViewDonationRequestDetails
