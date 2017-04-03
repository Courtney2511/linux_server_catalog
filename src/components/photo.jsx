import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

// photo as displayed in a list
export default function Photo(props) {
  return (
    <div className="photo-div">
      <Link to={"/photos/" + props.photo.id}>
        <img className="photo" src={props.photo.picture} />
      </Link>
      <h3 className="photo-title">{props.photo.name}</h3>
      <p className="photo-desc">{props.photo.description}</p>
      <div className="user">
        <span>
          <small>by: {props.photo.user.username}</small><br></br>
          <small className="photo-info">posted {moment.unix(props.photo.date_created).format("MMM D, YYYY")} </small>
      </span>
      </div>
    </div>
    )
}
