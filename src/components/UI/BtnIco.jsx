import React from 'react';
import cls from "../../style/UI/BtnIco.module.scss"

const BtnIco = ({img, cb, disabled, prtClass, isAnimStyle}) => {

  if(disabled) cb = ()=> console.log("disabled btn")

  const styles = [cls.btn]
  if(prtClass) styles.push(prtClass)
  if(isAnimStyle) styles.push(cls.animate)

  return (
    <button className={styles.join(" ")} onClick={cb}>
      <img src={img} alt="ICO"/>
    </button>
  );
};

export default BtnIco;