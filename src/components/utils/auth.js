import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

export const getAuthToken = () => {
    const token = Cookies.get('accessToken');
    console.log('Token = ', token);
    return token || null;
};

export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (error) {
        console.error("Token is invalid", error);
        return false;
    }
};
