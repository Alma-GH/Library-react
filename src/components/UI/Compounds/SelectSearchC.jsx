import React from 'react';
import InputTipsC from "../InputTipsC";
import BtnIco from "../BtnIco";
import cls from "../../../style/UI/SelectSearchC.module.scss"
import imgDel from "../../../assets/imgs/cancel.png"
import imgSET from "../../../assets/imgs/plus.png";

const SelectSearchC = ({selected, delCB, inputTipsAtt, btnIcoAtt, prtClass}) => {
  /**
   * delCB - function:
   *
   *  @param {number} ind index of selected-array
   *
   *  @description:
   *    called for delete buttons
   *    should delete element from selected-array by index
   *
   */

  const styles = []
  if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>
      <ul className={cls.list}>
        {selected.map((select,ind)=>(
          <li key={select + ind}>
            <span className={cls.text}>{select}</span>
            <BtnIco prtClass={cls.delBtn} img={imgDel} cb={()=>delCB(ind)}/>
          </li>
        ))}
      </ul>

      <div className={cls.search}>
        <InputTipsC prtClass={cls.input}   {...inputTipsAtt}/>
        <BtnIco prtClass={cls.btn} img={imgSET} {...btnIcoAtt}/>
      </div>

    </div>



  );
};

export default SelectSearchC;