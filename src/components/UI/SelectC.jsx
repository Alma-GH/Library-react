import React from 'react';
import cls from "./../../style/UI/SelectC.module.scss"

const SelectC = ({options, defaultVal,defaultDisabled, prtClass,...selectAtt}) => {

  const styles = [cls.select]
  if(prtClass) styles.push(prtClass)

  return (
    <select className={styles.join(" ")} {...selectAtt}>
      {defaultVal !== undefined ? <option disabled={defaultDisabled} value="">{defaultVal}</option> : ""}
      {options.map(op=>
        <option key={op.value} value={op.value}>{op.name}</option>)
      }
    </select>
  );
};

export default SelectC;