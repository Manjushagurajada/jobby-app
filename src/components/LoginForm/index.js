import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  getSuccessResponse = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  getFailureResponse = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getSuccessResponse(data.jwt_token)
    } else {
      this.getFailureResponse(data.error_msg)
    }
  }

  onChangeName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg, showError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form
          type="submit"
          className="login-form"
          onSubmit={this.onSubmitLoginForm}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="jobby-logo"
          />
          <div className="input-container">
            <label htmlFor="name" className="label-heading">
              USERNAME
            </label>
            <input
              type="text"
              id="name"
              placeholder="Username"
              className="login-search-bar"
              value={username}
              onChange={this.onChangeName}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label-heading">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="login-search-bar"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showError && <p className="error-msg">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
