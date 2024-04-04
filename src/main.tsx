import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RoutesWrapper from "./Router";
import "./App.scss";

function Main() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<RoutesWrapper />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default Main;
