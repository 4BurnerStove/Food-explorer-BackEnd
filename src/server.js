require('express-async-errors')
const AppError = require('./utils/AppError')
const database = require('./database/sqlite')
const uploadConfig = require('./configs/upload')

const cors = require('cors')

const express = require('express')

const routes = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/files', express.static(uploadConfig.UPLOAD_FOLDER))

app.use(routes)

database()

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 5555
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
