import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import * as Actions from '../../actions'
import '../../../styles/form.scss'
import FacebookLogin from '../FacebookLogin'

class LoginForm extends React.Component {

  // on LoginForm submit calls the logInUser action and passes username and password
  handleSubmit(event) {
    event.preventDefault()
    this.props.actions.logInUser(event.target.username.value, event.target.password.value)
    // redirects to the index page if user.isLoggedIn = true
    .then(() => {
      if (this.props.user.isLoggedIn) {
        browserHistory.push('/')
      }
    })
  }

  // renders LoginForm
  render() {
    return (
      <div className="form-container">
        <div className="form-header">
          <h2>Sign In</h2>
        </div>
        <form action="" method='POST' onSubmit={event => this.handleSubmit(event)}>
          <input type="text" name="username" placeholder="username"></input>
            <div className="form-error"></div>
          <input type="password" name="password" placeholder="pasword"></input>
            <div className="form-error">{this.props.user.login.error}</div>
          <input className="submit-button" type="submit" value="ok"></input>
        </form>
        <div>
          <FacebookLogin />
        </div>
      </div>
    )
  }
}

LoginForm.PropTypes = {
  user: React.PropTypes.object
}

// maps the store state for user to LoginForm
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
