import Auth from './Auth'
import MyCart from './MyCart'
import { combineReducers } from 'redux'

export default combineReducers({
    Auth: Auth,
    MyCart: MyCart,
});
