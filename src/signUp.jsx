import React from 'react'
import '../styles/main.scss'


export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className = "form-container">
        <h2>Join our community!</h2>
        <form>
	         <input type="text" name="username" placeholder="name"/>
           <input type="text" name="email" placeholder="email"/>
	         <input type="text" name="password" placeholder="password"/>
          <div className="form-submit">
            <input className="submit-button" type="submit" value="Let's Go!"></input>
          </div>
        </form>
      </div>
    )

  }
}
