import axios from "axios";

import {
  GET_EXERCISE,
  GET_EXERCISES,
  DELETE_EXERCISE,
  EXERCISE_LOADING,
  CLEAR_CURRENT_EXERCISE,
  GET_ERRORS
} from "./types";

// Get current exercise
export const getCurrentExercise = () => dispatch => {
  dispatch(setExerciseLoading());
  axios
    .get("/api/:lecturer_id")
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
