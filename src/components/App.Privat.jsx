import React, {useEffect} from 'react';
import Header from "./Header";
import {Outlet} from "react-router-dom";
import Modal from "./UI/Modal";
import ModalBody1 from "./UI/Modal.Body1";
import ModalBody2 from "./UI/Modal.Body2";
import {useDispatch, useSelector} from "react-redux";
import {getAction_setSearchAPI} from "../store/reducers/filterReducer";
import ServerService from "../tools/Services/ServerService";

const AppPrivat = () => {

  const dispatch = useDispatch()

  const bodyModal = useSelector(state=>state.modal.bodyNum)

  useEffect(()=>{
    console.log("SET SEARCH API FUNC")
    dispatch(getAction_setSearchAPI(ServerService.fromAPI.getWorksByFilter))
  },[])

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