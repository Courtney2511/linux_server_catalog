import React from 'react'
import '../../styles/photo_index.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import Photo from '../components/photo.jsx'

class Photos extends React.Component {

  componentDidMount() {
    this.props.actions.getPhotos()
  }

  render() {

    let errors = null

    if (this.props.photos.errors){
      errors = <div className="server-errors">{this.props.photos.errors}</div>
      }
    return (
      <div className="photos">
        {errors}
        {this.props.photos.list.map(photo => <Photo key={photo.id} photo={photo} />)}
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
