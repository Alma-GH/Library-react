import React from 'react';
import {NavLink} from "react-router-dom";
import BtnIco from "./BtnIco";

const BtnLink = ({link,...btnAtt}) => {
  return (
    <NavLink to={link}>
      <BtnIco {...btnAtt}/>
    </NavLink>
  );
};

export default BtnLink;