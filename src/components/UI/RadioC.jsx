import React from 'react';
import cls from "./../../style/UI/RadioC.module.scss"

const RadioC = ({prtClass,choices, name, value, onChange}) => {

  const styles = [cls.radio]
  if(prtClass) styles.push(prtClass)

  return (
    <ol className={styles.join(" ")}>
      {choices.map((choice, ind)=>
        <li key={name+ind} className={cls.choice}>
          <input type="radio" id={name+ind} name={name} value={choice.value} checked={value===choice.value} onChange={onChange}/>
          <label htmlFor={name+ind}>{choice.text}</label>
        </li>
      )}
    </ol>
  );
};

export default RadioC;