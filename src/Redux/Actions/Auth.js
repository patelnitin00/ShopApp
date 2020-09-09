import { LOGIN, LOGOUT } from '../Types';
import auth from '@react-native-firebase/auth';
export const login = payload => {
    return {
        type: LOGIN,
        payload: payload
    }
};
export const logout = () => {

    auth()
        .signOut();
    return {
        type: LOGOUT,
        payload: { uid: '' }
    }
};