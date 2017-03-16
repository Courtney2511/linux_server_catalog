import React from 'react'
import '../styles/main.scss'
import axios from 'axios'


export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      error_username: '',
      error_email: '',
      error_password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    const self = this
    event.preventDefault()
    axios.post('http://localhost:5000/signup', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then(function(response) {
      const data = response.data
      if (!data.success) {
        self.setState({
          error_username: data.error_username,
          error_email: data.error_email,
          error_password: data.error_password
        })
      }
      console.log(response)
    }).catch(function(error) {
      console.log(error)
    })
  }

  render() {
    return (
      <div className = "form-container">
        <h2>Join our community!</h2>
        <form action="" method="POST" onSubmit={ this.handleSubmit }>
	         <input type="text" name="username" value={ this.state.username } onChange={ this.handleChange } placeholder="name"/> { this.state.error_username }
           <input type="text" name="email" value={ this.state.email } onChange={ this.handleChange } placeholder="email"/> { this.state.error_email}
	         <input type="text" name="password" value={ this.state.password } onChange= { this.handleChange } placeholder="password"/> { this.state.error_password}
          <div className="form-submit">
            <input className="submit-button" type="submit" value="Let's Go!"></input>
          </div>
        </form>
      </div>
    )

  }
}
