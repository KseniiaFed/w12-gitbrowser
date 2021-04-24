import React, { useState } from 'react'
import Head from './head'
import { history } from '../redux'

// const InputUserName = (props) => {
//   const [value, setValue] = useState('')
//   const onChange = (e) => {
//     const newValue = e.target.value
//     setValue(newValue)
//     props.mainCallback(newValue)
//   }
//   return (
//     <div>
//       <input
//         type="text"
//         className="text-black"
//         onChange={onChange}
//         value={value}
//       />
//     </div>
//   )
// }

const Main = () => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    // const newValue = e.target.value
    setValue(e.target.value)
  }
  // const myCallback = (data) => {
  //   setValue(data)
  // }
  const handleClick = () => {
    history.push(`/${value.trim()}`)
  }
  return (
    <div>
      <Head title="Hello" />
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center space-y-2 bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
          <div>Enter username</div>
          <input
            id="input-field"
            type="text"
            className="text-black"
            onChange={onChange}
            value={value}
          />
          <button
            id="search-button"
            type="button"
            className="font-bold"
            onClick={handleClick}>
              Search
          </button>
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {}

export default React.memo(Main)
