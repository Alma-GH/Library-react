import React from 'react';
import Header from "./Header";
import {Outlet} from "react-router-dom";
import Modal from "./UI/Modal";
import ModalBody1 from "./UI/Modal.Body1";
import ModalBody2 from "./UI/Modal.Body2";
import {useSelector} from "react-redux";

const AppPrivat = () => {

  const bodyModal = useSelector(state=>state.modal.bodyNum)

  return (
    <div className="App">
      <Header prtClass="head"/>
      <Outlet/>

      <Modal>
        {bodyModal === 1 && <ModalBody1 />}
        {bodyModal === 2 && <ModalBody2 />}
      </Modal>
    </div>
  );
};

export default AppPrivat;