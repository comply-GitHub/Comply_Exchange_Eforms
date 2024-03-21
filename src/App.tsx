import React from "react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoutesWrapper from "./Router";
import store from "./Redux/store";
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      {/* <ToastContainer />   */}
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<RoutesWrapper />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
