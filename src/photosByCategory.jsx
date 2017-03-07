import React from 'react'
import axios from 'axios'
import '../styles/photo_index.scss'
import Photo from './photo.jsx'

export default class PhotosByCategory extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      category: -1
    }
  }

  componentDidMount() {
    const url = `http://localhost:5000/categories/${this.props.params.category_id}/photos`
    this.serverRequest =
      axios.get(url).then((result) => {
        this.setState(Object.assign({}, this.state, {photos: result.data.photos}))
      })
  }

  componentWillReceiveProps() {
    this.setState({category: `${this.params.category_id}`})
  }



  render() {
    return (
      <div >
        {this.state.photos.map(photo => <Photo key={photo.id} photo={photo} category={photo.category.id} />)}
      </div>
    )
  }
}
