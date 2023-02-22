import { call, put, takeEvery } from "redux-saga/effects"
import { GET_OFFERS } from "./actionTypes"
import { apiError, setOffers } from "./actions"
import { Offers } from "../../helpers/backend_helper"

function* getOffers({ payload: { request } }) {
  try {
    const response = yield call(Offers, request)
    if (response.code && response.code == 1 && response.offers){
      yield put(setOffers(response.offers?.sort(() => 0.5 - Math.random())))
    } else if (response.message){
      yield put(apiError(response.message))
    } else{
      yield put(apiError('Ocurrió un error obteniendo las ofertas del día. Intente refrescar la página.'))
    }
  } catch (error) {
    yield put(apiError('Ocurrió un error obteniendo las ofertas del día. Intente refrescar la página.'))
  }
}

function* homeSaga() {
  yield takeEvery(GET_OFFERS, getOffers)
}

export default homeSaga
