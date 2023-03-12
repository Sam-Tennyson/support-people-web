import { SET_ACTIVE_TAB } from "./ActionType"

export const setActiveTab = (payload) => {
    return {
        type: SET_ACTIVE_TAB,
        payload
    }
}