import Cookies from 'universal-cookie';

const cookies = new Cookies();

function set(key, value) {
    cookies.set(key, value, { path: '/' });
}
function get(key) {
    let value = cookies.get(key);
    if (value) {
        return value;
    }
    return null
}
function remove(key) {
    let value = cookies.get(key);
    if (value) {
        cookies.remove(key);
        return true;
    }
    return false;
}
function setAccessToken(value) {
    cookies.set("_jwt", value);
}
function getAccessToken() {
    return cookies.get("_jwt");
}
function getCurrentUser() {
    return get('_user');
}
function setCurrentUser(value) {
    cookies.set("_user", value)
}

export const cookiesUtil = {
    set,
    get,
    remove,
    setAccessToken,
    getAccessToken,
    getCurrentUser,
    setCurrentUser
};
