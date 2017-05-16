import React from 'react'
import styles from '../../styles/photo_index.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import Photo from '../components/photo.jsx'

class Photos extends React.Component {

  componentDidMount() {
    this.props.actions.getPhotos()
  }

  render() {
    return (
      <div className={styles['photos']}>
        { // checks for error messages
          (this.props.photos.errors)
          ? <div className={styles['server-errors']}>{this.props.photos.errors}</div>
          : null
        }
        { // if photos exist, displays photos
          (this.props.photos.list && this.props.photos.list.length > 0)
          ? this.props.photos.list.map(photo => <Photo getUserPhotoList={ this.props.actions.getUserPhotoList } key={photo.id} photo={photo} />)
          : null
        }
      </div>
    )
  }
}

Photos.propTypes = {
  photos: React.PropTypes.object
}

//maps the store state for photos to photos Component
function mapStateToProps(state) {
  return {
    photos: state.photos,
  }
}

//binds actions
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos)
