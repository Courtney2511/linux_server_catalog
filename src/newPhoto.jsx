import React from 'react'
import axios from 'axios'


export default class NewPhoto extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <div>
      <h1>Submit Your Photo</h1>
      <form>
        <label>url
          <input type="text" name="picture-url"></input>
        </label>
        <br></br>
        <label>Description
          <input type="text" name="description"></input>
        </label>
        <br></br>
        <input type="submit" value="Submit"></input>
      </form>
      </div>
    )
  }
}
