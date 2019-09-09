import {
  GET_EXERCISE,
  GET_EXERCISES,
  EXERCISE_LOADING,
  CLEAR_CURRENT_EXERCISE
} from "../actions/types";

const initialState = {
  exercise: null,
  exercises: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case EXERCISE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_EXERCISE:
      return {
        ...state,
        exercise: action.payload,
        loading: false
      };
    case GET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_EXERCISE:
      return {
        ...state,
        exercise: null
      };
    default:
      return state;
  }
}
