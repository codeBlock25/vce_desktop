import { createStore } from "redux";
import rootReducer from "./combineReducer";
// import { devToolsEnhancer } from "redux-devtools-extension";

const store = createStore(rootReducer);
export default store;
