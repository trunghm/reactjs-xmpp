import * as types from '../const/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(actionType) {
  return actionType.substring(actionType.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type === types.AJAXS.BEGIN_AJAX_CALL) {
    return state + 1;
  }
  else if (action.type === types.AJAXS.AJAX_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
