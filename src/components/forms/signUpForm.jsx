import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import '../../../styles/main.scss'
import * as Actions from '../../actions'


class SignUpForm extends React.Component {

  // prepares form data for signUpUser action
  handleSubmit(event) {
    event.preventDefault()
    this.props.actions.signUpUser(event.target.username.value, event.target.email.value, event.target.password.value)
    .then(()=> {
      // if success signUp, redirect to login
      if (this.props.user.isSignedUp) {
        browserHistory.push('/login')
      }
    })
  }

  render() {
    return (
      <div className = "form-container">
        <h2>Join our community!</h2>
        <form action="" method="POST" onSubmit={event => this.handleSubmit(event) }>
	         <input type="text" name="username" placeholder="name"/>
            { //displays username errors, if any
              (this.props.user.errors && this.props.user.errors.error_username)
              ? <div className="form-error">{this.props.user.errors.error_username}</div>
              : null
            }
           <input type="text" name="email" placeholder="email"/>
            { // displays email errors, if any
              (this.props.user.errors && this.props.user.errors.error_email)
              ? <div className="form-error">{this.props.user.errors.error_email}</div>
              : null
            }
	         <input type="password" name="password" placeholder="password"/>
           { // displays password errors, if any
             (this.props.user.errors) && (this.props.user.errors.error_password)
             ? <div className="form-error">{this.props.user.errors.error_password}</div>
             : null
           }
          <div className="form-submit">
            <input className="submit-button" type="submit" value="Let's Go!"></input>
          </div>
        </form>
      </div>
    )

  }
}

SignUpForm.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
