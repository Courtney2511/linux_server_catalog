import React from 'react'
import axios from 'axios'
import '../styles/newphoto.scss'


export default class NewPhoto extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <div className="new-photo-container">
      <h2>Submit Your Photo</h2>
      <form method='POST'>
        <label>url
          <input type="text" name="picture-url" placeholder="url for photo"></input>
        </label>
        <br></br>
        <label>Title
          <input type="text" name="title"></input>
        </label>
        <br></br>
        <label>Description
          <textarea  name="description"></textarea>
        </label>
        <br></br>
        <div className="new-photo-submit">
          <label>Category:
            <select>
              <option value="animals">Animals</option>
              <option value="Black & White">Black & White</option>
              <option value="Landscape">Landscape</option>
              <option value="People">People</option>
              <option value="Food">Food</option>
            </select>
          </label>
          <input className="submit-button" type="submit" value="Submit"></input>
        </div>
      </form>
      </div>
    )
  }
}
