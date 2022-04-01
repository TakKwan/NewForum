import React, { useState } from 'react'
import { useEffect } from 'react'
import { backend } from '../resources/resources'
import axios from 'axios'
import Post from './Post'

const Profile = ({ user }) => {
  const [posts, setPosts] = useState([])

  useEffect(async () => {
    const result = await getPosts()
    setPosts(result.data)
  }, [])

  const getPosts = () => {
    return axios.get(backend.baseUrl + backend.post.getUserPosts, {
      params: { userId: user._id }
    })
  }

  return (
    <div className="profile">
      <h1> {user.username} </h1>
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  )
}

export default Profile
