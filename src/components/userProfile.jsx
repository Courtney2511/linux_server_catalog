import React from 'react'
import '../../styles/photo_index.scss'
import axios from 'axios'
import PhotoUserProfile from './photoUserProfile.jsx'

export default class UserProfile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      photos: []
    }
  }

  componentDidMount() {
    const url = 'http://localhost:5000/users/1/photos'
    this.serverRequest =
      axios.get(url).then((result) => {
        this.setState(Object.assign({}, this.state, {photos: result.data.photos}))
      })
  }

  render() {
    return (
      <div>
        <h3>User Profile</h3>
        <div className="photos">
          {this.state.photos.map(photo => <PhotoUserProfile key={photo.id} photo={photo} />)}
        </div>
      </div>
    )
  }
}
