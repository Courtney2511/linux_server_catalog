import React from 'react'
import '../../styles/photo_index.scss'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import { formatUnixShortDate } from '../helpers/date'

function Photo(props) {
  return (
    <div className="photo-detail-div">
      <h2>{props.photo.name}</h2>
      <small>Posted: {formatUnixShortDate(props.photo.date_created)} by: {props.photo.user.username}</small>
      <img className="photo" src={props.photo.picture} />
      <p>{props.photo.description}</p>
      <p></p>
    </div>
    )
}

class PhotoDetail extends React.Component {

  componentDidMount() {
    this.props.actions.clearPhoto()
    this.props.actions.getPhotoDetail(this.props.params.photoId)
  }



  render() {
    let errors = null

    if (this.props.photos.errors) {
      <div className="server-errors">{this.props.photos.errors}</div>
    }

    return (
      <div>
        {errors}
        {(this.props.photos.photoDetail) ? <Photo photo={this.props.photos.photoDetail} /> : null}
      </div>
    )
  }
}

PhotoDetail.PropTypes = {
  photos: React.PropTypes.object
}

function mapStateToProps(state) {
  return {
    photos: state.photos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail)
