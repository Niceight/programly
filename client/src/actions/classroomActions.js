import axios from "axios";

import {
  GET_CLASSROOM,
  GET_CLASSROOMS,
  UPDATE_CLASSROOM,
  CLASSROOM_LOADING,
  CLEAR_CURRENT_CLASSROOM,
  GET_ERRORS
} from "./types";

// Get current class
export const getCurrentClassroom = (userid, classroomid) => dispatch => {
  dispatch(setClassroomLoading());
  axios
    .get(`/api/classrooms/${userid}/${classroomid}`)
    .then(res =>
      dispatch({
        type: GET_CLASSROOM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CLASSROOM,
        payload: {}
      })
    );
};

// Create Classroom
export const createClassroom = classroomData => dispatch => {
  axios
    .post("/api/classrooms/new-classroom", classroomData)
    .then(res =>
      dispatch({
        type: GET_CLASSROOM,
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

// Get all classroom by ID
export const getClassrooms = id => dispatch => {
  dispatch(setClassroomLoading());
  axios
    .get(`/api/classrooms/${id}`)
    .then(res =>
      dispatch({
        type: GET_CLASSROOMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CLASSROOMS,
        payload: null
      })
    );
};

// Update Classroom
export const updateClassroom = (classroomid, classroomData) => {
  return dispatch => {
    axios
      .post(`/api/classrooms/${classroomid}`, classroomData)
      .then(res => {
        dispatch({
          type: UPDATE_CLASSROOM,
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

// Delete Classroom
export const deleteClassroom = (userid, classroomid) => dispatch => {
  axios
    .delete(`/api/classrooms/${userid}/${classroomid}`)
    .then(res => dispatch(getClassrooms(userid)))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all classrooms
export const getAllClassrooms = () => dispatch => {
  dispatch(setClassroomLoading());
  axios
    .get("/api/classrooms/all-classrooms")
    .then(res =>
      dispatch({
        type: GET_CLASSROOMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CLASSROOMS,
        payload: null
      })
    );
};

// Get all classrooms
export const joinClassroom = (classroomid, userData) => {
  return dispatch => {
    axios
      .put(`/api/classrooms/${classroomid}`, userData)
      .then(res => {
        dispatch({
          type: UPDATE_CLASSROOM,
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

// Classroom loading
export const setClassroomLoading = () => {
  return {
    type: CLASSROOM_LOADING
  };
};

// Clear classroom
export const clearCurrentClassroom = () => {
  return {
    type: CLEAR_CURRENT_CLASSROOM
  };
};
