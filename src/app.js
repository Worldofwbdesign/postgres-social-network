const express = require('express')
const usersRouter = require('./routes/users') 

module.exports = init = () => {
  const app = express()

  app.use(express.json())
  app.use(usersRouter)
  return app
}