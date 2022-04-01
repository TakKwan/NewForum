const { Post } = require('../models')

const SAFE_USER_FIELDS = {
  _id: 1,
  username: 1
}

const createOne = async (req, res) => {
  try {
    const newPost = await new Post(req.body).populate('user', SAFE_USER_FIELDS)
    await newPost.save()

    return res.status(201).json(newPost)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.query.userId }).populate(
      'user',
      SAFE_USER_FIELDS
    )

    return res.status(201).json(posts)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const searchPosts = async (req, res) => {
  try {
    if (!req.query.searchTerms) return readAll(req, res)
    const query = { $text: { $search: req.query.searchTerms } }
    const posts = await Post.find(query).populate('user', SAFE_USER_FIELDS)

    return res.status(201).json(posts)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const readOne = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId }).populate(
      'user',
      SAFE_USER_FIELDS
    )

    return res.status(201).json(post)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const readAll = async (req, res) => {
  try {
    const posts = await Post.find({})
      .sort({ date: -1 })
      .limit(10)
      .populate('user', SAFE_USER_FIELDS)

    return res.status(201).json(posts)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const updateOne = async (req, res) => {
  try {
    const post = await new Post(req.body)

    const result = await Post.updateOne(
      { userId: post.userId, _id: post._id },
      post
    )

    if (result.modifiedCount > 0) {
      return res.status(201).json()
    } else {
      return res.status(400).json({ error: 'could not update post' })
    }
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const deleteOne = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.query._id, userId: req.query.userId })

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
  searchPosts,
  getUserPosts
}
