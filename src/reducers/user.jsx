// User Reducer

import { LOGIN_USER } from '../actions'
import { LOGOUT_USER } from '../actions'
import { SIGNUP_USER } from '../actions'
import { GET_USER_PHOTO_LIST } from '../actions'
import jwt_decode from 'jwt-decode'


// sets initial state for user
const initialState = {
  isLoggedIn: false,
  username: '',
  login: {error: '', success: false},
  jwtToken: null,
  signup: {errors: ''},
  photos: []
}

const serverError = "A server error occured.  Please try again later"

export default function user(state = initialState, action) {
  switch (action.type) {
    // FIXED!!!
    case GET_USER_PHOTO_LIST:
      // handles server error
      if (action.error) {
        return {
          ...state, error: {
                              success: false,
                              error: serverError
                            }
        }
      // handles bad request
      } else if (action.payload.status !== 200) {
        return {
          ...state, error: 'This resource does not exist'
        }
      // handles success
      } else {
        return {
          ...state, photos: action.payload.data
          }
      }
    // FIXED!!!
    case SIGNUP_USER:
      if (action.error) {
      // handles server errors
        return {
          ...state, errors: serverError,
                    isSignedUp: false
        }
      //handles validation errors
      } else if (!action.payload.data.success) {
        return {
          ...state, errors: action.payload.data.errors,
                    isSignedUp: false
        }
      // handles success
      } else {
          return {
            ...state, isSignedUp: true
          }
        }
    // appears to be working
    case LOGIN_USER:
      // handles server error
      if (action.error) {
        return {
          ...state, login: {
            success: false,
            error: serverError
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
    // appears to be working
    case LOGOUT_USER:
      if (action.payload.data.success) {
        return {
          ...initialState,
        }
      } else {
        return {
        ...state, logout: { success: false, error: action.payload.data.errors }
        }
      }
    default:
      return state
  }
}
