import React, { useContext, useState } from 'react'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import SectionTitle from '../../../components/SectionTitle';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../../../../src/App.css';

const MyDonationRequest = () => {

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {user} = useContext(AuthContext);
  const [tabIndex, setTabIndex] = useState(0);

  const {data: donationRequests, refetch} = useQuery({
      queryKey: ["donationRequest", user?.email],
      queryFn: async() => {
          const res = await axiosPublic.get(`/donationRequest?email=${user?.email}`)
          return res.data;
      }
  })

  const pendingRequest = donationRequests?.filter(item => item.status === "pending");
  const inProgressRequest = donationRequests?.filter(item => item.status === "inProgress");
  const doneRequest = donationRequests?.filter(item => item.status === "done");
  const canceledRequest = donationRequests?.filter(item => item.status === "canceled");


  const handleDelete = (item) => {
    console.log(item._id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
  }).then((result) => {
      if (result.isConfirmed) {
          axiosSecure.delete(`/donationRequest/${item._id}`)
          .then(res => {
              if(res.data.deletedCount > 0){
                  Swal.fire({
                      title: "Deleted!",
                      text: "Your request has been deleted.",
                      icon: "success"
                  });
                  refetch();
              }
          })
      }
  });
  } 

  const handleDone = (item) => {
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
          axiosSecure.patch(`/donationRequest/doneStatus/${item._id}`)
          .then(res => {
              if(res.data.modifiedCount){
                  Swal.fire({
                      title: "Done",
                      text: `You request has completed`,
                      icon: "success"
                  });
                  refetch();
              }
          })
      }
  });
  }

  const handleCanceled = (item) => {
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
          axiosSecure.patch(`/donationRequest/canceledStatus/${item._id}`)
          .then(res => {
              if(res.data.modifiedCount){
                  Swal.fire({
                      title: "Done",
                      text: `You cancel your donation request`,
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
      <SectionTitle heading={`Welcome ${user?.displayName}`} subHeading={"Your all donation request"} />

      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>


<TabList className='w-10/12 mx-auto mb-[70px] grid grid-cols-4'>
    <Tab>Pending Request</Tab>
    <Tab>InProgress Request</Tab>
    <Tab>Done Request</Tab>
    <Tab>Canceled Request</Tab>
</TabList>



<TabPanel>
<div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead>
<tr>
  <th>Recipient <br /> Name</th>
  <th>Location</th>
  <th>Date</th>
  <th>Time</th>
  <th>Status</th>
  <th>Donar <br /> Name</th>
  <th>Donar <br /> Email</th>
  <th>Actions</th>
</tr>
</thead>
<tbody>

  {
    pendingRequest?.map(item => <tr key={item._id}>
      <td>{item.recipientName}</td>
      <td>{item.upazila}, {item.district}</td>
      <td>{item.donationDate}</td>
      <td>{item.donationTime}</td>
      <td>
      {
                item.status === "pending" ? "pending" : item.status === "inProgress" ?
                <div className="flex gap-3">
                  <button onClick={() => handleDone(item)} className='btn btn-xs bg-green-600 text-white hover:bg-green-500 border-none'>
                    Done
                  </button>
                  <button onClick={() => handleCanceled(item)}  className='btn btn-xs bg-red-600 text-white hover:bg-red-500 border-none'>
                    Cancel
                  </button>
                </div> : item.status === "done" ? "done" : "canceled"
              }
      </td>
      <td>
              {
                item.status === "inProgress" || item.status === "done" || item.status === "canceled" ? 
                <div>{item.donorName}</div> : "X"
              }
            </td>
            <td>
              {
                item.status === "inProgress" || item.status === "done" || item.status === "canceled" ? 
                <div>{item.donorEmail}</div> : "X"
              }
            </td>
      <td>
      <Link to={`/update-donation-requests/${item._id}`}>
              <button className='btn btn-xs btn-neutral'>
                Edit
              </button>
              </Link>
      </td>
      <td>
        <button onClick={() => handleDelete(item)} className='btn btn-xs btn-neutral'>
          Delete
        </button>
      </td>
      <td>
      <Link to={`/view-donation-request-details/${item._id}`}>
              <button className='btn btn-xs btn-neutral'>
                View
              </button>
              </Link>
      </td>
    </tr>)
  }

</tbody>
</table>

</div>
</TabPanel>

<TabPanel>
<div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead>
<tr>
  <th>Recipient <br /> Name</th>
  <th>Location</th>
  <th>Date</th>
  <th>Time</th>
  <th>Status</th>
  <th>Donar <br /> Name</th>
  <th>Donar <br /> Email</th>
  <th>Actions</th>
</tr>
</thead>
<tbody>

  {
    inProgressRequest?.map(item => <tr key={item._id}>
      <td>{item.recipientName}</td>
      <td>{item.upazila}, {item.district}</td>
      <td>{item.donationDate}</td>
      <td>{item.donationTime}</td>
      <td>
      {
                item.status === "pending" ? "pending" : item.status === "inProgress" ?
                <div className="flex gap-3">
                  <button onClick={() => handleDone(item)} className='btn btn-xs bg-green-600 text-white hover:bg-green-500 border-none'>
                    Done
                  </button>
                  <button onClick={() => handleCanceled(item)}  className='btn btn-xs bg-red-600 text-white hover:bg-red-500 border-none'>
                    Cancel
                  </button>
                </div> : item.status === "done" ? "done" : "canceled"
              }
      </td>
      <td>
              {
                item.status === "inProgress" || item.status === "done" || item.status === "canceled" ? 
                <div>{item.donorName}</div> : "X"
              }
            </td>
            <td>
              {
                item.status === "inProgress" || item.status === "done" || item.status === "canceled" ? 
                <div>{item.donorEmail}</div> : "X"
              }
            </td>
      <td>
      <Link to={`/update-donation-requests/${item._id}`}>
              <button className='btn btn-xs btn-neutral'>
                Edit
              </button>
              </Link>
      </td>
      <td>
        <button onClick={() => handleDelete(item)} className='btn btn-xs btn-neutral'>
          Delete
        </button>
      </td>
      <td>
      <Link to={`/view-donation-request-details/${item._id}`}>
              <button className='btn btn-xs btn-neutral'>
                View
              </button>
              </Link>
      </td>
    </tr>)
  }

</tbody>
</table>

</div>
</TabPanel>

<TabPanel>
<div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead>
<tr>
  <th>Recipient <br /> Name</th>
  <th>Location</th>
  <th>Date</th>
  <th>Time</th>
  <th>Status</th>
  <th>Donar <br /> Name</th>
  <th>Donar <br /> Email</th>
  <th>Actions</th>
</tr>
</thead>
<tbody>

  {
    doneRequest?.map(item => <tr key={item._id}>
      <td>{item.recipientName}</td>
      <td>{item.upazila}, {item.district}</td>
      <td>{item.donationDate}</td>
      <td>{item.donationTime}</td>
      <td>
      {
                item.status === "pending" ? "pending" : item.status === "inProgress" ?
                <div className="flex gap-3">
                  <button onClick={() => handleDone(item)} className='btn btn-xs bg-green-600 text-white hover:bg-green-500 border-none'>
                    Done
                  </button>
                  <button onClick={() => handleCanceled(item)}  className='btn btn-xs bg-red-600 text-white hover:bg-red-500 border-none'>
                    Cancel
                  </button>
                </div> : item.status === "done" ? "done" : "canceled"
              }
      </td>
      <td>
              {
                item.status === "inProgress" || item.status === "done" || item.status === "canceled" ? 
                <div>{item.donorName}</div> : "X"
              }
            </td>
            <td>
              {
                item.status === "inProgress" || item.status === "done" || item.status === "canceled" ? 
                <div>{item.donorEmail}</div> : "X"
              }
            </td>
      <td>
      <Link to={`/update-donation-requests/${item._id}`}>
              <button className='btn btn-xs btn-neutral'>
                Edit
              </button>
              </Link>
      </td>
      <td>
        <button onClick={() => handleDelete(item)} className='btn btn-xs btn-neutral'>
          Delete
        </button>
      </td>
      <td>
      <Link to={`/view-donation-request-details/${item._id}`}>
              <button className='btn btn-xs btn-neutral'>
                View
              </button>
              </Link>
      </td>
    </tr>)
  }

</tbody>
</table>

</div>
</TabPanel>

<TabPanel>
<div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead>
<tr>
  <th>Recipient <br /> Name</th>
  <th>Location</th>
  <th>Date</th>
  <th>Time</th>
  <th>Status</th>
  <th>Donar <br /> Name</th>
  <th>Donar <br /> Email</th>
  <th>Actions</th>
</tr>
</thead>
<tbody>

  {
    canceledRequest?.map(item => <tr key={item._id}>
      <td>{item.recipientName}</td>
      <td>{item.upazila}, {item.district}</td>
      <td>{item.donationDate}</td>
      <td>{item.donationTime}</td>
      <td>
      {
                item.status === "pending" ? "pending" : item.status === "inProgress" ?
                <div className="flex gap-3">
                  <button onClick={() => handleDone(item)} className='btn btn-xs bg-green-600 text-white hover:bg-green-500 border-none'>
                    Done
                  </button>
                  <button onClick={() => handleCanceled(item)}  className='btn btn-xs bg-red-600 text-white hover:bg-red-500 border-none'>
                    Cancel
                  </button>
                </div> : item.status === "done" ? "done" : "canceled"
              }
      </td>
      <td>
              {
                item.status === "inProgress" || item.status === "done" || item.status === "canceled" ? 
                <div>{item.donorName}</div> : "X"
              }
            </td>
            <td>
              {
                item.status === "inProgress" || item.status === "done" || item.status === "canceled" ? 
                <div>{item.donorEmail}</div> : "X"
              }
            </td>
      <td>
      <Link to={`/update-donation-requests/${item._id}`}>
              <button className='btn btn-xs btn-neutral'>
                Edit
              </button>
              </Link>
      </td>
      <td>
        <button onClick={() => handleDelete(item)} className='btn btn-xs btn-neutral'>
          Delete
        </button>
      </td>
      <td>
      <Link to={`/view-donation-request-details/${item._id}`}>
              <button className='btn btn-xs btn-neutral'>
                View
              </button>
              </Link>
      </td>
    </tr>)
  }

</tbody>
</table>

</div>
</TabPanel>

</Tabs>


    </>
  )
}

export default MyDonationRequest
