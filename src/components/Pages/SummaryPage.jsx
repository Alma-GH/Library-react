import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import ServerService from "../../tools/Services/ServerService";
import Loader from "../UI/Notifications/Loader";
import TextareaC from "../UI/TextareaC";
import cls from "./../../style/Pages/SummaryPage.module.scss"
import {updateSummaryThrottle} from "../../tools/utils/func";
import {useGoHome} from "../../hooks/useGoHome";

const SummaryPage = () => {

  const id = useParams().summary

  const [textS, setTextS] = useState("")

  const [takeSumm, isLoadingSumm, errSumm] = useFetching(async ()=>{
    const summ = await ServerService.fromDB.getSummaryById(id)
    setTextS(summ)
  })

  useGoHome(errSumm)

  useEffect(()=>{
    takeSumm()
  }, [])

  function inputText(e){
    let val = e.target.value
    setTextS(val)
    updateSummaryThrottle(id, val)
      .then(res=>console.log("UPDATE SUMMARY"))
  }


  return (
    <div className="summary">
      {isLoadingSumm
        ? <Loader/>
        : <TextareaC prtClass={cls.textarea} text={textS} onChange={inputText}/>
      }
    </div>
  );
};

export default SummaryPage;