import React from "react"
import { Redirect } from "react-router-dom"
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Dashboard from "../pages/Dashboard/index"

const authProtectedRoutes = [
  { path: "/", component: Dashboard },
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
