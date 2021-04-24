import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Markdown from 'markdown-to-jsx'
import Head from './head'
import Header from './header'

const RepoReadMe = () => {
  const { userName, repositoryName } = useParams()
  const [text, setText] = useState('')

  const url = `https://raw.githubusercontent.com/${userName}/${repositoryName}/master/README.md`
  useEffect(() => {
    axios(url)
      .then(({ data }) => data)
      .then((md) => {
        setText(md)
      })
      .catch(() => {
        setText('No README file')
      })
    return () => {}
  }, [userName, repositoryName])

  return (
    <div>
      <Head title="Hello" />
      <Header user={userName} />
      <div className="flex items-center justify-center h-full">
        <div id="description" className="bg-indigo-800 text-white rounded-lg border shadow-lg p-10">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  )
}

RepoReadMe.propTypes = {}

export default React.memo(RepoReadMe)
