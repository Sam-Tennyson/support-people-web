import { SET_CAUSES_ALL_DATA, SET_CAUSE_DATA_COUNT } from "../Actions/ActionType"

const initial = {
    cause_data: null,
    cause_data_count: ""
}

const CauseData = (state={...initial}, action)=> {
    switch(action.type) {
        case SET_CAUSES_ALL_DATA:
            return {
                ...state, 
                cause_data: action.payload
            }
        case SET_CAUSE_DATA_COUNT:
            return {
                ...state,
                cause_data_count: action.payload
            }
        default:
            return state
    }
}
export default CauseData