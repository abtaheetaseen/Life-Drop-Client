import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='banner-bg flex items-center justify-center'>
            <div className='text-center'>
                <h1 className='text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-widest'>Donate <span className='text-red-700 italic'>Blood</span></h1>
                <p className='text-white w-9/12 mx-auto my-5'> Keep Blood Bank shelves full. You may need Blood someday. Blood Donors bring sunshine.</p>
                <div className='flex items-center justify-center gap-5'>
                    <div>
                        <Link to="/register">
                            <button className='btn btn-sm bg-red-600 text-white hover:bg-red-500 border-none'>Join As A Donor</button>
                        </Link>
                    </div>

                    <div>
                        <Link to="/search-donor">
                            <button className='btn btn-sm bg-red-600 text-white hover:bg-red-500 border-none'>Search Donors</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
