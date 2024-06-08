import React, { useContext } from 'react'
import { AuthContext } from '../../../provider/AuthProvider'
import SectionTitle from '../../../components/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUser } from 'react-icons/fa6';
import { HiDocumentAdd } from 'react-icons/hi';

const AdminDashboard = () => {

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: adminStats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats")
      return res?.data
    }
  })

  return (
    <>
      <SectionTitle heading={`Welcome ${user?.displayName}`} subHeading={"All Stats are here"} />


      <div className='grid grid-cols-1 gap-10 mb-[80px]'>

        <div className='flex items-center justify-center'>
          <div className="card w-96 bg-base-100 shadow-xl hover:border-b-2 hover:border-b-red-600">
            <div className="card-body">
              <FaUser />
              <h2 className="text-2xl font-extrabold">Total Users : {adminStats?.totalUsers}</h2>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <div className="card w-96 bg-base-100 shadow-xl hover:border-b-2 hover:border-b-red-600">
            <div className="card-body">
              <HiDocumentAdd className='text-2xl' />
              <h2 className="text-2xl font-extrabold">Total Donation Requests : {adminStats?.totalDonationRequests}</h2>
            </div>
          </div>
        </div>

        <div className='flex items-center justify-center'>
          <div className="card w-96 bg-base-100 shadow-xl hover:border-b-2 hover:border-b-red-600">
            <div className="card-body">
              <HiDocumentAdd className='text-2xl' />
              <h2 className="text-2xl font-extrabold">Total Fund : ${adminStats?.revenue}</h2>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AdminDashboard
