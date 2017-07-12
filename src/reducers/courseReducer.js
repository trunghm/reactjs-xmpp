import * as types from '../const/actionTypes';

export default function courseReducer(state=[], action) {
  switch (action.type){
    case types.COURSES.LOAD_COURSE_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
