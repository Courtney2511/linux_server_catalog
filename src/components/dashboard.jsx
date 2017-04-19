import React from 'react'
import { Link } from 'react-router'


export default function Dashboard(props) {

  return(
    <div>
      <div className="welcome">
        <p className="hello">Hello
          <Link to={"/users/" + props.user.userId}>
            {props.user.username} :)
          </Link>
        </p>
      </div>
      <div className="add-post">
        <i className="fa fa-camera" aria-hidden="true"></i>
        <Link to="/photos/new" className="post">Post</Link>
      </div>
      <div className="logout">
        <i className="fa fa-sign-out" aria-hidden="true"></i>
        <button id="logout" onClick={() => props.actions.logOutUser(props.user.jwtToken)}>Log Out</button>
      </div>
    </div>
  )
}
