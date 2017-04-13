import React from 'react'
import '../../styles/photo_index.scss'
import { formatUnixShortDate } from '../helpers/date'
import axios from 'axios'

function Photo(props) {
  return (
    <div className="photo-detail-div">
      <h2>{props.photo.name}</h2>
      <small>Posted: {formatUnixShortDate(props.photo.date_created)} by: {props.photo.user.username}</small>
      <img className="photo" src={props.photo.picture} />
      <p>{props.photo.description}</p>
      <p></p>
    </div>
    )
}

export default class PhotoDetail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photo: null
    }
  }

  componentDidMount() {
    const url = `http://localhost:5000/photos/${this.props.params.photo_id}`
    // requests JSON object for photo_id
    this.serverRequest =
      axios.get(url).then((result) => {
        // sets state of PhotoDetail to result data
        this.setState(Object.assign({}, this.state, {photo: result.data.photo}))
      })
  }

  render() {
    return (
      <div>
        {(this.state.photo) ? <Photo photo={this.state.photo} /> : null}
      </div>
    )
  }

}
