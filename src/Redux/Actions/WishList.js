import {
    ADDITEMTOWISHLIST, REMOVEFROMWISHLIST
} from '../Types';
export const addItemToWishList = payload => {
    return {
        type: ADDITEMTOWISHLIST,
        payload
    }
};
export const removeItemFromWishList = (payload) => {
    return {
        type: REMOVEFROMWISHLIST,
        payload
    }
};