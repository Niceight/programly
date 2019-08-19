import axios from "axios";

import {
  GET_LECTURER,
  LECTURER_LOADING,
  CLEAR_CURRENT_LECTURER
} from "./types";

// Get current lecturer
export const getCurrentLecturer = () => dispatch => {
  dispatch(setLecturerLoading());
  axios
    .get("/api/lecturers/lecturer")
    .then(res =>
      dispatch({
        type: GET_LECTURER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_LECTURER,
        payload: {}
      })
    );
};

// Lecturer loading
export const setLecturerLoading = () => {
  return {
    type: LECTURER_LOADING
  };
};

// Clear lecturer
export const clearCurrentLecturer = () => {
  return {
    type: CLEAR_CURRENT_LECTURER
  };
};
