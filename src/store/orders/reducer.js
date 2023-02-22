import {
  GET_PRODUCT,
  GET_PRODUCTS,
  GET_ORDERS,
  GET_ORDER_DETAIL,
  SET_PRODUCT,
  SET_PRODUCTS,
  UNSET_PRODUCT,
  UNSET_ORDER_DETAIL,
  ORDER_PRODUCT_API_ERROR,
  SAVE_ORDER,
  ADD_PRODUCT_CART,
  REMOVE_PRODUCT_CART,
  REMOVE_PRODUCT_RESULT,
  AMOUNT_UP_PRODUCT_CART,
  AMOUNT_DOWN_PRODUCT_CART,
  ORDER_HISTORY_ERROR,
  ORDER_API_ERROR,
  SET_ORDER,
  SAVE_PRODUCT,
  ORDER_PRODUCTS_API_ERROR,
  SET_ORDERS,
  SET_ORDER_DETAIL,
  SAVE_PRODUCT_RESULT,
  SET_CUSTOMER
} from "./actionTypes"

const initialState = {
  products: [],
  product: null,
  productResult: null,
  removeProductResult: null,
  order: null,
  customer: null,
  error: "",
  errorHistory: "",
  productError: "",
  productsError: "",
  cart: [],
  orders: [],
  orderDetail: null,
  loading: false,
  loadingProduct: false,
  loadingProducts: false,
  loadingProductResult: false,
  loadingHistory: false,
}

const orders = (state = initialState, action) => {
  let cart = state.cart
  switch (action.type) {
    case GET_PRODUCT:
      state = {
        ...state,
        product: null,
        error: "",
        productError: "",
        productsError: "",
        loadingProduct: true,
      }
      break
    case GET_PRODUCTS:
      state = {
        ...state,
        productResult: null,
        removeProductResult: null,
        products: [],
        error: "",
        productsError: "",
        loadingProducts: true,
      }
      break
    case GET_ORDERS:
        state = {
          ...state,
          product: null,
          orderDetail: null,
          orders: [],
          errorHistory: "",
          loadingHistory: true,
        }
        break
    case GET_ORDER_DETAIL:
        state = {
          ...state,
          product: null,
          orderDetail: null,
          errorHistory: "",
          loadingHistory: true,
        }
        break
    case SAVE_ORDER:
      state = {
        ...state,
        product: null,
        error: "",
        productError: "",
        loading: true,
      }
      break
    case SAVE_PRODUCT:
      state = {
        ...state,
        productResult: null,
        removeProductResult: null,
        error: "",
        productsError: "",
        loadingProductResult: true,
      }
      break
    case SET_PRODUCT:
      state = { ...state, 
        error: "",
        productResult: null,
        removeProductResult: null,
        productsError: "",
        product: action.payload, 
        loadingProduct: false 
      }
      break
    case SET_PRODUCTS:
        state = { ...state, 
          error: "",
          productResult: null,
          removeProductResult: null,
          productsError: "",
          products: action.payload, 
          loadingProducts: false 
        }
        break
    case UNSET_PRODUCT:
        state = { ...state, 
          error: "",
          product: null, 
          productsError: "",
          loadingProduct: false 
        }
        break
    case SAVE_PRODUCT_RESULT:
        state = { ...state, 
          productsError: null,
          loadingProductResult: false,
          productResult: action.payload, 
          removeProductResult: null
        }
        break
    case REMOVE_PRODUCT_RESULT:
        state = { ...state, 
          productsError: null,
          loadingProductResult: false,
          removeProductResult: action.payload, 
          productResult: null
        }
        break
    case UNSET_ORDER_DETAIL:
        state = { ...state, 
          error: "",
          orderDetail: null, 
          loadingHistory: false 
        }
        break
        
    case ADD_PRODUCT_CART:
      cart.push(action.payload)
      
      state = { ...state, 
        error: "",
        cart, 
        loading: false 
      }
      break
    case REMOVE_PRODUCT_CART:
      let cartFiltered = cart.filter(function (p) {
        return p.barcode !== action.payload;
      });

      state = { ...state, 
        error: "",
        cart: cartFiltered, 
        loading: false 
      }
      break
    case AMOUNT_UP_PRODUCT_CART:
      cart = cart.map(p =>
        p.barcode === action.payload.barcode ? { ...p, amount: p.amount < p.stock ? action.payload.prev_amount + 1 : p.amount } : p
      )
      state = { ...state, 
        error: "",
        cart, 
        loading: false 
      }
      break
    case AMOUNT_DOWN_PRODUCT_CART:
      cart = cart.map(p =>
        p.barcode === action.payload.barcode ? { ...p, amount: p.amount > 1 ? action.payload.prev_amount - 1 : p.amount } : p
      )
      state = { ...state, 
        error: "",
        cart, 
        loading: false 
      }
      break
    case ORDER_PRODUCTS_API_ERROR:
      state = { 
        ...state, 
        productResult: null,
        removeProductResult: null,
        products: [],
        productsError: action.payload, 
        loadingProducts: false ,
        loadingProductResult: false
      }
      break
    case ORDER_PRODUCT_API_ERROR:
      state = { 
        ...state, 
        product: null,
        error: "",
        productError: action.payload, 
        loadingProduct: false 
      }
      break
    case ORDER_HISTORY_ERROR:
        state = { 
          ...state, 
          product: null,
          error: "",
          errorHistory: action.payload, 
          loadingHistory: false 
        }
        break
    case ORDER_API_ERROR:
      state = { 
        ...state, 
        error: action.payload, 
        loading: false 
      }
      break
    case SET_CUSTOMER:
        state = { 
          ...state, 
          error: "",
          customer: action.payload, 
          loading: false 
        }
      break
    case SET_ORDER:
        state = { 
          ...initialState, 
          error: "",
          cart: [],
          order: action.payload, 
          loading: false 
        }
      break
    case SET_ORDERS:
        state = { 
          ...state, 
          errorHistory: "",
          orders: action.payload, 
          loadingHistory: false 
        }
      break
    case SET_ORDER_DETAIL:
        state = { 
          ...state, 
          errorHistory: "",
          orderDetail: action.payload, 
          loadingHistory: false 
        }
      break
    default:
      state = { ...state }
      break
  }
  return state
}

export default orders
