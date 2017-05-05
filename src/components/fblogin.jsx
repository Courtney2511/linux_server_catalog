import React from 'react'
import '../../styles/form.scss'
import axios from 'axios'

export default class FacebookLogin extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({  // eslint-disable-line no-undef
        appId: '398313963869826',
        xfbml: true,
        version: 'v2.9'
      })
      FB.AppEvents.logPageView()  // eslint-disable-line no-undef
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0]
       if (d.getElementById(id)) {return}
       js = d.createElement(s); js.id = id
       js.src = "//connect.facebook.net/en_US/sdk.js"
       fjs.parentNode.insertBefore(js, fjs)
     }(document, 'script', 'facebook-jssdk'))

     FB.getLoginStatus(function(response) {  // eslint-disable-line no-undef
     statusChangeCallback(response)
 })
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
        <h2>Facebook Login</h2>
        <button className="facebook" href="#" onClick={this.handleClick}>Login with Facebook</button>
        <br></br>
        <span id="status"></span>
          <div className="fb-like" data-share="true" data-width="450" data-show-faces="true"></div>
      </div>
    )
  }
}
