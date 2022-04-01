import axios from 'axios'
import { useState } from 'react'
import { backend } from '../resources/resources'

const NewPost = ({ userId, setPost }) => {
  const [content, setContent] = useState('')
  const onChange = (e) => {
    setContent(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const body = {
      user: userId,
      content,
      date: new Date()
    }
    const result = await axios.post(
      backend.baseUrl + backend.post.createOne,
      body
    )
    setPost(result.data)
  }

  return (
    <form className="newPost" onSubmit={onSubmit}>
      <input
        type="text"
        value={content}
        onChange={onChange}
        placeholder="New Post"
      />
      <button type="submit">post</button>
    </form>
  )
}

export default NewPost
