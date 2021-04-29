const express = require('express')
const UserRepo = require('../repos/users-repo')

const router = express.Router()

router.get('/users', async (req, res) => {
  const users = await UserRepo.find()
  res.send(users)
})

router.get('/users/:id', async (req, res) => {
  const user = await UserRepo.findById(req.params.id)

  if (user) {
    res.send(user)
  } else {
    res.sendStatus(404)
  }
})

router.post('/users', async (req, res) => {
  const { username, bio } = req.body
  console.info({ username, bio })

  const newUser = await UserRepo.insert({ username, bio })
  res.send(newUser)
})

router.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { username, bio } = req.body

  const updatedUser = await UserRepo.update(id, { username, bio })

  if (updatedUser) {
    return res.send(updatedUser)
  }
  
  res.sendStatus(404)
})

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params

  const deletedUser = await UserRepo.delete(id)

  if (deletedUser) {
    return res.send(true)
  }

  res.sendStatus(404)
})

module.exports = router