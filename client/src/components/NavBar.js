import { Link } from 'react-router-dom'
import { frontend } from '../resources/resources'

const NavBar = ({ user, setUser }) => {
  const signOut = () => {
    setUser(null)
  }

  return (
    <div className="navbar">
      <Link to={frontend.home}>Home</Link>
      {!user && <Link to={frontend.signIn}>SignIn</Link>}
      {!user && <Link to={frontend.signUp}>SignUp</Link>}
      {user && <Link to={frontend.profile}>{user.username}</Link>}
      {user && <button onClick={signOut}>Sign Out</button>}
    </div>
  )
}

export default NavBar
