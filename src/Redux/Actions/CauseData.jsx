import { GET_CAUSES_ALL_DATA, SET_CAUSES_ALL_DATA, SET_CAUSE_DATA_COUNT } from "./ActionType"

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

export const setCauseDataCount = (payload) => {
    return {
        type: SET_CAUSE_DATA_COUNT,
        payload
    }
}