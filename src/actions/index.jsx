import axios from 'axios'

export const LOGIN_USER = 'LOGIN_USER'

export function logInUser(username, password) {

  // POST login credentials to server
  const data = axios.post('http://localhost:5000/login', {
    username: username,
    password: password
  })
  // .then(function(response) {
  //   // if successful store token in local storage
  //   const data = response.data
  //   sessionStorage.setItem('jwtToken', data.auth_token)
  //   // redirect to index page
  //   browserHistory.push('/')
  //   // handle error:
  //     if (!data.success) {
  //       console.log("NOT SUCCESSFUL")
  //       self.setState({
  //         error: data.error
  //       })
  //     }
  // }).catch(function(error) {
  //   console.log(error)

  return {
    type: LOGIN_USER,
    payload: data
  }
}
