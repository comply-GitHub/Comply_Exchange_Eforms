import { applyMiddleware, createStore } from "redux";
import rootReducer from "./rootReducer"; // Create this file later
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
export type AppDispatch = typeof store.dispatch;
export default store;