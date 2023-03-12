import { SET_CAUSES_ALL_DATA } from "../Actions/ActionType"

const initial = {
    cause_data: null
}

const CauseData = (state={...initial}, action)=> {
    switch(action.type) {
        case SET_CAUSES_ALL_DATA:
            return {
                ...state, 
                cause_data: action.payload
            }
        default:
            return state
    }
}
export default CauseData