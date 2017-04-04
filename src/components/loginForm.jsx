import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import * as Actions from '../actions'
import '../../styles/form.scss'

class LoginForm extends React.Component {


  handleSubmit(event) {
    event.preventDefault()
    this.props.actions.logInUser(event.target.username.value, event.target.password.value)
    .then(() => {
      if (this.props.user.isLoggedIn) {
        browserHistory.push('/')
      }
    })
  }

  render() {
    return (
      <div className="form-container">
        <h2>Sign In</h2>
        <form action="" method='POST' onSubmit={event => this.handleSubmit(event)}>
          <input type="text" name="username" placeholder="username"></input>
            <div className="form-error"></div>
          <input type="password" name="password" placeholder="pasword"></input>
            <div className="form-error">{this.props.user.login.error}</div>
          <input className="submit-button" type="submit" value="ok"></input>
        </form>
      </div>
    )
  }
}

LoginForm.PropTypes = {
  user: React.PropTypes.object
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
