import axios from "axios";

import { GET_STUDENT, STUDENT_LOADING, CLEAR_CURRENT_STUDENT } from "./types";

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
