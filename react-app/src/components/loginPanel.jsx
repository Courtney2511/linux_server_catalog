import React from 'react'
import styles from '../../styles/main.scss'
import { Link } from 'react-router'


export default function LoginPanel() {
  return(
  <div>
    <div className={styles['log-in']}>
      <i className="fa fa-sign-in" aria-hidden="true"></i>
      <Link to="/login">Log In</Link>
    </div>

    <div className={styles['sign-up']}>
      <i className="fa fa-user-o" aria-hidden="true"></i>
      <Link to="/signup">Sign Up</Link>
    </div>
  </div>
)}
