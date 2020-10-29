import { SETLOADING } from '../Types';
export const setLoading = payload => {
    return {
        type: SETLOADING,
        payload: payload
    }
};