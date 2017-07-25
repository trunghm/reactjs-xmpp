"use strict";
import * as types from '../const/actionTypes';
import authorApi from '../api/mockAuthorApi';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadAuthorSuccess(authors) {
  return {
    type: types.AUTHORS.LOAD_AUTHORS_SUCCESS,
    authors
  };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return authorApi.getAllAuthors()
      .then(authors => {
        dispatch(loadAuthorSuccess(authors));
      })
      .catch(error => {
        throw(error);
      });
  };
}
