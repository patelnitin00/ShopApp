import {
    ADDITEMTOCART, REMOVEFROMCART,
    INCREMENTQTY, DECREMENTQTY
} from '../Types';
export const addItemToCart = payload => {
    return {
        type: ADDITEMTOCART,
        payload
    }
};
export const removeItemFromCart = (payload) => {
    return {
        type: REMOVEFROMCART,
        payload
    }
};
export const incrementQty = (payload) => {
    return {
        type: INCREMENTQTY,
        payload
    }
};
export const decrementQty = (payload) => {
    return {
        type: DECREMENTQTY,
        payload
    }
};