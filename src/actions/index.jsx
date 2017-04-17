// redux actions
import axios from 'axios'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
export const SIGNUP_USER = 'SIGNUP_USER'
export const ADD_NEW_PHOTO = 'ADD_NEW_PHOTO'
export const GET_PHOTOS = 'GET_PHOTOS'

export function getPhotos() {

  const url = 'http://localhost:5000/photos'
  const data = axios.get(url)
  return {
    type: GET_PHOTOS,
    payload: data
  }
}


export function addNewPhoto(userId, name, description, category, url) {

  const data = axios.post('http://localhost:5000/photos', {
    userId: userId,
    name: name,
    description: description,
    category: category,
    url: url
  })

  return {
    type: ADD_NEW_PHOTO,
    payload: data
  }
}

export function signUpUser(username, email, password) {

  const data = axios.post('http://localhost:5000/signup', {
    username: username,
    email: email,
    password: password
  })

  return {
    type: SIGNUP_USER,
    payload: data
  }
}

export function logInUser(username, password) {

  // POST login credentials to server
  const data = axios.post('http://localhost:5000/login', {
    username: username,
    password: password
  })

  return {
    type: LOGIN_USER,
    payload: data
  }
}

export function logOutUser(jwtToken) {

  const options = {
    auth_token: jwtToken
  }

  const data = axios.post('http://localhost:5000/logout', options)

  return {
    type: LOGOUT_USER,
    payload: data
  }
}
