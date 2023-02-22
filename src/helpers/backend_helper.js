import { post } from "./api_helper"
import * as url from "./url_helper"

const Login = data => post(url.LOGIN, data)
const Offers = data => post(url.OFFERS, data)
const Save = data => post(url.SAVE, data)
const Product = data => post(url.PRODUCT, data)
const Products = data => post(url.PRODUCTS, data)
const SaveProduct = data => post(url.SAVEPRODUCT, data)
const RemoveProduct = data => post(url.REMOVEPRODUCT, data)
const Orders = data => post(url.ORDERS, data)
const Detail = data => post(url.DETAIL, data)

export {
  Login,
  Offers, 
  Save, 
  Orders,
  Product,
  Products,
  SaveProduct,
  RemoveProduct,
  Detail
}
