import { LOGIN, SET_USER_DATA, SIGN_UP, UPDATED_TOKEN } from "./ActionType"

export const login = (payload) => {
    return {
        type: LOGIN,
        payload,
    }
}

export const signup = (payload) => {
    return {
        type: SIGN_UP,
        payload,
    }
}

export const setUserData = (payload) => {
    return {
        type: SET_USER_DATA,
        payload,
    }
}

export const setUpdatedToken = (payload) => {
    return {
        type: UPDATED_TOKEN,
        payload,
    }
}