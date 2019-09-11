import axios from "axios";

import {
  GET_EXERCISE,
  GET_EXERCISES,
  UPDATE_EXERCISE,
  EXERCISE_LOADING,
  CLEAR_CURRENT_EXERCISE,
  GET_ERRORS
} from "./types";

// Get current exercise
export const getCurrentExercise = (userid, exerciseid) => dispatch => {
  dispatch(setExerciseLoading());
  axios
    .get(`/api/exercises/${userid}/${exerciseid}`)
    .then(res =>
      dispatch({
        type: GET_EXERCISE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXERCISE,
        payload: {}
      })
    );
};

// Create Exercise
export const createExercise = (exerciseData, history) => dispatch => {
  axios
    .post("/api/exercises/new-exercise", exerciseData)
    .then(res => history.push("/lecturers/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all exercises
export const getExercises = id => dispatch => {
  dispatch(setExerciseLoading());
  axios
    .get(`/api/exercises/${id}`)
    .then(res =>
      dispatch({
        type: GET_EXERCISES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EXERCISES,
        payload: null
      })
    );
};

// Update Exercise
export const updateExercise = (exerciseid, exerciseData) => {
  return dispatch => {
    axios
      .post(`/api/exercises/${exerciseid}`, exerciseData)
      .then(res => {
        dispatch({
          type: UPDATE_EXERCISE,
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

// Delete Exercise
export const deleteExercise = (userid, exerciseid) => dispatch => {
  axios
    .delete(`/api/exercises/${userid}/${exerciseid}`)
    .then(res => dispatch(getExercises(userid)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Exercise loading
export const setExerciseLoading = () => {
  return {
    type: EXERCISE_LOADING
  };
};

// Clear exercise
export const clearCurrentExercise = () => {
  return {
    type: CLEAR_CURRENT_EXERCISE
  };
};
