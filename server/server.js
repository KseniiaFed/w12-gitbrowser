import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'
import { nanoid } from 'nanoid'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile } = require('fs').promises
require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const result = await readFile(`${__dirname}/tasks/${category}.json`, { encoding: "utf8" })
    .then((text) => {
      const data = JSON.parse(text)
      const filtered = data
    })
    .catch(() => {
      const file = [{
        taskId: nanoid(),
        title: req.body.title,
        status: 'new',
        _isDeleted: false,
        _createdAt: +new Date(),
        _deletedAt: null
      }]
      writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(file), { encoding: "utf8" })
      return file
    })
  res.json(result)
})

server.get('/api/v1/tasks/:category/:timespan', async (req, res) => {
  const { category, timespan } = req.params
  const result = await readFile(`${__dirname}/tasks/${category}.json`, { encoding: 'utf8' })
  res.json(result)
})



server.post('/api/v1/tasks/:category', async (req, res) => {
  const { category } = req.params
  const newTask = req.body.title
  const result = await readFile(`${__dirname}/tasks/${category}.json`, { encoding: 'utf8' })
    .then((text) => {
      const taskList = JSON.parse(text)
      const taskListUpdated = [...taskList, {taskId: nanoid(), title: newTask, status:'new', _isDeleted: false, _createdAt: +new Date(), _deletedAt: null}]
      writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(taskListUpdated), { encoding: "utf8" })
      return { status: 'added', result: taskListUpdated }
    })
    .catch( async () => {
      const file = [
        {
          taskId: nanoid(),
          title: newTask,
          status: 'new',
          _isDeleted: false,
          _createdAt: +new Date(),
          _deletedAt: null
        }
      ]
      writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(file), { encoding: 'utf8' })
      return { status: 'newCategoryCreated', result: file}
    })
  res.json(result)
})

server.delete('/api/v1/tasks/:category/:id', async (req, res) => {
  const { id } = req.params
  const { category } = req.params
  const result = await readFile(`${__dirname}/tasks/${category}.json`, { encoding: 'utf8' })
    .then((text) => {
      const taskList = JSON.parse(text)
      const taskListUpdated = taskList.map(it => it.taskId === id ? { ...it, _isDeleted: true } : it )
      writeFile(`${__dirname}/tasks/${category}.json`, JSON.stringify(taskListUpdated), { encoding: 'utf8' })
      return { status: 'deleted', result: taskListUpdated}
    })
  res.json(result)
})






server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')

server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
