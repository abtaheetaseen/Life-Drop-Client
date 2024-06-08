import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
    <Helmet>
        <title>LIFE-DROP | ERROR PAGE</title>
    </Helmet>
    <div className='flex items-center justify-center'>
    <div className='min-h-screen flex items-center justify-center flex-col'>
      <h1 className='text-7xl text-red-600 font-bold tracking-wider'>404</h1>
      <h1 className='text-5xl text-red-600 font-bold tracking-wider mb-5'>NOT FOUND</h1>
      <div>
        <Link to="/">
        <button className='btn btn-sm border-none text-white bg-red-600 hover:bg-red-500'>
          Back To Home
        </button>
        </Link>
      </div>
    </div>
    </div>
    </>
  )
}

export default ErrorPage
