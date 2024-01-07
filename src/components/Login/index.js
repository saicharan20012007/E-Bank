import './index.css'
import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

class Login extends Component {
  state = {uid: '', pin: '', errMsg: ''}

  triggerUID = e => {
    this.setState({uid: e.target.value})
  }

  triggerPIN = e => {
    this.setState({pin: e.target.value})
  }

  onSubmitSuccess = async jwtToken => {
    const {history} = this.props

    await Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    console.log('Redirecting...')
    history.replace('/')
    console.log('Redirected!')
  }

  onFailure = err => {
    this.setState({errMsg: err})
  }

  submissionForm = async e => {
    e.preventDefault()
    const {uid, pin} = this.state
    if (uid === '' && pin === '') {
      this.setState({errMsg: 'Invalid user ID'})
    } else if (pin === '') {
      this.setState({errMsg: 'Invalid PIN'})
    } else {
      const user = {user_id: uid, pin}
      const url = 'https://apis.ccbp.in/ebank/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(user),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      console.log(response)
      if (response.ok) {
        await this.onSubmitSuccess(data.jwt_token)
        console.log('Success')
      } else {
        this.onFailure(data.error_msg)
      }
    }
  }

  render() {
    const {errMsg} = this.state
    return (
      <div className="login-bg-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
          <div className="login-sub-container">
            <h1 className="login-title">Welcome Back!</h1>
            <form onSubmit={this.submissionForm}>
              <label htmlFor="user-id" className="label-element">
                User ID
              </label>
              <br />
              <input
                id="user-id"
                type="text"
                placeholder="Enter User ID"
                className="input-element"
                onChange={this.triggerUID}
              />
              <br />
              <label htmlFor="pass" className="label-element">
                PIN
              </label>
              <br />
              <input
                id="pass"
                type="password"
                placeholder="Enter PIN"
                className="input-element"
                onChange={this.triggerPIN}
              />
              <br />
              <button type="submit" className="login-btn">
                Login
              </button>
              <p>{errMsg}</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
