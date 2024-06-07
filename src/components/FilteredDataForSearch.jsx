import React from 'react'

const FilteredDataForSearch = ({data}) => {

  return (
<div className="card w-96 h-[250px] bg-base-100 shadow-xl image-full">
  <figure><img src={data.image_url} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Donor Name : {data.name.toUpperCase()}</h2>
    <p>Donor Email : {data.email}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-sm border-none text-white bg-red-600 hover:bg-red-500">Contact</button>
    </div>
  </div>
</div>
  )
}

export default FilteredDataForSearch
