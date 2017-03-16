import React from 'react'
import '../styles/form.scss'
import axios from 'axios'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div className="form-container">
        <h2>Sign In</h2>
        <form>
          <input type="text" name="username" placeholder="username"></input>
            <div className="form-error"></div>
          <input type="password" name="password" placeholder="pasword"></input>
            <div className="form-error"></div>
          <input className="submit-button" type="submit" value="ok"></input>
        </form>
      </div>
    )
  }
}
