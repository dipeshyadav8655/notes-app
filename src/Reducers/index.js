import notesReducer from "./Reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  notesReducer,
});

export default rootReducer;
