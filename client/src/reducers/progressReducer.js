import {
  GET_PROGRESS,
  GET_PROGRESSES,
  PROGRESS_LOADING,
  CLEAR_CURRENT_PROGRESS
} from "../actions/types";

const initialState = {
  progress: null,
  progresses: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROGRESS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROGRESS:
      return {
        ...state,
        progress: action.payload,
        loading: false
      };
    case GET_PROGRESSES:
      return {
        ...state,
        progresses: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROGRESS:
      return {
        ...state,
        progress: null
      };
    default:
      return state;
  }
}
