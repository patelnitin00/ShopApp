
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './Reducers/index';
const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
export default store;