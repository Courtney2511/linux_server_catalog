import React from 'react'
import '../styles/form.scss'
import axios from 'axios'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    const self = this
    event.preventDefault()
    axios.post('http://localhost:5000/login', {
      username: this.state.username,
      password: this.state.password
    }).then(function(response) {
      const data = response.data
        console.log(response.data)
        if (!data.success) {
          console.log("NOT SUCCESSFUL")
          self.setState({
            error: data.error
          })
        }
    }).catch(function(error) {
      console.log(error)
    })
  }

  render() {
    return (
      <div className="form-container">
        <h2>Sign In</h2>
        <form action="" method='POST' onSubmit= {this.handleSubmit}>
          <input type="text" name="username" value={ this.state.username } onChange={ this.handleChange } placeholder="username"></input>
            <div className="form-error"></div>
          <input type="password" name="password" value={ this.state.password } onChange={ this.handleChange } placeholder="pasword"></input>
            <div className="form-error">{this.state.error}</div>
          <input className="submit-button" type="submit" value="ok"></input>
        </form>
      </div>
    )
  }
}
