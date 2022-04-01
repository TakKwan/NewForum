const express = require('express')
const cors = require('cors')
const db = require('./db')
const logger = require('morgan')
const controllers = require('./controllers')

const PORT = process.env.PORT || 3001

const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/client/build`))

// routes
app.get('/', (req, res) => res.send('Hello!'))

app.post('/post', controllers.post.createOne)
app.get('/post/:postId', controllers.post.readOne)
app.get('/posts', controllers.post.readAll)
app.get('/searchposts', controllers.post.searchPosts)
app.get('/getuserposts', controllers.post.getUserPosts)
app.put('/post', controllers.post.updateOne)
app.delete('/post', controllers.post.deleteOne)

app.post('/user', controllers.user.createOne)
app.get('/user/:userId', controllers.user.readOne)
app.post('/getuser', controllers.user.getUser)
app.get('/users', controllers.user.readAll)
app.put('/user', controllers.user.updateOne)
app.delete('/user', controllers.user.deleteOne)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
})
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
