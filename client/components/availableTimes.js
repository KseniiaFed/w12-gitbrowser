import React, { useState, useCallback } from 'react'

const AvailableTimes = ({ times, clinicId, serviceId }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [clickedSlot, setClickedSlot] = useState([])
  const [isBooked, setIsBooked] = useState(false)

  const onClick = useCallback((date, start, end) => {
    const arr = [date, start, end]
    setClickedSlot(arr)
    setIsClicked(!isClicked)
  }, [])

  const book = () => {
    fetch('https://kf26hhwnj8.execute-api.eu-west-1.amazonaws.com/fedorovak/booking/create', {
      method: 'POST',
      headers: {
        'x-api-key': 'PFbNaRl06n6vwGjTXbMq23WevaheA00C7e9lOMmG',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "clinicId": clinicId,
        "serviceId": serviceId,
        "date": clickedSlot[0],
        "startTime": clickedSlot[1],
        "endTime": clickedSlot[2]
      })
    }).then((r) => r.json())
    .then(setIsBooked(true))
  }

  return (
    <div className="flex flex-col items-center justify-center relative px-8 md:px-0">
    <div className={`${isBooked ? "hidden" : "block"} flex flex-col items-center justify-start h-full sm:px-24 xl:px-12 py-20 space-y-10`}>
      <div className="flex flex-row space-x-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        <p className="font-bold text-black">Available Times</p>
      </div>

      <div className="flex flex-col space-y-16 mt-4">
        {times?.map((day) => {
          return (
            <div key={Object.keys(day)[0]} className="flex flex-col space-y-4">
              <span className="font-bold text-gray-400">{Object.keys(day)[0]}</span>
              <div className="grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-3 gap-12 2xl:grid-cols-6 lg:gap-6 xl:gap-12 mt-4">
                {Object.values(day)[0].map((slot) => {
                  return (
                    <button
                      type="button"
                      key={slot.startTime}
                      onClick={() => onClick(Object.keys(day)[0], slot.startTime, slot.endTime)}
                      className="group focus:bg-indigo-500 border rounded shadow-md px-6 py-2 hover:bg-indigo-500 hover:text-white"
                    >
                      {slot.startTime.slice(1, 6)}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div
        className={`${
          isClicked ? 'block' : 'hidden'
        } flex md:justify-center xl:justify-center w-full px-8`}
      >
        <button
          type="button"
          onClick={() => book()}
          className="bg-purple-500 hover:bg-purple-400 w-full md:w-44 xl:w-28 p-4 border rounded-lg text-white font-bold mt-10"
        >
          Book
        </button>
      </div>

    </div>
      <div
        className={`${
          isBooked ? 'block' : 'hidden'
        } bg-purple-500 w-full mt-24 mb-24 md:w-1/2 xl:w-1/2 p-12 border text-center rounded-lg text-white font-bold mt-10`}
      >
        Thank you for booking!
      </div>
    </div>
  )
}

export default AvailableTimes
