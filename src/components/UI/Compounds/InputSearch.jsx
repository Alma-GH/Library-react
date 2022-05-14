import React from 'react';
import cls from "../../../style/UI/InputSearch.module.scss";
import BtnIco from "../BtnIco";
import imgS from "../../../assets/imgs/search.png"


const InputSearch = ({prtClass, val, setVal, cb, disabledBTN}) => {

  const styles = [cls.block]
  if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>
      <input type="text" value={val} onChange={setVal}/>
      <BtnIco prtClass={cls.wrapBtn} img={imgS} cb={cb} disabled={disabledBTN}/>
    </div>

  );
};

export default InputSearch;