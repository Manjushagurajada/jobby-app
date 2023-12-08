import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website-logo"
          className="jobby-logo"
        />
      </Link>
      <ul className="header-unordered-list">
        <Link to="/" className="link-items">
          <li className="header-list-item">
            <h1 className="navbar-headings">Home</h1>
          </li>
        </Link>
        <Link to="/jobs" className="link-items">
          <li className="header-list-item">
            <h1 className="navbar-headings">Jobs</h1>
          </li>
        </Link>
      </ul>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
