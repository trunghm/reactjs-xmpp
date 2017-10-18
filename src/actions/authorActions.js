import AuthorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function deleteAuthorsSuccess(authorId) {
  return {type: types.DELETE_AUTHOR_SUCCESS, authorId};
}

export function createAuthorsSuccess(author) {
  return {type: types.CREATE_AUTHOR_SUCCESS, author};
}

export function updateAuthorsSuccess(author) {
  return {type: types.UPDATE_AUTHOR_SUCCESS, author};
}

export function loadAuthors() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveAuthor(author) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthorApi.saveAuthor(author).then(author => {
      author.id
        ? dispatch(updateAuthorsSuccess(author))
        : dispatch(createAuthorsSuccess(author));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  };
}

export function deleteAuthor(authorId) {
  return dispatch => {
    dispatch(beginAjaxCall());
    return AuthorApi.deleteAuthor(authorId).then(result => {
      dispatch(deleteAuthorsSuccess(authorId));
    }).catch(error => {
      throw(error);
    });
  };
}
