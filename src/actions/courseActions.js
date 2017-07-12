"use strict";
import * as types from '../const/actionTypes';

import courseApi from '../api/mockCourseApi';

export function loadCourseSuccess(courses) {
  return {
      type: types.COURSES.LOAD_COURSE_SUCCESS,
      courses
  };
}

export function loadCourses() {
  return function (dispatch) {
    return courseApi.getAllCourses()
      .then(courses => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch(error => {
        throw(error);
      });
  };
}
