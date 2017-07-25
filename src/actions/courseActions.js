"use strict";
import * as types from '../const/actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';



export function loadCourseSuccess(courses) {
  return {
      type: types.COURSES.LOAD_COURSES_SUCCESS,
      courses
  };
}

export function updateCourseSuccess(course) {
  return {
    type: types.COURSES.UPDATE_COURSE_SUCCESS,
    course
  };
}

export function saveCourseSuccess(course) {
  return {
    type: types.COURSES.CREATE_COURSE_SUCCESS,
    course
  };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.getAllCourses()
      .then(courses => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch(error => {
        throw(error);
      });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(course)
      .then(savedSource => {
        course.id
          ? dispatch(updateCourseSuccess(savedSource))
          :dispatch(saveCourseSuccess(savedSource));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw(error);
      });
  };
}
