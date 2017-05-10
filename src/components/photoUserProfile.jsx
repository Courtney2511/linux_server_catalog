import React from 'react'
import { Link } from 'react-router'
import { formatUnixShortDate } from '../helpers/date'

// photo as displayed in user profile list
export default function PhotoUserProfile(props) {
  return (
    <div className="photolist-div">
      <div>
        <img className="img-icon" src={props.photo.picture}/>
      </div>
      <div>
        <Link to={`/photos/${props.photo.id}`}> {props.photo.name} </Link>
      </div>
      <div>
          <small className="date">posted {formatUnixShortDate(props.photo.date_created)} </small>
      </div>
      <div className="user-actions">
        <Link to={`/users/${props.photo.user.id}/photos/${props.photo.id}`}>Edit</Link>
        <button id="delete-button" onClick={
            () => confirm("Are you sure you want to delete?") ? props.deletePhoto() : false
          }>Delete
        </button>
      </div>
    </div>
    )
}
