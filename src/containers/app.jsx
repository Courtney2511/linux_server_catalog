// Container Component

import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import '../../styles/main.scss'
import Photos from '../components/photos.jsx'
import newPhotoForm from '../components/forms/newPhotoForm.jsx'
import mainLayout from '../components/mainLayout.jsx'
import PhotoDetail from '../components/photoDetail.jsx'
import PhotosByCategory from '../components/PhotosByCategory.jsx'
import signUpForm from '../components/forms/signUpForm.jsx'
import masonryLayout from '../components/masonryLayout.jsx'
import loginForm from '../components/forms/loginForm.jsx'
import facebookLogin from '../components/facebookLogin.jsx'
import UserPhotoList from '../components/UserPhotoList.jsx'
import EditPhotoForm from '../components/editPhoto.jsx'

export default class App extends React.Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route component={ mainLayout }>
          <Route path="/users/:userId" component={ UserPhotoList } />
            <Route path="users/:userId/photos/:photoId" component= { EditPhotoForm } />
          <Route path="/" component={ Photos } />
          <Route path="/photos/new" component={ newPhotoForm } />
          <Route path="/photos/:photoId" component={ PhotoDetail } />
          <Route path="/categories/:categoryId" component={ PhotosByCategory } />
          <Route path="/signup" component={ signUpForm } />
          <Route path="/login" component={ loginForm } />
          <Route path="/facebooklogin" component={ facebookLogin } />
          <Route path="/masonry" component={ masonryLayout } />
        </Route>
      </Router>
    )
  }
}
