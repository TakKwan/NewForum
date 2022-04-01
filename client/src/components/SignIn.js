import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { frontend, backend } from '../resources/resources'

const SignIn = ({ setUser }) => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })

  const submitForm = async (e) => {
    e.preventDefault()
    const result = await axios.post(
      backend.baseUrl + backend.user.getUser,
      userInfo
    )
    cleanForm()
    setUser(result.data)
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
      email: '',
      password: ''
    })
  }

  return (
    <div className="form">
      <form onSubmit={submitForm}>
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
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default SignIn
