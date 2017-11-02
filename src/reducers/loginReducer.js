import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function connectionReducer(state = initialState.loginUser, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return Object.assign({}, action.user);
    case types.LOGIN_SUCCESS:
      return Object.assign({}, action.msg);
    case types.LOGOUT_SUCCESS:
      return {};

    default:
      return state;
  }
}
