import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

// photo as displayed in user profile list
export default function PhotoUserProfile(props) {
  return (
    <div className="photo-div">
      <Link to={"/photos/" + props.photo.id}> {props.photo.name} </Link>
      <div className="user">
        <span>
          <small>by: {props.photo.user.username}</small><br></br>
          <small className="photo-info">posted {moment.unix(props.photo.date_created).format("MMM D, YYYY")} </small>
      </span>
      </div>
    </div>
    )
}
