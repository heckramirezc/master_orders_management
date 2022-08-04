import { PROFILE_ERROR, PROFILE_SUCCESS } from "./actionTypes";

const initialState = {
  error: "",
  success: "",
};

const profile = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_SUCCESS:
      state = { ...state, success: action.payload };
      break;
    case PROFILE_ERROR:
      state = { ...state, error: action.payload };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
