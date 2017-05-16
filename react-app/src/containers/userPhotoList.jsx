import React from 'react'
import styles from '../../styles/photo_index.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import PhotoUserProfile from '../components/photoUserProfile.jsx'

class UserPhotoList extends React.Component {

  componentDidMount() {
    console.log("when the page loads userId is")
    console.log(this.props.user)
    this.props.actions.getUserPhotoList(this.props.user.userId)
  }

  render() {
    return (
      <div>
        <h3 className={styles['page-title']}>Posts</h3>
        { // displays message when a photo is deleted
          (this.props.photos.success)
          ? <div className={styles['message']}>{this.props.photos.message}</div>
          : null
        }
        {
          (this.props.photos.errors)
          ? <div className={styles['server-errors']}>{this.props.photos.errors}</div>
          : null
        }
        <div className={styles['photos']}>
          {this.props.user.photos.map(photo => <PhotoUserProfile key={photo.id} photo={photo} deletePhoto={() => this.props.actions.deletePhoto(photo.id)} />)}
        </div>
      </div>
    )
  }
}

UserPhotoList.propTypes = {
  user: React.PropTypes.object
}

// maps the store state for user to UserPhotoList props
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

// subscribes UserPhotoList to the Redux store
export default connect(mapStateToProps, mapDispatchToProps)(UserPhotoList)
