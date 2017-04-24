// Photos Reducer

import { GET_PHOTOS, GET_PHOTO_DETAIL, CLEAR_PHOTO, ADD_NEW_PHOTO } from '../actions'

//set initial state for photos
const initialState = {
  list: [],
  errors: ''
}

export default function photos(state = initialState, action) {
  switch (action.type) {

    case ADD_NEW_PHOTO: {

      if (action.error) {
        return {
          ...state, errors: {
                              success: false,
                              error: "A server error occured"
          }
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
      } else {
        return {
          ...state, list: action.payload.data.photos
        }
      }
    default:
      return state
  }
}
