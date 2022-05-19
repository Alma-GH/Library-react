import React, {useState} from 'react';
import cls from "../../style/UI/BtnIco.module.scss"

const BtnIco = ({img, cb, disabled, prtClass, isAnimStyle, isActiveStyle}) => {
  /**
   * TODO: isActiveStyle - img/boolean
   */

  if(typeof cb !== "function")  cb = ()=> console.log("not set 'cb' on btn")
  if(disabled)                  cb = ()=> console.log("disabled btn")

  const styles = [cls.btn]
  if(prtClass) styles.push(prtClass)
  if(isAnimStyle) styles.push(cls.animate)
  if(isActiveStyle) styles.push(cls.on)

  return (
    <button className={styles.join(" ")} onClick={cb}>
      <img src={img} alt="ICO"/>
    </button>
  );
};

export default BtnIco;