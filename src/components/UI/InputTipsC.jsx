import React from 'react';
import cls from "./../../style/UI/InputTipsC.module.scss"

const InputTipsC = ({prtClass,id, tips, inputV, inputC}) => {

  const styles = []
  if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>
      <input className={cls.input} type="text" list={id} value={inputV} onChange={inputC}/>
      <datalist id={id}>
        {tips.map((tip,ind) => <option key={tip + ind} value={tip}/>)}
      </datalist>
    </div>
  );
};

export default InputTipsC;