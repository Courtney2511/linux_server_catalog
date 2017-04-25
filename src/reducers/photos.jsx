// Photos Reducer

import { GET_PHOTOS, GET_PHOTO_DETAIL, CLEAR_PHOTO, ADD_NEW_PHOTO, CLEAR_NEW_PHOTO } from '../actions'

//set initial state for photos
const initialState = {
  errors: '',
  list: [],
}

export default function photos(state = initialState, action) {
  switch (action.type) {

    case ADD_NEW_PHOTO: {

      if (action.error) {
        return {
          ...state, errors: "A server error occured"
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
          ...state, errors: "A server error occurred",
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
          ...state, errors: "A server error occurred",
                    list: []
        }
      } else {
        return {
          ...state, list: action.payload.data.photos,
                    errors: null
        }
      }
    default:
      return state
  }
}
