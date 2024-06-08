import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import SectionTitle from '../../../components/SectionTitle';
import { Link } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import '../../../../src/App.css';
import "../../../App.css"

const AllBloodDonationRequests = () => {

  const [allDonation, setAllDonation] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const axiosSecure = useAxiosSecure();

  // pagination start

  const [totalDonationRequestCount, setTotalDonationRequestCount] = useState("");
  const totalCount = totalDonationRequestCount.totalDonationRequestCount;
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  console.log(numberOfPages)
  const [currentPage, setCurrentPage] = useState(0);

  const pages = []
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i)
  }

  const { data: donationRequests, refetch } = useQuery({
    queryKey: ["allDonationRequests", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests?page=${currentPage}&size=${itemsPerPage}`);
      setAllDonation(res?.data);
      setFilteredData(res?.data);
      return res.data;
    }
  })

  const {data: donations = []} = useQuery({
    queryKey: ["totalDonationsCount"],
    queryFn: async() => {
        const res = await axiosSecure.get("/totalDonationRequestCount");
        setTotalDonationRequestCount(res?.data);
        return res?.data;
    }
})

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }

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
            if (res.data.deletedCount > 0) {
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
            if (res.data.modifiedCount) {
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
            if (res.data.modifiedCount) {
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

  const handleStatusPending = () => {

    const result = allDonation?.filter(item => item.status === "pending");
    setFilteredData(result);

}

const handleStatusInProgress = () => {

    const result = allDonation?.filter(item => item.status === "inProgress");
    setFilteredData(result);
}

const handleStatusDone = () => {

  const result = allDonation?.filter(item => item.status === "done");
  setFilteredData(result);
}

const handleStatusCancel = () => {

  const result = allDonation?.filter(item => item.status === "canceled");
  setFilteredData(result);
}

const handleShowAll = () => {
  setFilteredData(allDonation);
}

  return (
    <>
      <SectionTitle heading={"Request"} subHeading={"All Blood Donation"} />

      <div className='flex items-center justify-center mb-[70px]'>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-sm btn-neutral m-1">Filtered By</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><button onClick={handleShowAll} className='btn btn-sm mb-3'>All Request</button></li>

              <li><button onClick={handleStatusPending} className='btn btn-sm mb-3'>Pending</button></li>

              <li><button onClick={handleStatusInProgress} className='btn btn-sm mb-3'>InProgress</button></li>

              <li><button onClick={handleStatusDone} className='btn btn-sm mb-3'>Done</button></li>

              <li><button onClick={handleStatusCancel} className='btn btn-sm mb-3'>Cancel</button></li>
            </ul>
          </div>
        </div>


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
                  filteredData?.map(item => <tr key={item._id}>
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
                            <button onClick={() => handleCanceled(item)} className='btn btn-xs bg-red-600 text-white hover:bg-red-500 border-none'>
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
                        <button disabled={item.status === "done" || item.status === "canceled" ? true : false} className='btn btn-xs btn-neutral'>
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

          <div className='flex items-center justify-center gap-3 mt-[80px] mb-[30px]'>

            <button className='btn btn-sm bg-white border-red-600 hover:bg-red-500 hover:text-white hover:border-none' onClick={handlePrev}>
              Prev
            </button>

            {
              pages.map((page, index) => <button onClick={() => setCurrentPage(page)} className={currentPage === page ? "btn btn-sm border-none bg-red-600 text-white hover:bg-red-500" : "btn btn-sm bg-white border-red-600 hover:bg-red-500 hover:text-white hover:border-none"} key={index}>
                {page}
              </button>)
            }

            <button className='btn btn-sm bg-white border-red-600 hover:bg-red-500 hover:text-white hover:border-none' onClick={handleNext}>
              Next
            </button>
          </div>

    </>
  )
}

export default AllBloodDonationRequests
