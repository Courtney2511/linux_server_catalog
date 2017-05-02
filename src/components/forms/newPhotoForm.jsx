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
      if (this.props.photos.newPhoto) {
        browserHistory.push(`/photos/${this.props.photos.newPhoto.id}`)
      }
    })
  }

  render() {

    return (
      <div className="form-container">
      <h2>Show us your art.</h2>
      { // displays server errors, if any
        (this.props.photos.errors)
        ? <div className="server-errors">{this.props.photos.errors}</div>
        : null
      }
      { // conditionaly displays form if logged in
        (!this.props.user.isLoggedIn)
        ? <div>You must be logged in to post new photos</div>

        : <form method='POST' onSubmit={event => this.handleSubmit(event)}>
          <input type="text" name="pictureUrl" placeholder="url to your photo photo"></input>
            { // displays url errors, if any
              (this.props.photos.errors && this.props.photos.errors.error_picture)
              ? <div className="form-error">this.props.photos.errors.error_picture </div>
              : null
            }
          <input type="text" name="name" placeholder="Title"></input>
           {  // displays name errors, if any
             (this.props.photos.errors && this.props.photos.errors.error_name)
             ? <div className="form-error">{this.props.photos.errors.error_name}</div>
             : null
           }
          <textarea  name="description" placeholder="Tell us the story..."></textarea>
            { // displays description errors, if any
              (this.props.photos.errors && this.props.photos.errors.error_description)
              ? <div className="form-error">{this.props.photos.errors.error_description}</div>
              : null
            }
          <br></br>
            <select name="category">
              <option value="1">Animals</option>
              <option value="2">Black & White</option>
              <option value="3">Landscape</option>
              <option value="4">People</option>
              <option value="5">Food</option>
            </select>
        <div className="form-submit">
          <input className="submit-button" type="submit" value="Share"></input>
        </div>
      </form>
    }
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
