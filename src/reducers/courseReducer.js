import * as types from '../const/actionTypes';
import initialState from './initialState';

export default function courseReducer(state=initialState.courses, action) {
  switch (action.type){
    case types.COURSES.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.COURSES.CREATE_COURSE_SUCCESS:
      return [...state, Object.assign({}, action.course)];
    case types.COURSES.UPDATE_COURSE_SUCCESS:
      return [...state.filter(x => x.id !== action.course.id),
        Object.assign({}, action.course)];
    default:
      return state;
  }
}
