import axios from 'axios'

export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

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
  console.log(options)

  const data = axios.post('http://localhost:5000/logout', options)

  return {
    type: LOGOUT_USER,
    payload: data
  }
}
