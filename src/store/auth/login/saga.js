import { call, put, takeEvery } from "redux-saga/effects"
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes"
import { apiError, loginSuccess } from "./actions"
import { Login } from "../../../helpers/backend_helper"

function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(Login, user)
    if (response.code && response.code == 1 && response.user){
      localStorage.setItem("authUser", JSON.stringify(response.user))
      yield put(loginSuccess(response.user))
      history.push("/")
    } else if (response.message){
      yield put(apiError(response.message))
    } else{
      yield put(apiError('Ocurrió un error verificando la recepción. Intente de nuevo.'))  
    }
  } catch (error) {
    yield put(apiError('Ocurrió un error verificando la recepción. Intente de nuevo.'))
  }
}

function changeBodyAttribute(attribute, value) {
  if (document.body) document.body.setAttribute(attribute, value)
  return true
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser")
    yield call(changeBodyAttribute, "data-layout", "vertical")
    history.push("/login")
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
}

export default authSaga
