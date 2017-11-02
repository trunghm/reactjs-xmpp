import {combineReducers} from 'redux';
import courses from './courseReducer';
import loginUser from './loginReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  ajaxCallsInProgress,
  loginUser
});

export default rootReducer;
