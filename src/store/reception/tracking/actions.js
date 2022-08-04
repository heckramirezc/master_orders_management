import {
  TRACKING,
  SET_TRACKING,
  TRACKING_API_ERROR
} from "./actionTypes"

export const tracking = (code) => {
  return {
    type: TRACKING,
    payload: { code },
  }
}

export const setTracking = tracking => {
  return {
    type: SET_TRACKING,
    payload: tracking,
  }
}

export const apiError = error => {
  return {
    type: TRACKING_API_ERROR,
    payload: error,
  }
}