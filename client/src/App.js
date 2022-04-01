import Forum from './components/Forum'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import NavBar from './components/NavBar'
import Profile from './components/Profile'
import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './style/App.css'
import { frontend } from './resources/resources.js'

const USER__KEY = 'user'

const getUserFromSessionStorage = () => {
  return JSON.parse(sessionStorage.getItem(USER__KEY) || null)
}

const setUserToSessionStorage = (newUser) => {
  if (!newUser) sessionStorage.removeItem(USER__KEY)
  else sessionStorage.setItem(USER__KEY, JSON.stringify(newUser))
}

const PrivateOutlet = () => {
  const user = getUserFromSessionStorage()
  return user ? <Outlet /> : <Navigate to={frontend.signIn} />
}

function App() {
  const navigate = useNavigate()

  const [user, setUser] = useState(getUserFromSessionStorage())
  const setNewUser = (newUser) => {
    setUser(newUser)
    setUserToSessionStorage(newUser)
    if (!newUser) navigate(frontend.home)
  }

  return (
    <div className="App">
      <NavBar user={user} setUser={setNewUser} />
      <Routes>
        <Route
          exact
          path={frontend.home}
          element={<Forum userId={user ? user._id : null} />}
        />
        <Route
          path={frontend.signUp}
          element={<SignUp setUser={setNewUser} />}
        />
        <Route
          path={frontend.signIn}
          element={<SignIn setUser={setNewUser} />}
        />
        <Route path="/" element={<PrivateOutlet />}>
          <Route path={frontend.profile} element={<Profile user={user} />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
