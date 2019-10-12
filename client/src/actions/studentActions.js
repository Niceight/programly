import axios from "axios";

import {
  GET_STUDENT,
  GET_STUDENTS,
  STUDENT_LOADING,
  CLEAR_CURRENT_STUDENT
} from "./types";

// Get current student
export const getCurrentStudent = () => dispatch => {
  dispatch(setStudentLoading());
  axios
    .get("/api/students/student")
    .then(res =>
      dispatch({
        type: GET_STUDENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STUDENT,
        payload: {}
      })
    );
};

// Get all students
export const getAllStudents = () => dispatch => {
  dispatch(setStudentLoading());
  axios
    .get("/api/students/all")
    .then(res =>
      dispatch({
        type: GET_STUDENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_STUDENTS,
        payload: {}
      })
    );
};

// Student loading
export const setStudentLoading = () => {
  return {
    type: STUDENT_LOADING
  };
};

// Clear student
export const clearCurrentStudent = () => {
  return {
    type: CLEAR_CURRENT_STUDENT
  };
};
