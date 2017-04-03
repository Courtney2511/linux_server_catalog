import React from 'react'
import '../../styles/main.scss'
import MainNavigation from './MainNavigation.jsx'
import { Link } from 'react-router'
import jwt_decode from 'jwt-decode'


function logout() {
  sessionStorage.removeItem('jwtToken')
  console.log(sessionStorage)
}

function LoginPanel() {
  return(
  <div>
    <div className="log-in">
      <i className="fa fa-sign-in" aria-hidden="true"></i>
      <Link to="/login">Log In</Link>
    </div>

    <div className="sign-up">
      <i className="fa fa-user-o" aria-hidden="true"></i>
      <Link to="/signup">Sign Up</Link>
    </div>
  </div>
)}

function Dashboard(props) {
  return(
    <div>
      <h3>Welcome {props.username}</h3>
      <button id="logout" onClick={logout}>Log Out</button>
    </div>
  )
}

export default class MainLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      username: ''
    }
  }


  componentWillMount() {
    const token = sessionStorage.getItem('jwtToken')
    if (token) {
      var decoded = jwt_decode(token)
      // controls state based on log in status
      this.setState({
        isLoggedIn: decoded.isLoggedIn,
        username: decoded.username
      })
    }
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn
    const username = this.state.username
    let panel = null

    if (isLoggedIn) {
      panel = <Dashboard username={username}/>
    } else {
      panel = <LoginPanel />
    }
    return (
      <container>
      <header>
        <div className="main-header">
          <div className="header-left">
            <i className="fa fa-bomb fa-lg" aria-hidden="true"></i>
            <h1 className="title">PHOTOBOMB</h1>
          </div>
          <div className="header-right">
            {panel}
          </div>
        </div>
        <MainNavigation />
      </header>
      <main>
        {this.props.children}
      </main>
      </container>
    )
  }
}
