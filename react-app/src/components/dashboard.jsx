import React from 'react'
import styles from '../../styles/main.scss'
import { Link } from 'react-router'


export default function Dashboard(props) {

  return(
    <div>
      <div className={styles['welcome']}>
        <p className={styles['hello']}>Hello <Link to={"/users/" + props.user.userId}>
            {props.user.username} :)
          </Link>
        </p>
      </div>
      <div className={styles['add-post']}>
        <i className="fa fa-camera" aria-hidden="true"></i>
        <Link to="/photos/new" className={styles['post']}>Post</Link>
      </div>
      <div className={styles['logout']}>
        <i className="fa fa-sign-out" aria-hidden="true"></i>
        <button id={styles['logout']} onClick={() => props.actions.logOutUser(props.user.jwtToken)}>Log Out</button>
      </div>
    </div>
  )
}
