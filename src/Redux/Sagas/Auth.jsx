import { all, put, takeLatest } from "redux-saga/effects";
import { API } from "../../Services/constants";
import { LOGIN, SIGN_UP } from "../Actions/ActionType";
import { startLoader, stopLoader } from "../Actions/Loader";
import { getRequest, postRequest } from "../../Shared/Axios";
import { setUpdatedToken, setUserData } from "../Actions/Auth";
import { STATUS_CODE } from "../../Shared/Constants";

function* makeLogin({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield postRequest({
            API: API.LOGIN,
            DATA: payload?.formData
        })
        console.log(data)
        if (status === STATUS_CODE.SUCCESS_200) {
            if (payload?.success) {
                yield put(setUpdatedToken(data?.token))
                yield put(setUserData(data?.data))
                payload?.success(data);
            }
        }
    
    } catch (error) {
        console.log(error);
        if (payload?.fail) {
            payload?.fail(error?.response?.data?.errMgs);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* makeSign({payload}) {
    try {
        yield put(startLoader())
        const {data, status} = yield postRequest({
            API: API.SIGN_UP,
            DATA: payload?.formData
        })
        console.log(data)
        if (status === STATUS_CODE.SUCCESS_200) {
            if (payload?.success) {
                payload?.success(data);
            }
        }
    
    } catch (error) {
        console.log(error);
        if (payload?.fail) {
            payload?.fail(error?.response?.data?.errMsg);
        }
    }
    finally{
        yield put(stopLoader())
    }
}

function* authSaga() {
    yield all([
        takeLatest(LOGIN, makeLogin),  
        takeLatest(SIGN_UP, makeSign),  
    ]);
}

export default authSaga;