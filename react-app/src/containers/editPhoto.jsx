import React from 'react'
import styles from '../../styles/form.scss'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as Actions from '../actions'
import EditPhotoForm from '../components/forms/editPhotoForm'

class EditPhoto extends React.Component {

  componentDidMount() {
    this.props.actions.clearPhoto()
    this.props.actions.getPhotoDetail(this.props.params.photoId)
  }

  handleSubmit(values) {
    this.props.actions.editPhoto(values.id, values.user.id, values.name, values.description, values.category, values.picture)
    this.props.actions.getUserPhotoList(values.user.id)
    browserHistory.push(`/photos/${values.id}`)
  }

  render() {
    return (
      <div className={styles['form-container']}>
        <div className={styles['form-header']}>
          <h2>Need to make some changes?</h2>
        </div>
        { // displays server error, if any
          (this.props.photos.error)
          ? <div>{this.props.photos.error}</div>
          : null
        }
        {
          (this.props.photos.photoDetail && this.props.user.isLoggedIn)
          ? <EditPhotoForm photo={this.props.photos.photoDetail} handleSubmit={event => this.handleSubmit(event)} />
        : <div>Log in to edit your photos</div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    photos: state.photos,
    user: state.user
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPhoto)
