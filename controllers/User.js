const { User } = require('../models')

const createOne = async (req, res) => {
  try {
    const newUser = await new User(req.body)
    await newUser.save()
    return res.status(201).json(newUser)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    })

    return res.status(201).json(user)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const readOne = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId })

    return res.status(201).json(user)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const readAll = async (req, res) => {
  try {
    const users = await User.find({})

    return res.status(201).json(users)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const updateOne = async (req, res) => {
  try {
    const user = await new User(req.body)
    const result = await User.updateOne({ _id: user._id }, user)

    if (result.modifiedCount > 0) {
      return res.status(201).json(user)
    } else {
      return res.status(400).json({ error: 'could not update user' })
    }
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const deleteOne = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.query.userId })
    return res.status(201).json()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

module.exports = {
  createOne,
  readOne,
  readAll,
  updateOne,
  deleteOne,
  getUser
}
