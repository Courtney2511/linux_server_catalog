import React from 'react'
import '../styles/restaurantList.scss'
import axios from 'axios'


function Restaurant(props) {
  return (<h3>{props.name}</h3>)
}

export default class RestaurantList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      restaurants: [],
      title: props.title,
      isLoading: false,
    }
  }

  componentDidMount() {
    this.setState(Object.assign({}, this.state, {isLoading: true}))
    this.serverRequest =
      axios.get('http://localhost:5000/restaurant/JSON').then((result) => {
        // create a copy of the state, and apply the changes to it
        this.setState(Object.assign({}, this.state, {restaurants: result.data.restaurants, isLoading: false}))
      })
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        {this.state.isLoading ? 'Loading....' : this.state.restaurants.map(restaurant => <Restaurant key={restaurant.id} name={restaurant.name} />)}
      </div>
    )
  }
}
