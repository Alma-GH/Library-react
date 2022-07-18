import React from 'react';
import cls from "../../../style/UI/Modal/Modal.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {getAction_setVisModal} from "../../../store/reducers/modalData";

const Modal = ({children, closable=true}) => {

  const dispatch = useDispatch()
  const vis = useSelector(state=>state.modal.visible)

  let style = [cls.modal]
  if(vis === true) style.push(cls.active)


  return (
    <div className={style.join(" ")} onClick={()=>dispatch(getAction_setVisModal(!closable))}>
      <div className={cls.modalContent}  onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;