import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import clsModal from "./../../../style/UI/Modal/Modal.module.scss"
import clsHint from "./../../../style/UI/Modal/Hint.module.scss"
import {getAction_setHint} from "../../../store/reducers/modalData";
import {LINK_ADD, LINK_HOME, LINK_LIBRARY_ALL, LINK_LIBRARY_LISTS} from "../../../tools/utils/const";
import {useNavigate} from "react-router-dom";
import {hints} from "./hints";

const Hint = () => {

  const dispatch = useDispatch()
  const nav = useNavigate()
  const hintNum = useSelector(state=>state.modal.hintNum)

  const hintMax = hints.length


  useEffect(()=>{

    const hintLinks = {
      1:LINK_HOME,
      3:LINK_ADD,
      5:LINK_LIBRARY_ALL,
      6:LINK_LIBRARY_LISTS,
    }
    if(hintNum in hintLinks)  nav(hintLinks[hintNum])

  }, [hintNum])

  let style = [clsModal.modal]
  style.push(clsHint.active)

  return (
    <div className={style.join(" ")} onClick={()=>dispatch(getAction_setHint((hintNum+1)%(hintMax+1)))}>
      <div className={hints[hintNum-1].style}>
        {hints[hintNum-1].body}
      </div>
    </div>
  )

};

export default Hint;