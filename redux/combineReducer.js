import { combineReducers } from "redux";
import { questionReducer } from "./reducer/questionier.redux";

const rootReducer = combineReducers({
  quest: questionReducer
});

export default rootReducer;
