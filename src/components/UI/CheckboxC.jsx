import React from 'react';
import cls from "../../style/UI/RadioC.module.scss";

const CheckboxC = ({prtClass, values, choices, onChange}) => {



  const styles = [cls.radio]
  if(prtClass) styles.push(prtClass)

  return (
    <ol className={styles.join(" ")}>
      {choices.map((choice,ind)=>
        <li key={choice.name} className={cls.choice}>
          <input type="checkbox" id={`custom-checkbox-${choice.name}`} name={choice.name} checked={values[ind]} onChange={()=>onChange(ind)}/>
          <label htmlFor={`custom-checkbox-${choice.name}`}>{choice.name}</label>
        </li>
      )}

    </ol>
  );
};

export default CheckboxC;