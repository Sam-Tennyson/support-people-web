import { SET_ACTIVE_TAB } from "../Actions/ActionType"

const initial = {
    active_tab: null
}

const dashboard = (state={...initial}, action)=> {
    switch(action.type) {
        case SET_ACTIVE_TAB:
            return {
                ...state, 
                active_tab: action.payload
            }
        default:
            return state
    }
}
export default dashboard