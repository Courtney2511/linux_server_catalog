import React from 'react'
import axios from 'axios'
import '../../styles/photo_index.scss'
import Photo from './photo.jsx'

export default class PhotosByCategory extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: []
    }
  }

  componentDidMount() {
    this.loadPhotos()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.category_id !== this.props.params.category_id) {
      this.loadPhotos()
    }
  }

  loadPhotos() {
    const url = `http://localhost:5000/categories/${this.props.params.category_id}/photos`
    this.serverRequest =
      axios.get(url).then((result) => {
        this.setState(Object.assign({}, this.state, {photos: result.data.photos}))
      })
  }

  render() {
    return (
      <div >
        {this.state.photos.map(photo => <Photo key={photo.id} photo={photo} />)}
      </div>
    )
  }
}
