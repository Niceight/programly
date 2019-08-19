import {
  GET_LECTURER,
  LECTURER_LOADING,
  CLEAR_CURRENT_LECTURER
} from "../actions/types";

const initialState = {
  lecturer: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LECTURER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_LECTURER:
      return {
        ...state,
        lecturer: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_LECTURER:
      return {
        ...state,
        lecturer: null
      };
    default:
      return state;
  }
}
