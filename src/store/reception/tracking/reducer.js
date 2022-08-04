import {
  TRACKING,
  SET_TRACKING,
  TRACKING_API_ERROR
} from "./actionTypes"

const initialState = {
  error: "",
  tracking: null,
  loading: false,
}

const tracking = (state = initialState, action) => {
  switch (action.type) {
    case TRACKING:
      state = {
        ...state,
        loading: true,
      }
      break
    case SET_TRACKING:
      state = { ...state, 
        error: "",
        tracking: action.payload, loading: false 
      }
      break
    case TRACKING_API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default tracking
