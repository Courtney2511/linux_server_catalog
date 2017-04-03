import React from 'react'
import '../../styles/form.scss'
import axios from 'axios'

export default class FacebookLogin extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.Event.subscribe('auth.statusChange', (response) => {  // eslint-disable-line no-undef
        console.log('auth status change was called with status ' + response.status)
        this.statusChangeCallback(response)
      })

      FB.init({ // eslint-disable-line no-undef
        appId: 398313963869826,
        cookie: true, // enable cookies to allow server access to the session
        xfbml: true, // parse socail plugins on this page
        version: 'v2.8',
        status: true // asks facebook to return the auth status on this init call to save a separate call to getLoginStatus
      })
    }

    // load and initialize the SDK asynchronously
    (function(d, s, id){
       var fjs = d.getElementsByTagName(s)[0]
       if (d.getElementById(id)) {return}
       var js = d.createElement(s); js.id = id
       js.src = "//connect.facebook.net/en_US/sdk.js"
       fjs.parentNode.insertBefore(js, fjs)
     }(document, 'script', 'facebook-jssdk'))
  }

  handleUserResponse(response) {
    console.log(response)
    console.log('Successful login for: ' + response.name)
    document.getElementById('status').innerHTML =
    'Thanks for logging in, ' + response.name + '!'

    var data = response

    axios.post('http://localhost:5000/fblogin', { data })
    .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })

  }

  // get user info from Graph API after a successful login
  getUserInfo() {
    console.log('Welcome!  Fetching your information.... ')
    FB.api('/me', {fields: 'first_name, last_name, email, name, age_range, birthday, cover, gender, hometown, location, significant_other'}, this.handleUserResponse)
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
        <h1>Facebook Login</h1>
        <a href="#" onClick={this.handleClick}>Login</a>
        <span id="status"></span>
      </div>
    )
  }
}
