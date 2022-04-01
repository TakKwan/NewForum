import { useState } from 'react'
import axios from 'axios'
import { backend } from '../resources/resources'

const Post = ({ _id, user, content, date, disabled, removePost }) => {
  const [edit, setEdit] = useState(false)
  const [newContent, setNewContent] = useState(content)
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }
  const formattedDate = new Date(date).toLocaleDateString('en-US', dateOptions)

  const onChange = (e) => {
    setNewContent(e.target.value)
  }

  const onSubmit = async (e) => {
    const newPost = {
      _id,
      user: user._id,
      content: newContent,
      date
    }
    e.preventDefault()
    await axios.put(backend.baseUrl + backend.post.updateOne, newPost)
    setEdit(false)
  }

  const onDelete = async (e) => {
    const post = {
      _id,
      user: user._id
    }

    e.preventDefault()
    await axios.delete(backend.baseUrl + backend.post.deleteOne, {
      params: post
    })
    removePost(post)
  }

  return (
    <div className="post">
      <p className="date">{formattedDate}</p>
      <p>{user.username}</p>
      {!edit && <p className="content">{newContent}</p>}
      {edit && (
        <form className="editPost" onSubmit={onSubmit}>
          <input type="text" value={newContent} onChange={onChange} />
          <button type="submit">save</button>
          <button onClick={onDelete}>delete</button>
        </form>
      )}
      {
        <button
          disabled={disabled}
          className="editButton"
          onClick={() => setEdit(!edit)}
        >
          {edit ? 'Cancel' : 'Edit'}
        </button>
      }
    </div>
  )
}

export default Post
