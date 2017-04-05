import React from 'react'

export default function Dashboard(props) {

  return(
    <div>
      <div className="welcome">
        <p>Hello {props.user.username} :)</p>
      </div>
      <div className="logout">
        <i className="fa fa-sign-out" aria-hidden="true"></i>
        <button id="logout" onClick={() => props.actions.logOutUser(props.user.jwtToken)}>Log Out</button>
      </div>
    </div>
  )
}
