import {
  GET_STUDENT,
  GET_STUDENTS,
  STUDENT_LOADING,
  CLEAR_CURRENT_STUDENT
} from "../actions/types";

const initialState = {
  student: null,
  students: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case STUDENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STUDENT:
      return {
        ...state,
        student: action.payload,
        loading: false
      };
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_STUDENT:
      return {
        ...state,
        student: null
      };
    default:
      return state;
  }
}
