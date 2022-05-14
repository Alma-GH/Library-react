import React from 'react';
import Header from "./Header";
import {Outlet} from "react-router-dom";

const AppPrivat = () => {

  return (
    <div className="App">
      <Header prtClass="head"/>
      <Outlet/>
    </div>
  );
};

export default AppPrivat;