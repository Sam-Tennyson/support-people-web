import { all, put, takeLatest } from "redux-saga/effects";
import { API } from "../../Services/constants";
import { GET_CAUSES_ALL_DATA } from "../Actions/ActionType";
import { startLoader, stopLoader } from "../Actions/Loader";
import { getRequest, newGetRequest } from "../../Shared/Axios";
import { setCauseAllData } from "../Actions/CauseData";

function* fetchCauseList({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield newGetRequest({
            API: API.CAUSE_LIST
        })
        console.log(data)
        if (status === 200) {
            yield put(setCauseAllData(data?.data))
        }
    
    } catch (error) {
        console.log(error);
        if (payload?.fail) {
            payload?.fail(error?.data?.message);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* WatchCauseSaga() {
    yield all([
        takeLatest(GET_CAUSES_ALL_DATA, fetchCauseList), 
    ]);
}

export default WatchCauseSaga;