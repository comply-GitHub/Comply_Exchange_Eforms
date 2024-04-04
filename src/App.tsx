import React from "react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./Redux/store";
import "./App.scss";
import Main from "./main";
import WithAutoLogout from "./autoLogoutComponent";


const AutoLogoutMain = WithAutoLogout(Main);
function App() {
  return (
    <Provider store={store}>
      {/* <ToastContainer />   */}
      <AutoLogoutMain/>
      {/* <Main/> */}
    </Provider>
  );
}

export default App;
