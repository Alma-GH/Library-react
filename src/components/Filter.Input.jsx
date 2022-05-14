import React from 'react';
import cls from "../style/main/FilterBlock.module.scss";


const FilterInput = ({className, children, title}) => {

  return (
    <div className={className}>
      <h4 className={cls.head}>{title}</h4>
      {children}
    </div>
  );
};

export default FilterInput;