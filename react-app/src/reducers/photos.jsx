  // Photos Reducer

import { GET_PHOTOS, GET_PHOTO_DETAIL, CLEAR_PHOTO, ADD_NEW_PHOTO, CLEAR_NEW_PHOTO, EDIT_PHOTO, LOGOUT_USER, DELETE_PHOTO, CLEAR_MESSAGE } from '../actions'

//set initial state for photos
const initialState = {
  list: [],
}

const serverError = "a server error occured, please try again"

export default function photos(state = initialState, action) {
  switch (action.type) {

    case EDIT_PHOTO: {
      if (action.error) {
        return {
          ...state, errors: serverError
        }
      } else
      return {
        ...state, photoDetail: action.payload.data
      }
    }

    case DELETE_PHOTO:
      if (action.error) {
        return {
          ...state,
          errors: serverError
        }
      } else if (action.payload.response && action.payload.response.status === 401) {
        return {
          ...state, errors: action.payload.response.data.errors,
        }
      } else {
        return {
          ...state,
          list: state.list.filter(item => item.id !== action.photoId)
        }
      }

    case CLEAR_MESSAGE: {
      return {
        ...state, message: null
      }

    }

    case ADD_NEW_PHOTO: {
      // handles server error
      if (action.error) {
        return {
          ...state, errors: serverError
        }
      // handles ok request with errors
    } else if (action.payload && action.payload.status === 200 ) {
        return {
          ...state, errors: action.payload.data.errors
        }
      // handles success
      } else {
        return {
          ...state, success: true,
                    newPhoto: action.payload.data
        }
      }
    }

    case CLEAR_NEW_PHOTO: {
      return {
        ...state, newPhoto: null
      }
    }

    case GET_PHOTO_DETAIL: {
      if (action.error) {
          // handles 404
          if (action.payload.response && action.payload.response.status === 404) {
            return {
              ...state, errors: action.payload.response.data.errors,
                        photoDetail: null
            }
            // handles 500
          } else {
            return {
              ...state, errors: serverError
            }
          }
      // handles success
      } else {
        return {
          ...state, photoDetail: action.payload.data,
                    errors: null
        }
      }
    }

    case CLEAR_PHOTO: {
      return {
        ...state, photoDetail: null
      }
    }

    case GET_PHOTOS:
      if (action.error) {
        // handles 404
        if (action.payload.response && action.payload.response.status === 404) {
          return {
            ...state, errors: action.payload.response.data.errors,
                      list: []
          }
        // handles 500
        } else {
          return {
            ...state, errors: "Server Error",
                      list: []
          }
        }
      // handles success
      } else {
        return {
          ...state, list: action.payload.data,
                    errors: null
        }
      }

    case LOGOUT_USER:
      if (action.payload.data.success) {
        return {
          ...initialState,
        }
      }
    default:
      return state
  }
}
