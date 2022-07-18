import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import Modal from "./UI/Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import ModalBodyAuth1 from "./UI/Modal/Modal.Body.Auth1";
import ModalBodyAuth2 from "./UI/Modal/Modal.Body.Auth2";
import {getAction_setBodyModal, getAction_setVisModal} from "../store/reducers/modalData";

const AppPublic = () => {

  const dispatch = useDispatch()

  const bodyModal = useSelector(state=>state.modal.bodyNum)

  useEffect(()=>{
    dispatch(getAction_setVisModal(true))
    dispatch(getAction_setBodyModal(1))
  }, [])


  return (
    <div className="Auth">
      App public
      <Outlet/>

      <Modal closable={false}>
        {bodyModal === 1 && <ModalBodyAuth1 />}
        {bodyModal === 2 && <ModalBodyAuth2 />}
      </Modal>

    </div>
  );
};

export default AppPublic;