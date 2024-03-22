// import { applyMiddleware, createStore } from "redux";
// import rootReducer from "./rootReducer"; // Create this file later
// import { createLogger } from "redux-logger";
// import thunkMiddleware from "redux-thunk";

// const loggerMiddleware = createLogger();

// const store = createStore(
//   rootReducer,
//   applyMiddleware(thunkMiddleware, loggerMiddleware)
// );
// export type AppDispatch = typeof store.dispatch;
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Assuming you have your reducers in a separate file

// Create the Redux store
const store = configureStore({
  reducer: rootReducer, // Combined reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable values (optional)
    }),
});

export default store;
export type AppDispatch = typeof store.dispatch;