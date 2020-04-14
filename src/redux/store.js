import { createStore } from "redux";
import { myHandleInputChangeReducer } from "./reducers/myReducer";
// const createStore = redux.createStore;
const store = createStore(myHandleInputChangeReducer);
export default store;
