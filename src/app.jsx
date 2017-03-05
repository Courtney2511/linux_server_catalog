import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import '../styles/index.scss'
import Photos from './photos.jsx'
import NewPhoto from './newPhoto.jsx'
import mainLayout from './mainLayout.jsx'


export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={mainLayout}>
          <Route path="/" component={Photos} />
        </Route>
        <Route component={mainLayout}>
          <Route path="/photos/new" component={NewPhoto} />
        </Route>
      </Router>
    )
  }
}
