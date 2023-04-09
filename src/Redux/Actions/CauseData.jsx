import { ADD_CAUSE, DELETE_CAUSE, EDIT_CAUSE, GET_CAUSES_ALL_DATA, SET_CAUSES_ALL_DATA, SET_CAUSE_DATA_COUNT } from "./ActionType"

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

export const addCauseData = (payload) => {
    return {
        type: ADD_CAUSE,
        payload
    }
}

export const editCauseData = (payload) => {
    return {
        type: EDIT_CAUSE,
        payload
    }
}

export const deleteCauseData = (payload) => {
    return {
        type: DELETE_CAUSE,
        payload
    }
}