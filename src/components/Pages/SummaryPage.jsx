import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import ServerService from "../../tools/Services/ServerService";
import Loader from "../UI/Notifications/Loader";

const SummaryPage = () => {

  const id = useParams().summary

  const [textS, setTextS] = useState("")

  const [takeSumm, isLoadingSumm, errSumm] = useFetching(async ()=>{

    const summ = await ServerService.fromDB.getSummaryById(id)

    setTextS(summ)
    console.log(summ)

  })

  useEffect(()=>{
    takeSumm()
  }, [])


  return (
    <div>
      {isLoadingSumm
        ? <Loader/>
        : <>{textS}</>
      }
    </div>
  );
};

export default SummaryPage;