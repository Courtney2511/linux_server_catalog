import React from 'react'

import '../styles/main.scss'
import FieldGroup from 'react-bootstrap'


export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className = "signup">
        <form>
	         <FieldGroup id="formControlsText" type="text" label="Text" placeholder="Enter text"/>
	         <FieldGroup id="formControlsEmail" type="email" label="Email address" placeholder="Enter email"/>
	         <FieldGroup id="formControlsPassword" label="Password" type="password"/>
        </form>
      </div>
    )

  }
}
