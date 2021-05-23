import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { DateTime, Interval } from 'luxon'
import { addDays } from 'date-fns'
import './datepicker.css'

const DateSelect = ({ selectInterval }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const isWeekday = (date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  const onStartChange = (date) => {
    setStartDate(date)
    if (endDate && date === endDate) {
      const start = date.getTime()
      const end = endDate.getTime()
      const interval = Interval.fromDateTimes(DateTime.fromMillis(start), DateTime.fromMillis(end))
        .splitBy({ days: 1 })
        .map((d) => d.start)
        .map((d) => d.toFormat('yyyy-MM-dd'))
      selectInterval(interval)
    } else {
      const timestamp = date.getTime()
      const formatDate = DateTime.fromMillis(timestamp).toFormat('yyyy-MM-dd')
      selectInterval([formatDate])
    }
  }

  const onEndChange = (date) => {
    setEndDate(date)
    if (startDate) {
      const start = startDate.getTime()
      const end = date.getTime()
      const interval = Interval.fromDateTimes(DateTime.fromMillis(start), DateTime.fromMillis(end))
        .splitBy({ days: 1 })
        .map((d) => d.start)
        .map((d) => d.toFormat('yyyy-MM-dd'))
      selectInterval(interval)
    }
  }

  return (
    <div className="flex flex-col space-y-10 md:space-y-20 w-full">
      <div className="flex flex-col xl:flex-row w-full md:space-y-4 xl:space-y-0 xl:space-x-4 font-bold justify-between items-start xl:items-center">
        <span className="hidden md:block">Date From</span>
        <div className="relative w-full xl:w-56">
          <DatePicker
            selected={startDate}
            onChange={onStartChange}
            filterDate={isWeekday}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            placeholderText="Select day"
            className="relative w-full xl:w-56 bg-white border border-gray-300 rounded-md shadow-sm pl-5 pr-10 py-4 xl:py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 xl:text-sm"
          />
        </div>
      </div>
      <div className="flex flex-col xl:flex-row w-full md:space-y-4 xl:space-y-0 xl:space-x-4 font-bold justify-between items-start xl:items-center">
        <span className="hidden md:block">Date To</span>
        <div className="relative w-full xl:w-56">
          <DatePicker
            selected={endDate}
            onChange={onEndChange}
            filterDate={isWeekday}
            dateFormat="yyyy-MM-dd"
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            maxDate={addDays(startDate, 7)}
            placeholderText="Select day"
            className="relative w-full xl:w-56 bg-white border border-gray-300 rounded-md shadow-sm pl-5 pr-10 py-4 xl:py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 xl:text-sm"
          />
        </div>
      </div>
    </div>
  )
}

export default DateSelect
