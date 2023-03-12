import { SET_USER_DATA, UPDATED_TOKEN } from "../Actions/ActionType"

const initial = {
    user_data: null,
    token: null,
}

const Auth = (state={...initial}, action)=> {
    switch(action.type) {
        case SET_USER_DATA:
            console.log("lkjlkj",action)
            return {
                ...state, 
                user_data: action.payload
            }
        case UPDATED_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        default:
            return state
    }
}
export default Auth