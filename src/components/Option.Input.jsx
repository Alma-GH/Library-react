import React from 'react';
import cls from "../style/Pages/OptionsPage.module.scss";

const OptionInput = ({children,title}) => {

  return (
    <div>
      <h3>{title}</h3>
      <div className={cls.inputOp}>
        {children}
      </div>
    </div>
  );
};

export default OptionInput;