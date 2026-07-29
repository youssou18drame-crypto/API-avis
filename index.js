const express = require('express')
const cors = require('cors') 
const route = require('./routes/index')
const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

app.use(express.json())
app.use('/', route)

const prisma = require('./lib/prisma')

if (process.env.NODE_ENV !== 'production') {
  const server = app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000')
  })

  const shutdown = async () => {
    await prisma.$disconnect()
    server.close(() => process.exit(0))
  }

  process.on('SIGINT', shutdown)
  process.on('SIGTERM', shutdown)
}

module.exports = app