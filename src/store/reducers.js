import { combineReducers } from "redux"
import Layout from "./layout/reducer"
import Login from "./auth/login/reducer"
import Tracking from "./reception/tracking/reducer"
import Profile from "./auth/profile/reducer"

const rootReducer = combineReducers({
  Layout,
  Login,
  Tracking,
  Profile
})

export default rootReducer
