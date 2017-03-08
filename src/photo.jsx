import React from 'react'
import { Link } from 'react-router'


export default function Photo(props) {
  return (
    <div className="photo-div">
      <Link to={"/photos/" + props.photo.id}>
        <img className="photo" src={props.photo.picture} />
      </Link>
      <h3 className="photo-desc">{props.photo.description}</h3>
      <p className="photo-info">{props.photo.date_created} {props.photo.user.name}</p>
    </div>
    )
}
