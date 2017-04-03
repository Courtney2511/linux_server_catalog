import React from 'react'
import '../../styles/form.scss'


export default class NewPhotoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <div className="form-container">
      <h2>Show us your art.</h2>
      <form method='POST'>
          <input type="text" name="picture-url" placeholder="url to your photo photo"></input>
          <input type="text" name="title" placeholder="Title"></input>
          <textarea  name="story" placeholder="Tell us the story..."></textarea>
          <br></br>
            <select>
              <option value="animals">Animals</option>
              <option value="Black & White">Black & White</option>
              <option value="Landscape">Landscape</option>
              <option value="People">People</option>
              <option value="Food">Food</option>
            </select>
        <div className="form-submit">
          <input className="submit-button" type="submit" value="Share"></input>
        </div>
      </form>
      </div>
    )
  }
}
