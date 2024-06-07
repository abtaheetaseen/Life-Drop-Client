import React, { useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import FilteredDataForSearch from '../components/FilteredDataForSearch';
import toast from 'react-hot-toast';

const SearchDonor = () => {

  const axiosPublic = useAxiosPublic();
  const [searchData, setSearchData] = useState([]);
  console.log(searchData)


  const [selectDivision, setSelectDivision] = useState("");
  const [selectDistrict, setSelectDistrict] = useState("");
  const [selectUpazila, setSelectUpazila] = useState("");
  const [selectBloodGroup, setSelectBloodGroup] = useState("");

  const handleDivision = (e) => {
    setSelectDivision(e.target.value);
}

const handleDistrict = (e) => {
    setSelectDistrict(e.target.value);
}

const handleUpazila = (e) => {
    setSelectUpazila(e.target.value);
}

const handleBloodGroup = (e) => {
    setSelectBloodGroup(e.target.value);
}

const {data: divisions = []} = useQuery({
    queryKey: ["divisions"],
    queryFn: async() => {
        const res = await axiosPublic.get("/divisions")
        return res.data;
    }
})

const {data: districts = []} = useQuery({
    queryKey: ["districts"],
    queryFn: async() => {
        const res = await axiosPublic.get("/districts")
        return res.data;
    }
})

const {data: upazilas = []} = useQuery({
    queryKey: ["upazilas"],
    queryFn: async() => {
        const res = await axiosPublic.get("/upazilas")
        return res.data;
    }
})

const {data: allDonors = []} = useQuery({
  queryKey: ["allDonorsData"],
  queryFn: async() => {
    const res = await axiosPublic.get("/allDonors");
    return res.data;
  }
})

const handleSearch = (e) => {
  e.preventDefault();
  const division = selectDivision;
  const district = selectDistrict;
  const upazila = selectUpazila;
  const bloodGroup = selectBloodGroup;

  const filteredData = allDonors.filter(donor => donor.division === division && donor.district === district && donor.upazila === upazila && donor.bloodGroup === bloodGroup);

  if(filteredData.length > 0){
    toast.success("Donors found")
  }

  if(filteredData.length === 0){
    toast.error("No donors found")
  }

  setSearchData(filteredData);

}

  return (
    <>
      <SectionTitle heading={"Search Donors"} />

      <section className="bg-white mb-[100px]">
        <div className="container flex items-center justify-center mx-auto">
          <form onSubmit={handleSearch} className="w-full max-w-md">

            <div className='mb-5'>
              <label className="text-red-600" htmlFor="divisions">Division</label>
              <select value={selectDivision} onChange={handleDivision} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
                {
                  divisions.map(division => <option key={division._id}>
                    {division.division_name}
                  </option>)
                }
              </select>
            </div>

            <div className='mb-5 mt-4'>
              <label className="text-red-600" htmlFor="districts">District</label>
              <select value={selectDistrict} onChange={handleDistrict} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
                {
                  districts.map(district => <option key={district._id}>
                    {district.name}
                  </option>)
                }
              </select>
            </div>

            <div className='mb-5 mt-4'>
              <label className="text-red-600" htmlFor="upazilas">Upazila</label>
              <select value={selectUpazila} onChange={handleUpazila} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
                {
                  upazilas.map(upazila => <option key={upazila._id}>
                    {upazila.name}
                  </option>)
                }
              </select>
            </div>

            <div className='mb-5 mt-4'>
              <label className="text-red-600" htmlFor="bloodGroup">Blood Group</label>
              <select value={selectBloodGroup} onChange={handleBloodGroup} className="select select-bordered block w-full py-3 text-gray-700 bg-white border rounded-lg  dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40">
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            <div className="mt-6">
              <input className="cursor-pointer w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500" type="submit" value="Search" />


            </div>
          </form>
        </div>

      </section>

<div className='flex items-center justify-center mb-[100px]'>
      <div className='grid grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2'>
        {
          searchData?.map(data => <FilteredDataForSearch data={data} key={data._id} />)
        }
      </div>
      </div>
    </>
  )
}

export default SearchDonor
