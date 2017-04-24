import React from 'react'
import '../../../styles/form.scss'
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
          <Control.select model=".category">
            <option value="Animals">Animals</option>
            <option value="Black & White">Black & White</option>
            <option value="Landscape">Landscape</option>
            <option value="People">People</option>
            <option value="Food">Food</option>
          </Control.select>
        </div>
        <div>
          <Control.button model="photo" disabled={{valid: false}}>
            Submit!
          </Control.button>
        </div>
      </LocalForm>
    )
  }
}


export default EditPhotoForm
