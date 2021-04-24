import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <div>
      <div className="flex w-screen justify-center items-center bg-indigo-800 shadow-lg text-white font-bold">
        <div
          id="go-back"
          className="m-4 px-4 py-2 border hover:bg-white hover:text-indigo-800 rounded-lg"
        >
          <Link to="/">BACK</Link>
        </div>
        <div id="repository-name" className="px-5 text-center w-3/4">
          {props.user}
        </div>
        <div
          id="go--repository-list"
          className="m-4 px-4 hover:bg-white hover:text-indigo-800 py-2 border rounded-lg"
        >
          <Link to={`/${props.user}`}>To Repo List</Link>
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {}

export default React.memo(Header)
