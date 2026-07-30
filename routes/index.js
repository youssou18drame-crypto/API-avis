const express = require('express')
const cors = require('cors')

const route = require('./routes/index')

const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With'
  ]
}))

app.use(express.json())

app.use('/', route)

module.exports = app