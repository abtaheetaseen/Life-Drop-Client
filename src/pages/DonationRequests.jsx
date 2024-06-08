import React from 'react'
import { useLoaderData } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle';
import PendingRequests from '../components/PendingRequests';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';

const DonationRequests = () => {

  const axiosPublic = useAxiosPublic();

  const {data: donationRequests = []} = useQuery({
    queryKey: ["donation-requests"],
    queryFn: async() => {
      const res = await axiosPublic.get("/donationRequest");
      return res?.data;
    }
  })
  const pendingRequests = donationRequests?.filter(item => item.status === "pending");
  console.log(pendingRequests);

  return (
    <>
      <SectionTitle heading={"All Donation Requests"} /> 

<div className='flex items-center justify-center mb-[100px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        
        {
          pendingRequests?.map(request => <PendingRequests key={request._id} request={request} />)
        }
        
      </div>
      </div>
    </>
  )
}

export default DonationRequests
