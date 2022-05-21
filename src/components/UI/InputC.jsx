import React from 'react';
import cls from "../../style/UI/InputC.module.scss";

const InputC = ({...inputProps}) => {
  return (
    <input className={cls.input} {...inputProps}/>
  );
};

export default InputC;