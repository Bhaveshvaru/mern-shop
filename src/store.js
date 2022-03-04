import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducers,
  productReducers,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {userLoginReducers,userRegisterReducers,userDetailsReducers,updateUserProfileReducers} from "./reducers/userReducers"
import {orderCreateReducers,orderDetailsReducer,orderPayReducer} from "./reducers/orderReducers"

const reducer = combineReducers({
  productList: productReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
  userLogin:userLoginReducers,
  userRegister:userRegisterReducers,
  userDetails:userDetailsReducers,
  userUpdateProfile:updateUserProfileReducers,
  orderCreate:orderCreateReducers,
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer
})

//initilize data from localstorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

  const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

  const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: { cartItems: cartItemsFromStorage ,shippingAddress:shippingAddressFromStorage},
  userLogin:{userInfo:userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
