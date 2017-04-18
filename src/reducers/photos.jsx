// Photos Reducer

import { GET_PHOTOS, GET_PHOTO_DETAIL, CLEAR_PHOTO } from '../actions'

//set initial state for photos
const initialState = {
  list: [],
  errors: null
}

export default function photos(state = initialState, action) {
  switch (action.type) {

    case GET_PHOTO_DETAIL: {

      return {
        ...state, photoDetail: action.payload.data.photo
      }

      // if (action.error) {
      //   return {
      //     ...state, errors: {
      //                       success: false,
      //                       error: "A server error occurred"
      //                       }
      //   }
      // } else {
      //   return {
      //     ...state, PhotoDetail: action.payload.data.photo
      //   }
      // }

    }

    case CLEAR_PHOTO: {
      return {
        ...state, photoDetail: null
      }
    }

    case GET_PHOTOS:
      if (action.error) {
        return {
          ...state, errors: {
                            success: false,
                            error: "A server error occurred"
                            }
        }
      } else if (action.payload.data.success) {
        return {
          ...state, list: action.payload.data.photos
        }
      }
    default:
      return state
  }
}
