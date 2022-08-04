import { call, put, takeEvery } from "redux-saga/effects"
import { TRACKING } from "./actionTypes"
import { apiError, setTracking } from "./actions"
import { Tracking } from "../../../helpers/backend_helper"

function* tracking({ payload: { code } }) {
  try {
    const response = yield call(Tracking, {
      code
    })
    if (response.code && response.code == 1 && response.tracking){
      yield put(setTracking(response.tracking))
    } else if (response.message){
      yield put(apiError(response.message))
    } else{
      yield put(apiError('Ocurrió un error obteniendo el seguimiento de la recepción. Intente de nuevo.'))
    }
  } catch (error) {
    yield put(apiError('Ocurrió un error obteniendo el seguimiento de la recepción. Intente de nuevo.'))
  }
}

function* trackingSaga() {
  yield takeEvery(TRACKING, tracking)
}

export default trackingSaga
