import React from 'react'

const SectionTitle = ({heading, subHeading}) => {
    return (
            <div className='w-4/12 mx-auto my-[60px]'>

                <h1 className='text-3xl font-body font-bold text-center mb-3'>{heading}</h1>
                <p className='text-center mb-3'>{subHeading}</p>
                <hr className='border-2 border-red-600 w-4/12 md:w-2/12 lg:w-2/12 mx-auto my-0'/>
            </div>
    )
}

export default SectionTitle
