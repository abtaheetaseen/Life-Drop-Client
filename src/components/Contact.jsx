import React, { useContext } from 'react'
import SectionTitle from './SectionTitle'
import { AuthContext } from '../provider/AuthProvider'

const Contact = () => {

    const {user} = useContext(AuthContext);

  return (
    <>
    <div data-aos="fade-right">
      <SectionTitle heading={"CONTACT US"} subHeading={"At : +8801931183851"} />
      </div>
      <section className="w-10/12 px-6 mb-[60px] mx-auto">

    <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Name</label>
                <input defaultValue={user?.displayName} readOnly={true} name='name' type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 dark:focus:border-red-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">Email Address</label>
                <input defaultValue={user?.email} readOnly={true} name='email' type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 dark:focus:border-red-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Subject</label>
                <input name="subject" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 dark:focus:border-red-300 focus:outline-none focus:ring" />
            </div>

            <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">Message</label>
                <input name='message' type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 focus:ring-red-300 focus:ring-opacity-40 dark:focus:border-red-300 focus:outline-none focus:ring" />
            </div>
        </div>

        <div className="flex justify-center mt-10">
            <input className="px-8 bg-red-600 hover:bg-red-500 cursor-pointer py-2.5 leading-5 text-white duration-300 transform rounded-md"  type="submit" value="Contact US" />
        </div>
    </form>
</section>
    </>
  )
}

export default Contact
