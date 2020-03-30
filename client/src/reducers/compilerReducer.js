import { COMPILER } from "../actions/types";

const initialState = {
  compiler: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPILER:
      return {
        ...state,
        compiler: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
