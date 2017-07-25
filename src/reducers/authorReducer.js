import * as types from '../const/actionTypes';
import initialState from './initialState';

export default function authorReducer(state=initialState.authors, action) {
  switch (action.type){
    case types.AUTHORS.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}
