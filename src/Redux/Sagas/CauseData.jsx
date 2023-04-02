import { all, put, takeLatest } from "redux-saga/effects";
import { API } from "../../Services/constants";
import { ADD_CAUSE, DELETE_CAUSE, EDIT_CAUSE, GET_CAUSES_ALL_DATA } from "../Actions/ActionType";
import { startLoader, stopLoader } from "../Actions/Loader";
import { deleteRequest, getRequest, postRequest, putRequest } from "../../Shared/Axios";
import { setCauseAllData, setCauseDataCount } from "../Actions/CauseData";
import { STATUS_CODE } from "../../Shared/Constants";

function* fetchCauseList({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield getRequest({
            API: API.CAUSE_LIST+`?limit=${payload.limit}&skip=${payload.skip}${payload.all ? `&all=${payload.all}` : ""}`
        })

        if (status === 200) {
            yield put(setCauseAllData(data?.data))
            yield put(setCauseDataCount(data?.totalCount))
            if (payload.success) {
                payload.success(data)
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

function* editCauseListRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield putRequest({
            API: API.CAUSE_LIST+`/${payload?.id}`,
            DATA: payload.formData
        })

        console.log(data, status)
        if (status === STATUS_CODE.SUCCESS_200 || status === STATUS_CODE.SUCCESS_201) {
           if (payload.success) {
                payload.success(data?.message)
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

function* deleteCauseListRequest({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield deleteRequest({
            API: API.CAUSE_LIST+`/${payload?.id}`,
            DATA: payload.formData
        })
        console.log(data)
        if (status === STATUS_CODE.SUCCESS_200 || status === STATUS_CODE.SUCCESS_201) {
           if (payload.success) {
                payload.success(data?.message)
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
        takeLatest(EDIT_CAUSE, editCauseListRequest), 
        takeLatest(DELETE_CAUSE, deleteCauseListRequest), 
        takeLatest(GET_CAUSES_ALL_DATA, fetchCauseList), 
    ]);
}

export default WatchCauseSaga;