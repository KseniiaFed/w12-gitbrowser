import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Head from './head'
import Header from './header'

const RepoList = () => {
  const [state, setState] = useState([])
  const { userName } = useParams()
  const url = `https://api.github.com/users/${userName}/repos`
  useEffect(async () => {
    const result = await axios(url)
      .then(({ data }) => data)
    setState(result)
    return () => {}
  }, [userName])

  return (
    <div>
      <Head title="Repos" />
      <Header user={userName} />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-10">
          <ol className="decimal-list">
            {state.map((it) => {
            return (
              <li key={it.id}>
                <Link to={`/${userName}/${it.name}`}>{it.name}</Link>
              </li>
            )
          })}
          </ol>
        </div>
      </div>
    </div>
  )
}

RepoList.propTypes = {}

export default React.memo(RepoList)
