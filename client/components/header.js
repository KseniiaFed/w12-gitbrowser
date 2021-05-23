import React from 'react'

const Header = () => {
  return (
    <div className="flex flex-row items-center bg-purple-300 h-14 justify-center">
      <div className="mx-3 text-black hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex justify-center md:w-11/12 text-white font-bold text-xl sm:text-3xl antialiased">
        <span>Therapie Availability Search</span>
      </div>
    </div>
  )
}

export default Header
