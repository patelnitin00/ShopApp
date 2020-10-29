import Auth from './Auth'
import MyCart from './MyCart'
import Wishlist from './Wishlist'
import Main from './Main'
import { combineReducers } from 'redux'

export default combineReducers({
    Auth: Auth,
    MyCart: MyCart,
    Wishlist: Wishlist,
    Main: Main
});
