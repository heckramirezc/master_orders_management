import { combineReducers } from "redux"
import Layout from "./layout/reducer"
import Login from "./auth/login/reducer"
import Home from "./home/reducer"
import Orders from "./orders/reducer"
import Profile from "./auth/profile/reducer"

const rootReducer = combineReducers({
  Layout,
  Login,
  Home,
  Profile,
  Orders
})

export default rootReducer
