import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import SectionTitle from '../../../components/SectionTitle';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../../../../src/App.css';

const VolunteerDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [tabIndex, setTabIndex] = useState(0);

  const [totalDonationRequestCount, setTotalDonationRequestCount] = useState("");
  const totalCount = totalDonationRequestCount.totalDonationRequestCount;
  const itemsPerPage = 1;
  const numberOfPages = Math.ceil(totalCount / itemsPerPage);
  console.log(numberOfPages)
  const [currentPage, setCurrentPage] = useState(0);

  const pages = []
  for (let i = 0; i < numberOfPages; i++) {
    pages.push(i)
  }

  const { data: donationRequests, refetch } = useQuery({
    queryKey: ["allDonationRequestsForVolunteer", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allDonationRequestForVolunteer?page=${currentPage}&size=${itemsPerPage}`);
      return res.data;
    }
  })

  useEffect(() => {
    axiosSecure.get("/totalDonationRequestCount")
      .then(res => {
        setTotalDonationRequestCount(res.data);
      })
  }, [])

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


  const pendingRequest = donationRequests?.filter(item => item.status === "pending");
  const inProgressRequest = donationRequests?.filter(item => item.status === "inProgress");
  const doneRequest = donationRequests?.filter(item => item.status === "done");
  const canceledRequest = donationRequests?.filter(item => item.status === "canceled");



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

  return (
    <>
      <SectionTitle heading={"Request"} subHeading={"All Blood Donation"} />

      <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>


        <TabList className='w-10/12 mx-auto mb-[70px] grid grid-cols-5'>
          <Tab>All Requests</Tab>
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
                  donationRequests?.map(item => <tr key={item._id}>
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

export default VolunteerDonationRequests
