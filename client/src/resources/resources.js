const frontend = {
  home: '/',
  signUp: '/signup',
  signIn: '/signin',
  profile: '/profile'
}

const backend = {
  baseUrl: 'http://localhost:3001',
  post: {
    createOne: '/post',
    readOne: '/post/:postId',
    readAll: '/posts',
    searchPosts: '/searchposts',
    getUserPosts: '/getuserposts',
    updateOne: '/post',
    deleteOne: '/post'
  },

  user: {
    createOne: '/user',
    readOne: '/user/:userId',
    readAll: '/users',
    updateOne: '/user',
    deleteOne: '/user',
    getUser: '/getuser'
  }
}

export { backend, frontend }
