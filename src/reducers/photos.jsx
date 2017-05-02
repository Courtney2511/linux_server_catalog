  // Photos Reducer

import { GET_PHOTOS, GET_PHOTO_DETAIL, CLEAR_PHOTO, ADD_NEW_PHOTO, CLEAR_NEW_PHOTO, EDIT_PHOTO, LOGOUT_USER, DELETE_PHOTO } from '../actions'

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

    case DELETE_PHOTO: {
      if (action.error) {
        return {
          ...state, errors: serverError
        }
      } else
      return {
        ...state, message: "photo deleted"
      }
    }

    case ADD_NEW_PHOTO: {

      if (action.error) {
        return {
          ...state, errors: serverError
        }
      } else if (!action.payload.data.success) {
        return {
          ...state, errors: action.payload.data
        }
      } else {
        return {
          ...state, success: true,
                    newPhoto: action.payload.data.photo
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
        return {
          ...state, errors: serverError,
                    list: []
        }
      } else {
        return {
          ...state, photoDetail: action.payload.data.photo,
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
        return {
          ...state, errors: serverError,
                    list: []
        }
      } else {
        return {
          ...state, list: action.payload.data.photos,
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
