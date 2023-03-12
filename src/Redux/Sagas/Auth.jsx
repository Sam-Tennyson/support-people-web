import { all, put, takeLatest } from "redux-saga/effects";
import { API } from "../../Services/constants";
import { LOGIN } from "../Actions/ActionType";
import { startLoader, stopLoader } from "../Actions/Loader";
import { getRequest, postRequest } from "../../Shared/Axios";

function* makeLogin({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield postRequest({
            API: API.LOGIN,
            DATA: payload?.formData
        })
        console.log(data)
        if (status === 200) {
            if (payload?.success) {
                payload?.success(data);
            }
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

function* authSaga() {
    yield all([
        takeLatest(LOGIN, makeLogin),  
    ]);
}

export default authSaga;