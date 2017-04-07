// User Reducer

import { LOGIN_USER } from '../actions'
import { LOGOUT_USER } from '../actions'
import { SIGNUP_USER } from '../actions'
import jwt_decode from 'jwt-decode'


// sets initial state for user
const initialState = {
  isLoggedIn: false,
  username: '',
  login: {error: '', success: false},
  jwtToken: null,
  signup: {errors: ''}
}

export default function user(state = initialState, action) {
  switch (action.type) {

    case SIGNUP_USER:
      if (action.error) {
        return {
          ...state, signup: {
                              success: false,
                              error: "A server error occurred"
                            }
        }
      } else if (!action.payload.data.success) {
        return {
          ...state, signup: {
                              success: false,
                              errors: action.payload.data
                            }
        }
      } else {
          return {
            ...state, isSignedUp: true
          }
        }

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
                    username: decoded.username,
                    userId: decoded.userId
        }
      }

    case LOGOUT_USER:
      //handles successful log out
      if (action.payload.data.success) {
        return {
          ...state, isLoggedIn: false,
                    logout: { success: true, message: action.payload.data.message }
        }
      } else {
        return {
        ...state, logout: { success: false, error: action.payload.data.error }
        }
      }
    default:
      return state
  }
}
