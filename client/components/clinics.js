import React, { useState, Fragment, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import cs from 'classnames'

const Clinics = ({ clinics, select }) => {
  const [selectedClinic, setSelectedClinic] = useState(clinics[0])

  useEffect(() => {
    select(selectedClinic.clinicId)
  }, [select, selectedClinic.clinicId])

  return (
    <Listbox
      value={selectedClinic}
      onChange={setSelectedClinic}
      className="flex flex-col xl:flex-row w-full md:space-y-4 xl:space-y-0 xl:space-x-4 items-start justify-between font-bold xl:items-center"
    >
      {({ open }) => (
        <div>
          <span className="hidden md:block">Clinic</span>
          <div className="relative w-full xl:w-56">
            <Listbox.Button className="relative w-full xl:w-56 pl-3 py-4 pr-1 lg:pr-10 xl:py-2 bg-white border border-gray-300 rounded-md shadow-sm text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 xl:text-sm">
              <span className="flex items-center">
                <span className="ml-2 block truncate">
                  {selectedClinic?.streetAddress}, {selectedClinic.city}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-10 mt-1 w-full xl:w-56 bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none md:text-sm"
              >
                {clinics.length > 0 &&
                  clinics.map((clinic) => (
                    <Listbox.Option
                      key={clinic.clinicId}
                      value={clinic}
                      className={({ active }) =>
                        cs(
                          active ? 'text-white bg-indigo-600' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                      }
                    >
                      {({ selected, active }) => (
                        <div>
                          <div className="flex items-center">
                            <span
                              className={cs(
                                selected ? 'font-semibold' : 'font-normal',
                                'ml-3 block truncate'
                              )}
                            >
                              {clinic.streetAddress}, {clinic.city}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={cs(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </span>
                          ) : null}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  )
}

export default Clinics
