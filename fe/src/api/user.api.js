import ajaxHelper from ".";
import { config } from "../config";

function handleResponse(response) {
    return response.then(
        data => {
            return data.data;
        },
        error => {
            return Promise.reject(error?.response?.data?.message || error?.response?.data || "INTERNAL SERVER ERROR");
        }
    );
}

const BASE_URL = config.API_URL;
const CONFIG_URL = {
    SIGN_IN: BASE_URL + 'sign-in',
    SIGN_IN_GOOGLE: BASE_URL + 'sign-in-google',
    SIGN_UP: BASE_URL + 'sign-up'
}

function signIn(data) {
    return handleResponse(
        ajaxHelper.post(CONFIG_URL.SIGN_IN, data, {})
    );
}
function signInGoogle(data) {
    return handleResponse(
        ajaxHelper.post(CONFIG_URL.SIGN_IN_GOOGLE, data, {})
    );
}

async function signUp(data) {
    return handleResponse(
        ajaxHelper.post(CONFIG_URL.SIGN_UP, data, {})
    );
}

export const userAPI = {
    signIn,
    signInGoogle,
    signUp,
};