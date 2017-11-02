import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import WebIM from '../lib/webIM';

export function loginFailure(username, password, error) {
  const user = {username, password, fetching: false, error: error};
  return {type: types.LOGIN_FAILURE, user};
}

export function loginSuccess(msg) {
  return {type: types.LOGIN_SUCCESS, msg};
}


export function login(username, password) {
  return function (dispatch) {
    if (password === '')
      dispatch(loginFailure(username, password, 'WRONG'));
    else
      dispatch(loginSuccess(username, password, 'SUCCESS'));

    if (WebIM.conn.isOpened()) {
      WebIM.conn.close('logout');
    }
    console.log('open', username, password);
    WebIM.conn.open({
      apiUrl: WebIM.config.apiURL,
      user: username.trim().toLowerCase(),
      pwd: password,
      //  accessToken: password,
      appKey: WebIM.config.appkey
    });
  };
}
