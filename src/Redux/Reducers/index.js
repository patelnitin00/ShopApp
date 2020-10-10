import Auth from './Auth'
import MyCart from './MyCart'
import Wishlist from './Wishlist'
import { combineReducers } from 'redux'

export default combineReducers({
    Auth: Auth,
    MyCart: MyCart,
    Wishlist: Wishlist
});
