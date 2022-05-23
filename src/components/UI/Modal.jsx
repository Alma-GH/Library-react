import React from 'react';
import cls from "../../style/UI/Modal.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {getAction_setVisModal} from "../../store/reducers/modalData";

const Modal = ({children}) => {

  const dispatch = useDispatch()
  const vis = useSelector(state=>state.modal.visible)

  let style = [cls.modal]
  if(vis === true) style.push(cls.active)


  return (
    <div className={style.join(" ")} onClick={()=>dispatch(getAction_setVisModal(false))}>
      <div className={cls.modalContent}  onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;