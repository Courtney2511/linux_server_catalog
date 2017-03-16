import React from 'react'
import { Link } from 'react-router'


export default function Photo(props) {
  return (
    <div className="photo-div">
      <Link to={"/photos/" + props.photo.id}>
        <img className="photo" src={props.photo.picture} />
      </Link>
      <h3 className="photo-title">TITLE</h3>
      <p className="photo-desc">{props.photo.description}</p>
      <div className="user">
        <span>IMAGE</span>
        <span>
          <small>BY: {props.photo.user.name}</small><br></br>
          <small className="photo-info">{props.photo.date_created} </small>
      </span>
      </div>
    </div>
    )
}
