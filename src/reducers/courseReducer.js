import * as types from '../const/actionTypes';

export default function courseReducer(state=[], action) {
  switch (action.type){
    case types.COURSES.CREATE_COURSE:
      return [...state, Object.assign({}, action.course)];
    default:
      return state;
  }
}
