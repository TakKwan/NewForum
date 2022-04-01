import { useEffect, useState } from 'react'
import Post from './Post'
import SearchBar from './SearchBar'
import axios from 'axios'
import { backend } from '../resources/resources'
import NewPost from './NewPost'

const Forum = ({ userId }) => {
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    if (!posts.length) {
      const result = await getPosts()
      if (result.data.length) setPosts(result.data)
    }
  }, [posts])

  const getPosts = () => {
    return axios.get(backend.baseUrl + backend.post.readAll)
  }

  const setPost = (post) => {
    setPosts([post, ...posts])
  }

  const removePost = (postToRemove) => {
    setPosts(
      posts.filter(
        (post) => post._id !== postToRemove._id || userId !== postToRemove.user
      )
    )
  }

  return (
    <div className="forum">
      <SearchBar onSubmit={setPosts} />
      {posts.map((post) => (
        <Post
          key={post._id}
          {...post}
          disabled={post.user._id !== userId}
          removePost={removePost}
        />
      ))}
      {userId && <NewPost userId={userId} setPost={setPost} />}
    </div>
  )
}

export default Forum
