import axios from "axios";

import { COMPILER } from "./types";

// run compiler
export const runCompiler = compilerData => dispatch => {
  axios
    .post("/compiler/", compilerData)
    .then(res =>
      dispatch({
        type: COMPILER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: COMPILER,
        payload: {}
      })
    );
};
