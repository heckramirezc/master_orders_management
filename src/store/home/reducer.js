import {
  GET_OFFERS,
  SET_OFFERS,
  OFFERS_API_ERROR
} from "./actionTypes"

const initialState = {
  error: "",
  offers: null,
  loading: false,
}

const home = (state = initialState, action) => {
  switch (action.type) {
    case GET_OFFERS:
      state = {
        ...state,
        loading: true,
      }
      break
    case SET_OFFERS:
      state = { ...state, 
        error: "",
        offers: action.payload, 
        loading: false 
      }
      break
    case OFFERS_API_ERROR:
      state = { 
        ...state, 
        error: action.payload, 
        loading: false 
      }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default home
