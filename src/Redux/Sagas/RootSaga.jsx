import { all, fork } from "redux-saga/effects";
import authSaga from "./Auth";
import WatchCauseSaga from "./CauseData";
import dashboardSaga from "./Dashboard";

function* rootSaga() {
  yield all([fork(dashboardSaga)]);
  yield all([fork(authSaga)]);
  yield all([fork(WatchCauseSaga)]);
}

export default rootSaga;