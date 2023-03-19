import { all, put, takeLatest } from "redux-saga/effects";
import { API } from "../../Services/constants";
import { ADD_CAUSE, GET_CAUSES_ALL_DATA } from "../Actions/ActionType";
import { startLoader, stopLoader } from "../Actions/Loader";
import { getRequest, postRequest } from "../../Shared/Axios";
import { setCauseAllData, setCauseDataCount } from "../Actions/CauseData";
import { STATUS_CODE } from "../../Shared/Constants";

function* fetchCauseList({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield getRequest({
            API: API.CAUSE_LIST+`?limit=${payload.limit}&skip=${payload.skip}`
        })

        if (status === 200) {
            yield put(setCauseAllData(data?.data))
            yield put(setCauseDataCount(data?.totalCount))
        }
    
    } catch (error) {
        console.log(error);
        if (payload?.fail) {
            payload?.fail(error?.message);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* AddCauseList({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield postRequest({
            API: API.CAUSE_LIST,
            DATA: payload.formData
        })

        if (status === STATUS_CODE.SUCCESS_200 || status === STATUS_CODE.SUCCESS_201) {
           if (payload.success) {
                payload.success()
           }
        }
    
    } catch (error) {
        console.log(error);
        if (payload?.fail) {
            payload?.fail(error?.message);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* WatchCauseSaga() {
    yield all([
        takeLatest(ADD_CAUSE, AddCauseList), 
        takeLatest(GET_CAUSES_ALL_DATA, fetchCauseList), 
    ]);
}

export default WatchCauseSaga;