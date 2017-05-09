import React from 'react'
import { Link } from 'react-router'
import { formatUnixShortDate } from '../helpers/date'

// photo as displayed in a list
export default function Photo(props) {
  return (
    <div className="photo-div">
      <Link className="photo-link" to={"/photos/" + props.photo.id}>
        <img className="photo" src={props.photo.picture} />
      </Link>
      <h3 className="photo-title">{props.photo.name}</h3>
      <p className="photo-desc">{props.photo.description}</p>
      <div className="user">
        <span>
          <small>by: <Link to={`/users/${props.photo.user.id}`}>
              {props.photo.user.username}
            </Link>
          </small><br></br>
          <small className="photo-info">posted {formatUnixShortDate(props.photo.date_created)} </small>
      </span>
      </div>
    </div>
    )
}
