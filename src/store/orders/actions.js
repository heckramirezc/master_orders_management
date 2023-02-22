import {
  GET_PRODUCT,
  SAVE_PRODUCT,
  SAVE_PRODUCT_RESULT,
  REMOVE_PRODUCT_RESULT,
  SET_PRODUCT,
  SET_PRODUCTS,
  UNSET_PRODUCT,
  GET_ORDERS,
  GET_PRODUCTS,
  GET_ORDER_DETAIL,
  REMOVE_PRODUCT,
  SAVE_ORDER,
  ORDER_PRODUCT_API_ERROR,
  ORDER_PRODUCTS_API_ERROR,
  ORDER_HISTORY_ERROR,
  ADD_PRODUCT_CART,
  REMOVE_PRODUCT_CART,
  ORDER_API_ERROR,
  AMOUNT_UP_PRODUCT_CART,
  AMOUNT_DOWN_PRODUCT_CART,
  SET_ORDER,
  SET_ORDERS,
  UNSET_ORDER_DETAIL,
  SET_ORDER_DETAIL,
  SET_CUSTOMER
} from "./actionTypes"

export const saveOrder = (request, history) => {
  return {
    type: SAVE_ORDER,
    payload: { request, history },
  }
}

export const getProduct = (request) => {
  return {
    type: GET_PRODUCT,
    payload: { request },
  }
}

export const getProducts = () => {
  return {
    type: GET_PRODUCTS
  }
}

export const saveProduct = (request) => {
  return {
    type: SAVE_PRODUCT,
    payload: { request },
  }
}

export const getOrders = (request) => {
  return {
    type: GET_ORDERS,
    payload: { request },
  }
}

export const getOrderDetail = (request) => {
  return {
    type: GET_ORDER_DETAIL,
    payload: { request },
  }
}

export const setCustomer = customer => {
  return {
    type: SET_CUSTOMER,
    payload: customer,
  }
}

export const apiError = error => {
  return {
    type: ORDER_API_ERROR,
    payload: error,
  }
}

export const apiProductError = error => {
  return {
    type: ORDER_PRODUCT_API_ERROR,
    payload: error,
  }
}

export const saveProductsResult = (request) => {
  return {
    type: SAVE_PRODUCT_RESULT,
    payload: request,
  }
}

export const removeProductsResult = (request) => {
  return {
    type: REMOVE_PRODUCT_RESULT,
    payload: request,
  }
}

export const apiProductsError = error => {
  return {
    type: ORDER_PRODUCTS_API_ERROR,
    payload: error,
  }
}

export const historyError = error => {
  return {
    type: ORDER_HISTORY_ERROR,
    payload: error,
  }
}

export const setOrderResult = order => {
  return {
    type: SET_ORDER,
    payload: order,
  }
}

export const setOrdersResult = order => {
  return {
    type: SET_ORDERS,
    payload: order,
  }
}

export const setOrderDetailResult = detail => {
  return {
    type: SET_ORDER_DETAIL,
    payload: detail,
  }
}

export const setProduct = product => {
  return {
    type: SET_PRODUCT,
    payload: product,
  }
}

export const removeProduct = (request) => {
  return {
    type: REMOVE_PRODUCT,
    payload: { request },
  }
}

export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  }
}

export const unsetProduct = () => {
  return {
    type: UNSET_PRODUCT
  }
}


export const unsetOrderDetailResult = () => {
  return {
    type: UNSET_ORDER_DETAIL
  }
}

export const addToCart = product => {
  product = {
    ...product,
    toAdd: false
  }
  return {
    type: ADD_PRODUCT_CART,
    payload: product,
  }
}

export const amountUP = (barcode, prev_amount) => {
  return {
    type: AMOUNT_UP_PRODUCT_CART,
    payload: { barcode, prev_amount },
  }
}

export const amountDown = (barcode, prev_amount) => {
  return {
    type: AMOUNT_DOWN_PRODUCT_CART,
    payload: { barcode, prev_amount },
  }
}

export const removeFromCart = barcode => {
  return {
    type: REMOVE_PRODUCT_CART,
    payload: barcode,
  }
}