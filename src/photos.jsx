import React from 'react'
import '../styles/photo_index.scss'
import axios from 'axios'
import Photo from './photo.jsx'

export default class Photos extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: []
    }
  }

  componentDidMount() {
    const url = 'http://localhost:5000/photos'
    this.serverRequest =
      axios.get(url).then((result) => {
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
