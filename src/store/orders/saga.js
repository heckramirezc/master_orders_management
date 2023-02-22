import { call, put, takeEvery } from "redux-saga/effects"
import { SAVE_ORDER, GET_PRODUCT, GET_PRODUCTS, GET_ORDERS, GET_ORDER_DETAIL, SAVE_PRODUCT, REMOVE_PRODUCT } from "./actionTypes"
import { apiError, setOrderResult, saveProductsResult, removeProductsResult, setProduct, setProducts, apiProductError, apiProductsError, setOrdersResult, setOrderDetailResult, historyError } from "./actions"
import { Save, Product, Products, SaveProduct, RemoveProduct, Orders, Detail } from "../../helpers/backend_helper"

function* getProduct({ payload: { request } }) {
  try {
    const response = yield call(Product, request)
    if (response.code && response.code == 1 && response.product){
      const product = {
        ...response.product,
        amount: 1,
        toAdd: true
      }
      yield put(setProduct(product))
    } else if (response.message){
      yield put(apiProductError(response.message))
    } else{
      yield put(apiProductError('Ocurrió un error buscando el producto solicitado.'))
    }
  } catch (error) {
    yield put(apiProductError('Ocurrió un error buscando el producto solicitado.'))
  }
}

function* getProducts() {
  try {
    const response = yield call(Products)
    if (response.code && response.code == 1 && response.products && 
      response.products.length && response.products.length > 0) {
      yield put(setProducts(response.products))
    } else if (response.message){
      yield put(apiProductsError(response.message))
    } else{
      yield put(apiProductsError('Ocurrió un error obteniendo los productos gestionados.'))
    }
  } catch (error) {
    console.log('error', error)
    yield put(apiProductsError('Ocurrió un error obteniendo los productos gestionados.'))
  }
}

function* saveProduct({ payload: { request } }) {
  try {
    const response = yield call(SaveProduct, request)
    
    if (response.code) {
      yield put(saveProductsResult(response))
    } else{
      const errorResponse = {
        "code": 3,
        "indicator": "ERROR",
        "message": "Ocurrió un error guardando el producto."
    }
      yield put(saveProductsResult(errorResponse))
    }
  } catch (error) {
    const errorResponse = {
      "code": 3,
      "indicator": "ERROR",
      "message": "Ocurrió un error guardando el producto."
  }
    yield put(saveProductsResult(errorResponse))
  }
}
function* removeProduct({ payload: { request } }) {
  try {
    const response = yield call(RemoveProduct, request)
    
    if (response.code) {
      yield put(removeProductsResult(response))
    } else{
      const errorResponse = {
        "code": 3,
        "indicator": "ERROR",
        "message": "Ocurrió un error eliminando el producto."
    }
      yield put(removeProductsResult(errorResponse))
    }
  } catch (error) {
    const errorResponse = {
      "code": 3,
      "indicator": "ERROR",
      "message": "Ocurrió un error eliminando el producto."
  }
    yield put(removeProductsResult(errorResponse))
  }
}

function* saveOrder({ payload: { request, history }}) {
  try {
    const response = yield call(Save, request)
    if (response.code && response.code == 1 && response.order){
      yield put(setOrderResult(response.order))
      history.push("/orders/history")
    } else if (response.message){
      yield put(apiError(response.message))
    } else{
      yield put(apiError('Ocurrió un error guardando tu pedido. Intenta de nuevo.'))
    }
  } catch (error) {
    yield put(apiError('Ocurrió un error guardando tu pedido. Intenta de nuevo.'))
  }
}

function* getOrders({ payload: { request } }) {
  try {
    const response = yield call(Orders, request)
    if (response.code && response.code == 1 && response.orders && response.orders.length && response.orders.length > 0){
      yield put(setOrdersResult(response.orders))
    } else if (response.message){
      yield put(historyError(response.message))
    } else{
      yield put(historyError('Ocurrió un error obteniendo historial de pedidos.'))
    }
  } catch (error) {
    yield put(historyError('Ocurrió un error obteniendo historial de pedidos.'))
  }
}

function* getOrderDetail({ payload: { request } }) {
  try {
    const response = yield call(Detail, request)
    if (response.code && response.code == 1 && response.products && response.products.length && response.products.length > 0){
      const detail = {
        order : request.code,
        products: response.products
      }
      yield put(setOrderDetailResult(detail))
    } else if (response.message){
      yield put(historyError(response.message))
    } else{
      yield put(historyError('Ocurrió un error obteniendo detalle del pedido.'))
    }
  } catch (error) {
    yield put(historyError('Ocurrió un error obteniendo detalle del pedido.'))
  }
}

function* orderSaga() {
  yield takeEvery(GET_PRODUCT, getProduct)
  yield takeEvery(GET_PRODUCTS, getProducts)
  yield takeEvery(SAVE_PRODUCT, saveProduct)
  yield takeEvery(REMOVE_PRODUCT, removeProduct)
  yield takeEvery(SAVE_ORDER, saveOrder)
  yield takeEvery(GET_ORDERS, getOrders)
  yield takeEvery(GET_ORDER_DETAIL, getOrderDetail)
}

export default orderSaga
