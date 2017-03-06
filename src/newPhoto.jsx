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
      <form>
        <label>url
          <input type="text" name="picture-url"></input>
        </label>
        <br></br>
        <label>Description
          <input type="text" name="description"></input>
        </label>
        <br></br>
        <select>
          <option value="animals">Animals</option>
          <option value="Black & White">Black & White</option>
          <option value="Landscape">Landscape</option>
          <option value="People">People</option>
          <option value="Food">Food</option>
        </select>
        <input type="submit" value="Submit"></input>
      </form>
      </div>
    )
  }
}
