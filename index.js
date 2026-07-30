const express = require('express')
const cors = require('cors')
const route = require('./routes/index')

const app = express()

app.use(cors({
  origin: '*'
}))

app.use(express.json())

app.use('/', route)

module.exports = app