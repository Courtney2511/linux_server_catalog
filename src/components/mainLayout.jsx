import React from 'react'
import { connect } from 'react-redux'

import '../../styles/main.scss'
import MainNavigation from './MainNavigation.jsx'
import { Link } from 'react-router'


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

class MainLayout extends React.Component {

  render() {
    const { username, isLoggedIn } = this.props.user
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

MainLayout.propTypes = {
  user: React.PropTypes.object
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(MainLayout)
