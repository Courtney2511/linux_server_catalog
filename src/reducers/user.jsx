// User Reducer
import {
  LOGIN_USER,
  LOGOUT_USER,
  SIGNUP_USER,
  GET_USER_PHOTO_LIST,
  DELETE_PHOTO,
  LOGIN_WITH_FACEBOOK
} from '../actions'
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
          ...state, photos: action.payload.data,
                    error: null
          }
      }
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
        console.log(action.payload.data)
        const decoded = jwt_decode(action.payload.data.auth_token)
        return {
          ...state, isLoggedIn: true,
                    jwtToken: action.payload.data.auth_token,
                    login: {error: '', success: true},
                    username: decoded.username,
                    userId: decoded.userId
        }
      }
    case LOGIN_WITH_FACEBOOK:
      const decoded = jwt_decode(action.payload.data.auth_token)
      return {
        ...state, isLoggedIn: true,
                  jwtToken: action.payload.data.auth_token,
                  login: {error: '', success: true},
                  username: decoded.username,
                  userId: decoded.userId
      }
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
    case DELETE_PHOTO:
      if (!action.error) {
        return {
          ...state,
          photos: state.photos.filter(item => item.id !== action.photoId)
        }
      }
    default:
      return state
  }
}
