import React from 'react'
import { Link } from 'react-router'

export default function Photo(props) {
  return (
    <div>
      <Link to={"/photos/" + props.photo.id}>
        <img className="photo" src={props.photo.picture} />
      </Link>
      <h3>{props.photo.description}</h3>
      <p>{props.photo.date_created} {props.photo.user.name}</p>
    </div>
    )
}
