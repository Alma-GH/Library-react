import './style/App.scss';
import Header from "./components/Header";
import {Outlet} from "react-router-dom";
import AppRouter from "./components/App.Router";
import React from "react";

function App() {

  return (
    <AppRouter/>
  );
}

export default App;

