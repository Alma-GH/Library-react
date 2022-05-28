import {useEffect, useState} from "react";
import ServerService from "../tools/Services/ServerService";

export const useFilterTips = (authorQ,subjectQ)=>{

  const [tipsAuthors, setTipsAuthors]  = useState([])
  const [tipsSubjects, setTipsSubjects] = useState([])


  async function takeAuthorTips(query){
    let tips = await ServerService.fromAPI.getAuthorsByQuery(query)
    setTipsAuthors(tips)
  }
  async function takeSubjectTips(query){
    let tips = await ServerService.fromAPI.getSubjectsByQuery(query)
    setTipsSubjects(tips)
  }

  useEffect( ()=>{
    takeAuthorTips(authorQ)
  }, [authorQ])
  useEffect( ()=>{
    takeSubjectTips(subjectQ)
  }, [subjectQ])

  return [tipsAuthors,tipsSubjects]
}