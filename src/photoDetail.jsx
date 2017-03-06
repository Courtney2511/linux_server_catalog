import React from 'react'
import '../styles/photo_index.scss'
import axios from 'axios'

function Photo(props) {
  return (
    <div>
      <h2>{props.photo.description} ({props.photo.date_created})</h2>
      <img className="photo" src={props.photo.picture} />
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
        console.log(result)
        // sets state of PhotoDetail to result data
        this.setState(Object.assign({}, this.state, {photo: result.data.photo}))
      })
  }

  render() {
    return (
      <div className="photo">
        {(this.state.photo) ? <Photo photo={this.state.photo} /> : null}
      </div>
    )
  }

}
