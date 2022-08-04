import { post } from "./api_helper"
import * as url from "./url_helper"

const Login = data => post(url.LOGIN, data)
const Tracking = data => post(url.TRACKING, data)

export {
  Login,
  Tracking
}
