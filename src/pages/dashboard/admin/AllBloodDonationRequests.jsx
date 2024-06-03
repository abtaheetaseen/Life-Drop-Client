import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const AllBloodDonationRequests = () => {

  const axiosSecure = useAxiosSecure();

  const {data: donationRequests} = useQuery({
    queryKey: ["allDonationRequests"],
    queryFn: async() => {
      const res = await axiosSecure.get("/donationRequest");
      return res.data;
    }
  })
  console.log(donationRequests)

  return (
    <div>
      all blood donation request page
    </div>
  )
}

export default AllBloodDonationRequests
