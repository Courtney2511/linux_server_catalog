import React from 'react'
import '../../styles/form.scss'
// import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import { browserHistory } from 'react-router'


class FacebookLogin extends React.Component {

  constructor(props) {
    super(props)
    window.fbAsyncInit = () => {
      FB.Event.subscribe('auth.statusChange', (response) => {  // eslint-disable-line no-undef
        console.log('auth status change was called with status ' + response.status)
        this.statusChangeCallback(response)
      })
      // Initialize the settings for Facebook
      FB.init({ // eslint-disable-line no-undef
        appId: 398313963869826,
        cookie: true, // enable cookies to allow server access to the session
        xfbml: true, // parse socail plugins on this page
        version: 'v2.8',
        status: true // asks facebook to return the auth status on this init call to save a separate call to getLoginStatus
      })
    }

    // load and initialize the Facebook SDK asynchronously
    (function(d, s, id){
       var fjs = d.getElementsByTagName(s)[0]
       if (d.getElementById(id)) {return}
       var js = d.createElement(s); js.id = id
       js.src = "//connect.facebook.net/en_US/sdk.js"
       fjs.parentNode.insertBefore(js, fjs)
     }(document, 'script', 'facebook-jssdk'))
  }

  handleUserResponse(response, loginWithFacebook) {
    console.log(response)
    console.log('Successful login for: ' + response.name)
    document.getElementById('status').innerHTML =
    'Thanks for logging in, ' + response.name + '!'

    var data = response

    loginWithFacebook(data)

    .then(() => {
      if (this.props.user.isLoggedIn) {
        browserHistory.push('/')
      }
    })
    .catch(function (error) {
      console.log(error)
    })

  }

  // get user info from Graph API after a successful login
  getUserInfo() {
    console.log('Welcome!  Fetching your information.... ')
    FB.api('/me', {fields: 'first_name, last_name, email, name, age_range, birthday, cover, gender, hometown,   location, significant_other'}, (response) => this.handleUserResponse(response, this.props.actions.loginWithFacebook))  // eslint-disable-line
  }

  // callback to test the Graph API after login
  statusChangeCallback(response) {
    console.log('status change callback was called with status ' + response.status)
    console.log(response)
    if (response.status === 'connected') {
      this.getUserInfo()
    } else if (response.status === 'not authorized') {
      document.getElementsById('status').innerHTML = 'Please Log into facebook'
    }
  }

  handleClick() {
    FB.login(null, {scope: 'email, public_profile'}) // eslint-disable-line
  }

  render() {
    return(
      <div>
        <h2>Facebook Login</h2>
        <button className="facebook" href="#" onClick={this.handleClick}>Login with Facebook</button>
        <br></br>
        <span id="status"></span>
          <div className="fb-like" data-share="true" data-width="450" data-show-faces="true"></div>
          <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
      </div>
    )
  }
}

FacebookLogin.PropTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FacebookLogin)
