import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import '../../styles/main.scss'
import MainNavigation from '../components/MainNavigation.jsx'
import Dashboard from '../components/Dashboard.jsx'
import LoginPanel from '../components/loginPanel.jsx'



class MainLayout extends React.Component {

  render() {
    return (
      <container>
      <header>
        <div className="main-header">
          <div className="header-left">
            <i className="fa fa-bomb fa-lg" aria-hidden="true"></i>
            <h1 className="title">PHOTOBOMB</h1>
          </div>
          <div className="header-right">
            { // displays dashboard or login panel based on log in status
              (this.props.user.isLoggedIn)
              ? <Dashboard user={this.props.user} actions={{ logOutUser: this.props.actions.logOutUser }}/>
              : <LoginPanel />
            }
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

// maps the store state for user to MainLayout props
function mapStateToProps(state) {
  return {
    user: state.user
  }
}

// binds actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

// subscribes MainLayout to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
