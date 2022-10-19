import { combineReducers, createStore } from "redux";

import profileReducer from "./Slices/profileReducers";

const reducers = combineReducers({
  user: profileReducer,
});

const store = createStore(reducers);

export default store;
