import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import clsModal from "./../../../style/UI/Modal/Modal.module.scss"
import clsHint from "./../../../style/UI/Modal/Hint.module.scss"
import {getAction_setHint} from "../../../store/reducers/modalData";
import {LINK_ADD, LINK_HOME, LINK_LIBRARY_ALL} from "../../../tools/utils/const";
import {useNavigate} from "react-router-dom";

const Hint = ({children}) => {

  const dispatch = useDispatch()
  const nav = useNavigate()
  const hintNum = useSelector(state=>state.modal.hintNum)

  const hintMax = 4


  useEffect(()=>{
    if(hintNum !== 0){
      const hintLinks = {
        1:LINK_HOME,
        3:LINK_ADD
      }
      if(hintNum in hintLinks)  nav(hintLinks[hintNum])
    }
  }, [hintNum])

  let style = [clsModal.modal]
  if(hintNum!==0) style.push(clsHint.active)

  return (
    <div className={style.join(" ")} onClick={()=>dispatch(getAction_setHint((hintNum+1)%(hintMax+1)))}>
      {children}
    </div>
  )

};

export default Hint;