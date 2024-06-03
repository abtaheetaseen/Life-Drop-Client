import React, { useContext } from 'react'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider';

const MyDonationRequest = () => {

    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext);

    const {data: donationRequests} = useQuery({
        queryKey: ["donationRequests", user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get(`/donationRequest?email=${user?.email}`)
            return res.data;
        }
    })
    console.log(donationRequests?.slice(0, 3))

  return (
    <div>
      my donation request
    </div>
  )
}

export default MyDonationRequest
