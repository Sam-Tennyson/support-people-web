import { GET_CAUSES_ALL_DATA, SET_CAUSES_ALL_DATA } from "./ActionType"

export const getCauseAllData = (payload) => {
    return {
        type: GET_CAUSES_ALL_DATA,
        payload,
    }
}

export const setCauseAllData = (payload) => {
    return {
        type: SET_CAUSES_ALL_DATA,
        payload,
    }
}