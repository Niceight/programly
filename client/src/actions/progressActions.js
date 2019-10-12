import axios from "axios";

import {
  GET_PROGRESS,
  GET_PROGRESSES,
  PROGRESS_LOADING,
  CLEAR_CURRENT_PROGRESS,
  GET_ERRORS
} from "./types";

// Get current progress
export const getCurrentProgress = progressid => dispatch => {
  dispatch(setProgressLoading());
  axios
    .get(`/api/progress/current/${progressid}`)
    .then(res =>
      dispatch({
        type: GET_PROGRESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROGRESS,
        payload: {}
      })
    );
};

// Create Progress
export const createProgress = progressData => dispatch => {
  axios
    .post("/api/progress/new-progress", progressData)
    .then(res =>
      dispatch({
        type: GET_PROGRESS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all progress by student id
export const getProgresses = id => dispatch => {
  dispatch(setProgressLoading());
  axios
    .get(`/api/progress/all/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROGRESSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROGRESSES,
        payload: null
      })
    );
};

// Update Progress
export const updateProgress = (progressid, progressData) => {
  return dispatch => {
    axios
      .post(`/api/progress/${progressid}`, progressData)
      .then(res => {
        dispatch({
          type: UPDATE_PROGRESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};

// Progress loading
export const setProgressLoading = () => {
  return {
    type: PROGRESS_LOADING
  };
};

// Clear progress
export const clearCurrentProgress = () => {
  return {
    type: CLEAR_CURRENT_PROGRESS
  };
};
