import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import * as Actions from '../../actions'
import styles from '../../../styles/form.scss'
import FacebookLogin from '../facebookLogin'

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
      <div className={styles['form-container']}>
        <div className={styles['form-header']}>
          <h2>Sign In</h2>
        </div>
        {
          (this.props.user.isSignedUp)
         ? <div className={styles['highlight']}>You have successfully signed up, please log in</div>
         : null
        }
        <form action="" method='POST' onSubmit={event => this.handleSubmit(event)}>
          <input type="text" name="username" placeholder="username"></input>
            <div className={styles['form-error']}></div>
          <input type="password" name="password" placeholder="password"></input>
            <div className={styles['form-error']}>{this.props.user.login.error}</div>
          <input className={styles['submit-button']} type="submit" value="ok"></input>
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
