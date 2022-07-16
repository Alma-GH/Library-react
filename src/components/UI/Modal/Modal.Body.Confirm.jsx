import React from 'react';
import cls from "./../../../style/UI/Modal/Modal.module.scss"
import BtnText from "../BtnText";
import {useDispatch, useSelector} from "react-redux";
import {getAction_setVisModal} from "../../../store/reducers/modalData";

const ModalBodyConfirm = () => {

  const dispatch = useDispatch()

  const message = useSelector(state=>state.modal.confirmText)
  const cb = useSelector(state=>state.modal.confirmCallback)

  function closeModal(){
    dispatch(getAction_setVisModal(false))
  }


  return (
    <div className={cls.modalConfirm}>
      <div>{message}</div>

      <div className={cls.btns}>
        <BtnText text="OK" cb={()=>{cb(); closeModal()}}/>
        <BtnText text="CANCEL" cb={closeModal}/>
      </div>
    </div>
  );
};

export default ModalBodyConfirm;