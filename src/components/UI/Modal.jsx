import React from 'react';
import cls from "../../style/UI/Modal.module.scss"

const Modal = ({vis, setVis, children}) => {


  let style = [cls.modal]
  if(vis === true) style.push(cls.active)


  return (
    <div className={style.join(" ")} onClick={()=>setVis(false)}>
      <div className={cls.modalContent}  onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;