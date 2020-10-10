import {
    ADDITEMTOWISHLIST, REMOVEFROMWISHLIST,
} from '../Types';
const intialState = {
    wishList: []
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case ADDITEMTOWISHLIST: {
            var newWishList = [...state.wishList];
            const index = newWishList.findIndex(item => item.id == action.payload.id)
            if (index < 0) {
                newWishList.push({ ...action.payload, quantity: 1 })
            }
            else {
                newWishList[index].quantity += 1;
            }
            return {
                ...state,
                wishList: newWishList
            }
        }
        case REMOVEFROMWISHLIST: {
            var newWishList = [...state.wishList];
            newWishList = newWishList.filter(item => item.id != action.payload.id)
            return {
                ...state,
                wishList: newWishList
            }
        }
        default:
            return state
    }
}
export default reducer;