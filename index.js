const express = require('express')
const cors = require('cors') // 1. Ajoute cette ligne
const route = require('./BTS-SIO-General-main/api/routes/index')
const app = express()

// 2. Ajoute cette ligne juste après app = express()
app.use(cors()) 

app.use(express.json())
app.use('/', route)

const prisma = require('./lib/prisma')

const server = app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000')
})

// ... reste de ton code (shutdown, etc.)
const shutdown = async () => {
  await prisma.$disconnect()
  server.close(() => process.exit(0))
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)