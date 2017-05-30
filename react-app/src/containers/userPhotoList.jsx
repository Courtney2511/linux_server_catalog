import React from 'react'
import styles from '../../styles/photo_index.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import PhotoUserProfile from '../components/photoUserProfile.jsx'

class UserPhotoList extends React.Component {

  componentDidMount() {
    if (this.props.user.isLoggedIn) {
      this.props.actions.getUserPhotoList(this.props.user.userId)
    }
  }

  render() {
    return (!this.props.user.isLoggedIn)
    ? (<div>
        <h3 className={styles['page-title']}>Posts</h3>
        <div className={styles['no-posts']}>You must be logged in view your previous posts</div>
      </div>)
    : (
      <div>
        <h3 className={styles['page-title']}>Posts</h3>
        { // displays message when a photo is deleted
          (this.props.photos.success)
          ? <div className={styles['message']}>{this.props.photos.message}</div>
          : null
        }
        { // displays errors, if any
          (this.props.photos.errors)
          ? <div className={styles['server-errors']}>{this.props.photos.errors}</div>
          : null
        }
        { // displays errors, if any
          (this.props.user.errors)
          ? <div className={styles['no-posts']}>{this.props.user.errors}</div>
          : null
        }
        { // displays user photos, if any
         (this.props.user.photos && this.props.user.photos.length > 0)
        ? <div className={styles['photos']}>
            {this.props.user.photos.map(photo => <PhotoUserProfile key={photo.id} photo={photo} deletePhoto={() => this.props.actions.deletePhoto(photo.id)} />)}
          </div>
        : null
        }
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
