import { LOGIN, LOGOUT } from '../Types';
const intialState = {
    user: {
    },
    isLogin: false
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                user: action.payload,
                isLogin: true
            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: {},
                isLogin: false
            }
        }
        default:
            return state

    }
}
export default reducer;