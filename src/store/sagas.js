import { all, fork } from "redux-saga/effects"
import AuthSaga from "./auth/login/saga"
import TrackingSaga from "./reception/tracking/saga"
import LayoutSaga from "./layout/saga"

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(TrackingSaga),
    fork(LayoutSaga)
  ])
}
