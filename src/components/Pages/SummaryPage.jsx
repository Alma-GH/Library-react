import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import ServerService from "../../tools/Services/ServerService";
import Loader from "../UI/Notifications/Loader";
import TextareaC from "../UI/TextareaC";
import cls from "./../../style/Pages/SummaryPage.module.scss"
import {htmlFromSpecialText, updateSummaryThrottle} from "../../tools/utils/func.js";
import {useGoHome} from "../../hooks/useGoHome";

const SummaryPage = () => {

  const id = useParams().summary

  const [textS, setTextS] = useState("")
  const [redact, setRedact] = useState(false)

  const [takeSumm, isLoadingSumm, errSumm] = useFetching(async ()=>{
    const summ = await ServerService.fromDB.getSummaryById(id)
    setTextS(summ)
  })

  useGoHome(errSumm)

  useEffect(()=>{
    document.addEventListener("keydown", escRedact)
    return ()=>document.removeEventListener("keydown",escRedact)
  }, [])

  useEffect(()=>{
    takeSumm()
  }, [])

  function inputText(e){
    let val = e.target.value
    setTextS(val)
    updateSummaryThrottle(id, val)
      .then(res=>console.log("UPDATE SUMMARY"))
  }

  function redactOn(){
    setRedact(true)
  }
  function redactOff(){
    setRedact(false)
  }

  function escRedact(e){
    if(e.code === "Escape") redactOff()
  }

  return (
    <div className="summary">
      {isLoadingSumm
        ? <Loader/>
        : redact
          ? <TextareaC prtClass={cls.textarea} text={textS} onChange={inputText}/>
          : <div className={cls.result} onDoubleClick={redactOn} dangerouslySetInnerHTML={{__html:htmlFromSpecialText(textS)}}/>
      }

    </div>
  );
};

export default SummaryPage;