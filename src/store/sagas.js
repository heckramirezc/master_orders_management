import { all, fork } from "redux-saga/effects"
import AuthSaga from "./auth/login/saga"
import HomeSaga from "./home/saga"
import OrdersSaga from "./orders/saga"
import LayoutSaga from "./layout/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(HomeSaga),
    fork(LayoutSaga),
    fork(OrdersSaga)
  ])
}
