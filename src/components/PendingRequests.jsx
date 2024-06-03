import React from 'react'
import { Link } from 'react-router-dom'

const PendingRequests = ({request}) => {
  return (
<div className="card w-96 bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Recipient Name : {request.recipientName}</h2>
    <p>Location : {request.fullAddress}</p>
    <p>Donation Date : {request.donationDate}</p>
    <p>Donation Time : {request.donationTime}</p>
    
    <div className="card-actions justify-end">
    <Link to={`/view-donation-request-details/${request._id}`}>
      <button className="btn btn-sm bg-red-600 border-none text-white hover:bg-red-500">View</button>
      </Link>
    </div>
  </div>
</div>
  )
}

export default PendingRequests
