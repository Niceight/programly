import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import lecturerReducer from "./lecturerReducer";
import studentReducer from "./studentReducer";
import exerciseReducer from "./exerciseReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  lecturer: lecturerReducer,
  student: studentReducer,
  exercise: exerciseReducer
});
