import {
  GET_EXERCISE,
  GET_EXERCISES,
  DELETE_EXERCISE,
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
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(
          exercise => exercise._id !== action.payload
        )
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
