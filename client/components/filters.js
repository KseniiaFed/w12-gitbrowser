import React, { useState } from 'react'

const Filters = ({ clinics, services }) => {
  const [selected, setSelected] = useState(clinics[0])
  return (
    <div className="flex flex-col px-24 py-20 justify-center font-bold items-start space-y-20">
      <div>
        <span>Clinic</span>
        <div>
          {clinics.map((it) => {
            return <div key={it.clinicId}>{it.streetAddress}</div>
          })}
        </div>
      </div>
      <div>
        <span>Service</span>
        <div>
          {services.map((it) => {
            return <div key={it.serviceId}>{it.name}</div>
          })}
        </div>
      </div>
      <div className="flex flex-row space-x-2">
        <span>From Date</span>
      </div>
      <div>
        <span>To Date</span>
      </div>
      <button className="p-4 border rounded-lg bg-blue-300 text-white font-bold" type="button">
        Search
      </button>
    </div>
  )
}

export default Filters
