import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { frontend, backend } from '../resources/resources'

const SignUp = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: ''
  })

  const submitForm = async (e) => {
    e.preventDefault()
    await axios.post(backend.baseUrl + backend.user.createOne, userInfo)
    cleanForm()
    navigate(frontend.home)
  }

  const formChange = (e, key) => {
    setUserInfo({
      ...userInfo,
      [key]: e.target.value
    })
  }

  const cleanForm = () => {
    setUserInfo({
      username: '',
      email: '',
      password: ''
    })
  }

  return (
    <div className="form">
      <form onSubmit={submitForm}>
        <input
          name="username"
          placeholder="Username"
          value={userInfo.username}
          onChange={(e) => formChange(e, 'username')}
        />
        <input
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={(e) => formChange(e, 'email')}
        />
        <input
          name="password"
          placeholder="Password"
          value={userInfo.password}
          onChange={(e) => formChange(e, 'password')}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp
