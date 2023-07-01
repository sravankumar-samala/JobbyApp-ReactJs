import Cookies from 'js-cookie'
import {Link, useHistory} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {MdWork} from 'react-icons/md'
import {BiLogOut} from 'react-icons/bi'
import './index.css'

const Header = () => {
  const history = useHistory()

  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
      </div>
      <nav className="navigation">
        <ul className="nav-list-lg nav-list">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <ul className="nav-list-sm nav-list">
          <li>
            <Link to="/">
              <AiFillHome />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <MdWork />
            </Link>
          </li>
          <li className="nav-sm-item">
            <BiLogOut onClick={logout} />
          </li>
        </ul>
      </nav>
      <button className="button logout-btn" type="button" onClick={logout}>
        Logout
      </button>
    </header>
  )
}
export default Header
