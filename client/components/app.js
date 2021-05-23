import React, { useState, useEffect, useCallback } from 'react'
import Header from './header'
import Clinics from './clinics'
import Services from './services'
import DateSelect from './dateSelect'
import AvailableTimes from './availableTimes'
import { getClinicsData, getServicesData } from './api'

const App = () => {
  const [clinics, setClinics] = useState([])
  const [services, setServices] = useState([])

  const [pickedClinic, setPickedClinic] = useState(null)
  const [pickedService, setPickedService] = useState(null)

  const [timeSlots, setTimeSlots] = useState([])
  const [datesInterval, setDatesInterval] = useState([])

  useEffect(() => {
    Promise.all([getClinicsData(), getServicesData()]).then(([clinic, service]) => {
      setClinics(clinic)
      setServices(service)
    })
  }, [])

  const clinicCallback = useCallback(
    (clinicId) => {
      setPickedClinic(clinicId)
    },
    [setPickedClinic]
  )
  const serviceCallback = useCallback(
    (serviceId) => {
      setPickedService(serviceId)
    },
    [setPickedService]
  )
  const intervalCallback = useCallback(
    (interval) => {
      setDatesInterval(interval)
    },
    [setDatesInterval]
  )

  const getTimeSlots = async () => {
    if (datesInterval.length) {
      const queries = datesInterval.reduce((acc, date) => {
        return [
          ...acc,

            {

              [date]: `https://kf26hhwnj8.execute-api.eu-west-1.amazonaws.com/fedorovak/clinics/${pickedClinic}/services/${pickedService}/timeslots/${date}`
            }

        ]
      }, [])
      Promise.all(
        queries.map((it) =>
          fetch(Object.values(it)[0], {
            method: 'GET',
            headers: {
              'x-api-key': 'PFbNaRl06n6vwGjTXbMq23WevaheA00C7e9lOMmG',
              'Content-Type': 'application/json'
            }
          }).then((res) => res.json())
        )
      )
        .then((data) => queries.map((elem, index) => ({ [Object.keys(elem)[0]]: data[index] })))
        .then((data) => data.filter((day) => Object.values(day)[0].length !== undefined))
        .then((data) => setTimeSlots(data))
    }
  }

  if (!clinics.length || !services.length) {
    return <div className="flex items-center justify-center h-screen">...Loading</div>
  }

  console.log('datesInterval:', datesInterval, 'timeslots from server', timeSlots)

  return (
    <div className="bg-gray-100 h-full pb-4">
      <Header />
      <div className="md:m-24 rounded-lg h-full flex flex-col bg-white xl:flex-row shadow-lg">
        <div className="flex flex-col md:rounded-md bg-purple-100 md:bg-white space-y-10 md:space-y-20 px-8 pb-20 md:px-24 md:py-20 xl:w-1/2">
          <span className="font-bold self-center hidden md:block">Preferences</span>
          <Clinics clinics={clinics} select={clinicCallback} />
          <Services services={services} select={serviceCallback} />
          <DateSelect selectInterval={intervalCallback} />
          <div className="flex md:justify-center xl:justify-start">
            <button
              className={`${
                !datesInterval.length ? 'bg-gray-400' : 'bg-blue-400 hover:bg-blue-300'
              } w-full md:w-44 xl:w-28 p-4 border rounded-lg text-white font-bold`}
              type="button"
              disabled={!datesInterval.length}
              onClick={() => getTimeSlots()}
            >
              Search
            </button>
          </div>
        </div>
        <div className="w-full h-auto bg-white rounded-md">
          <AvailableTimes times={timeSlots} clinicId={pickedClinic} serviceId={pickedService} />
        </div>
      </div>
    </div>
  )
}

App.propTypes = {}

export default React.memo(App)
