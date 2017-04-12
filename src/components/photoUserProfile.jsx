import React from 'react'
import { Link } from 'react-router'
import { formatUnixShortDate } from '../helpers/date'

// photo as displayed in user profile list
export default function PhotoUserProfile(props) {
  return (
    <div className="photolist-div">
      <div>
        <Link to={`/photos/${props.photo.id}`}> {props.photo.name} </Link>
      </div>
      <div>
          <small className="date">posted {formatUnixShortDate(props.photo.date_created)} </small>
      </div>
      <div className="user-actions">
        <button id="edit-button">Edit</button>
        <button id="delete-button">Delete</button>
      </div>
    </div>
    )
}
