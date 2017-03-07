import React from 'react'
import Photos from './Photos'
import '../styles/photo_index.scss'

export default class PhotosByCategory extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1>Photos for Category {this.props.params.category_id}</h1>
        <Photos categoryId={this.props.params.category_id} />
      </div>
    )
  }
}
