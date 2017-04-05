import React from 'react'

export default function Dashboard(props) {

  return(
    <div>
      <h3>Welcome {props.user.username}</h3>
      <button id="logout" onClick={() => props.actions.logOutUser(props.user.jwtToken)}>Log Out</button>
    </div>
  )
}
