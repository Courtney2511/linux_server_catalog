import React from 'react'
import '../styles/main.scss'
import axios from 'axios'

function Photo(props) {
  return (
    <div>
      <h2>{props.photo.description} ({props.photo.date_created})</h2>
      <img className="photo" src={props.photo.picture} />
    </div>
    )
}

export default class Photos extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: [],
    }
  }

  componentDidMount() {
    const url = (this.props.category)
      ? `http://localhost:5000/photos/${this.props.category}`
      : 'http://localhost:5000/photos'
    this.serverRequest =
      axios.get(url).then((result) => {
        console.log(result)
        this.setState(Object.assign({}, this.state, {photos: result.data.photos}))
      })
  }

  render() {
    return (
      <div className="photos">
        {this.state.photos.map(photo => <Photo key={photo.id} photo={photo} />)}
      </div>
    )
  }

}
