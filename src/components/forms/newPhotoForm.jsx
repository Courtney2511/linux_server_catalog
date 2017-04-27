import React from 'react'
import '../../../styles/form.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../../actions'
import { browserHistory } from 'react-router'


class NewPhotoForm extends React.Component {

  componentDidMount() {
    this.props.actions.clearNewPhoto()
  }

  handleSubmit(event) {
    event.preventDefault()
    // calls the new photo action
    this.props.actions.addNewPhoto(this.props.user.userId, event.target.name.value, event.target.description.value, event.target.category.value, event.target.pictureUrl.value)
    .then(() => {
      // if post is successful, redirect to photoDetail
      if (this.props.photos.newPhoto.success) {
        browserHistory.push(`/photos/${this.props.photos.newPhoto.id}`)
      }
    })
  }

  render() {

    return (
      <div className="form-container">
      <h2>Show us your art.</h2>
      <form method='POST' onSubmit={event => this.handleSubmit(event)}>
          <input type="text" name="pictureUrl" placeholder="url to your photo photo"></input>
            <div className="form-error">{this.props.photos.newPhoto.errors.error_picture}</div>
          <input type="text" name="name" placeholder="Title"></input>
            <div className="form-error">{this.props.photos.newPhoto.errors.error_name}</div>
          <textarea  name="description" placeholder="Tell us the story..."></textarea>
            <div className="form-error">{this.props.photos.newPhoto.errors.error_description}</div>
          <br></br>
            <select name="category">
              <option value="Animals">Animals</option>
              <option value="Black & White">Black & White</option>
              <option value="Landscape">Landscape</option>
              <option value="People">People</option>
              <option value="Food">Food</option>
            </select>
        <div className="form-submit">
          <input className="submit-button" type="submit" value="Share"></input>
        </div>
      </form>
      </div>
    )
  }
}

NewPhotoForm.PropTypes = {
  user: React.PropTypes.object
}

// maps the store state for user to NewPhotoForm
function mapStateToProps(state) {
  return {
    user: state.user,
    photos: state.photos
  }
}

// binds actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPhotoForm)
