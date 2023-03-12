import { START_LOADER, STOP_LOADER } from "./ActionType"

export const stopLoader = () => {
    return {
        type: STOP_LOADER
    }
}

export const startLoader = () => {
    return {
        type: START_LOADER
    }
}