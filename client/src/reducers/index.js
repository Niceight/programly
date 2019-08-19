import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import lecturerReducer from "./lecturerReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  lecturer: lecturerReducer
});
