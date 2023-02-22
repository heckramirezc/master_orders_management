import {
  GET_OFFERS,
  SET_OFFERS,
  OFFERS_API_ERROR
} from "./actionTypes"

export const getOffers = (request) => {
  return {
    type: GET_OFFERS,
    payload: { request },
  }
}

export const setOffers = offers => {
  return {
    type: SET_OFFERS,
    payload: offers,
  }
}

export const apiError = error => {
  return {
    type: OFFERS_API_ERROR,
    payload: error,
  }
}