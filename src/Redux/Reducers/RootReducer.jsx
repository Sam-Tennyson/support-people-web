import { combineReducers } from 'redux';
import Auth from './Auth';
import CauseData from './CauseData';
import dashboard from './Dashboard';
import Loader from './Loader';

const appReducer = combineReducers({
  dashboard: dashboard,
  auth: Auth,
  causeData: CauseData,
  loading: Loader
});

const RootReducer = (state, action) => {
  return appReducer(state, action);
};

export default RootReducer;