import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import '../styles/main.scss'
import Photos from './photos.jsx'
import newPhotoForm from './newPhotoForm.jsx'
import mainLayout from './mainLayout.jsx'
import PhotoDetail from './photoDetail.jsx'
import PhotosByCategory from './PhotosByCategory.jsx'
import signUpForm from './signUpForm.jsx'
import masonryLayout from './masonryLayout.jsx'
import loginForm from './loginForm.jsx'
import facebookLogin from './facebookLogin.jsx'


export default class App extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route component={mainLayout}>
          <Route path="/" component={Photos} />
          <Route path="/photos/new" component={newPhotoForm} />
          <Route path="/photos/:photo_id" component={PhotoDetail} />
          <Route path="/categories/:category_id" component={PhotosByCategory} />
          <Route path="/signup" component={signUpForm} />
          <Route path="/login" component={loginForm} />
          <Route path="/facebooklogin" component={facebookLogin} />
          <Route path="/masonry" component={masonryLayout} />
        </Route>
      </Router>
    )
  }
}
