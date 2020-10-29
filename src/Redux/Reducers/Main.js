import { SETLOADING } from '../Types';
const intialState = {
    loading: false
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case SETLOADING: {
            console.log(action.payload)
            return {
                ...state,
                loading: action.payload,
            }
        }
        default:
            return state

    }
}
export default reducer;