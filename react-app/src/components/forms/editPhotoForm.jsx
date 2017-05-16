import React from 'react'
import styles from '../../../styles/form.scss'
import { LocalForm, Control } from 'react-redux-form'

class EditPhotoForm extends React.Component {
  render() {
    const { handleSubmit } = this.props
    return (
        <LocalForm model="photo" onSubmit={(values) => handleSubmit(values)} initialState={this.props.photo}>
        <Control.text model=".picture" />
        <Control.text model=".name" />
        <Control.textarea model=".description"></Control.textarea>
        <div>
          <Control.select model=".category.id">
            <option value="1">Animals</option>
            <option value="2">Black & White</option>
            <option value="3">Landscape</option>
            <option value="4">People</option>
            <option value="5">Food</option>
          </Control.select>
        </div>
        <div>
          <Control.button className={styles['submit-button']} model="photo" disabled={{valid: false}}>
            Submit!
          </Control.button>
        </div>
      </LocalForm>
    )
  }
}


export default EditPhotoForm
