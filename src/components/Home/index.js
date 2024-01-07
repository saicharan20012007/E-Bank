import './index.css'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'

const Home = props => {
  const logBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props

    history.replace('/ebank/login')
  }

  return (
    <div className="home-bg-container">
      <div className="home-header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" className="logout-btn" onClick={logBtn}>
          Logout
        </button>
      </div>
      <div className="home-main-container">
        <h1 className="home-title">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card"
        />
      </div>
    </div>
  )
}

export default withRouter(Home)
