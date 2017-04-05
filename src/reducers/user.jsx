// User Reducer

import { LOGIN_USER } from '../actions'
import { LOGOUT_USER } from '../actions'
import jwt_decode from 'jwt-decode'


// sets initial state for user
const initialState = {
  isLoggedIn: false,
  username: '',
  login: {error: '', success: false},
  jwtToken: null
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      // handles server error
      if (action.error) {
        return {
          ...state, login: {
            success: false,
            error: "A server error occurred."
          }
        }
      // handles input error
      } else if (!action.payload.data.success) {
        return {
          ...state, login: {
            success: false,
            error: action.payload.data.error
          }
        }
      // handles success
      } else {
        const decoded = jwt_decode(action.payload.data.auth_token)
        return {
          ...state, isLoggedIn: true,
                    jwtToken: action.payload.data.auth_token,
                    login: {error: '', success: true},
                    username: decoded.username
        }
      }
    case LOGOUT_USER:
      //handles successful log out
      if (action.payload.data.success) {
        return {
          ...state, isLoggedIn: false,
                    logout: { success: true, message: action.payload.data.message }
        }
      }
    default:
      return state
  }
}
