import React from "react"
import { Redirect } from "react-router-dom"
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Dashboard from "../pages/Dashboard/index"
import Checkout from "../pages/Products/index"
import History from "../pages/Orders/History/index"

const authProtectedRoutes = [
  { path: "/", component: Dashboard },
  { path: "/orders/checkout", exact: true, component: Checkout },
  { path: "/orders/history", exact: true, component: History },
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/" /> },
]

const publicRoutes = [
  { path: "/", component: Checkout },
  { path: "/orders/history", exact: true, component: History },
  // { path: "/logout", component: Logout },
  // { path: "/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
