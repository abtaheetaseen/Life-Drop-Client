import React from 'react'
import SectionTitle from './SectionTitle'
import donation from "../assets/images/donation.jpg"
import bloodBank from "../assets/images/bloodBank.jpg"
import health from "../assets/images/health.jpg"

const Features = () => {
    return (
        <>
            <SectionTitle heading={"Features"} subHeading={"Be someone's lifeline"} />

            <div className='w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10'>
                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-5 pt-5">
                        <img src={donation} alt="donation" className="rounded-xl h-[200px] lg:h-[200px] md:h-[200px] w-full" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Blood Donation</h2>
                        <p>Life of some patients is resting on a fraction of hope in quest of your gift of love.</p>
                        
                    </div>
                    <div className='bg-black text-white py-3 text-center'>
                        <button>Join Now</button>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-5 pt-5">
                        <img src={health} alt="donation" className="rounded-xl h-[200px] lg:h-[200px] md:h-[200px] w-full" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Health Checkup</h2>
                        <p>Blood donation is important in life; it gives others a hope to survive.</p>
                        
                    </div>
                    <div className='bg-red-600 text-white py-3 text-center'>
                        <button>Join Now</button>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-5 pt-5">
                        <img src={bloodBank} alt="donation" className="rounded-xl h-[200px] lg:h-[200px] md:h-[200px] w-full" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Blood Bank</h2>
                        <p>Money cannot save him but its your blood, so just donate don't hesitate.</p>
                        
                    </div>
                    <div className='bg-black text-white py-3 text-center'>
                        <button>Join Now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Features
