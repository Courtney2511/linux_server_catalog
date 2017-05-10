import React from 'react'
import { Link } from 'react-router'


export default function LoginPanel() {
  return(
  <div>
    <div className="log-in">
      <i className="fa fa-sign-in" aria-hidden="true"></i>
      <Link to="/login">Log In</Link>
    </div>

    <div className="sign-up">
      <i className="fa fa-user-o" aria-hidden="true"></i>
      <Link to="/signup">Sign Up</Link>
    </div>
  </div>
)}
