const db = require('../db')
const { Post } = require('../models')

db.on(
  'error',
  console.error.bind(console, 'MongoDB connection error in seed/Post')
)

const main = async () => {
  const onePost = {
    userId: null,
    content: 'Hello!',
    date: new Date()
  }

  console.log(Post.date)

  await Post.insertMany(onePost)
  console.log('Created Posts !')
}
const run = async () => {
  await main()
  db.close()
}

run()
