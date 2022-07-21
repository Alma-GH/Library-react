import React, {useEffect} from 'react';
import Header from "./Header";
import {Outlet} from "react-router-dom";
import Modal from "./UI/Modal/Modal";
import ModalBody1 from "./UI/Modal/Modal.Body1";
import ModalBody2 from "./UI/Modal/Modal.Body2";
import ModalBodyConfirm from "./UI/Modal/Modal.Body.Confirm";
import {useDispatch, useSelector} from "react-redux";
import {getAction_setSearchAPI} from "../store/reducers/filterReducer";
import ServerService from "../tools/Services/ServerService";
import Hint from "./UI/Modal/Hint";

const AppPrivat = () => {

  const dispatch = useDispatch()

  const bodyModal = useSelector(state=>state.modal.bodyNum)
  const hintNum = useSelector(state=>state.modal.hintNum)


  useEffect(()=>{
    dispatch(getAction_setSearchAPI(ServerService.ST_FROM_API))
  },[])

  return (
    <div className="App">
      <Header prtClass="head"/>
      <Outlet/>

      <Modal>
        {bodyModal === 1 && <ModalBody1 />}
        {bodyModal === 2 && <ModalBody2 />}
        {bodyModal === 3 && <ModalBodyConfirm />}
      </Modal>

      {hintNum!==0 && <Hint/>}
    </div>
  );
};

export default AppPrivat;