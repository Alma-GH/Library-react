import {useEffect, useState} from "react";
import ServerService from "../tools/Services/ServerService";
import {strInclude} from "../tools/utils/func";

export const useFilterTips = (authorQ,subjectQ, api)=>{

  const [tipsAuthors, setTipsAuthors]  = useState([])
  const [tipsSubjects, setTipsSubjects] = useState([])


  async function takeAuthorTips(query, api){
    let tips = []
    if(api === ServerService.ST_FROM_API) {
      const allAuthors = await ServerService.fromAPI.getAuthorsByQuery(query)
      tips = allAuthors.map(author=>author.name)
    }else if(api === ServerService.ST_FROM_DB){
      const [allWorks] = await ServerService.fromDB.getAllWorks()
      tips = Array.from(new Set(allWorks.map(work=>work.author).filter(author=>strInclude(author, query))))
      tips = tips.slice(0, 10)
    }

    setTipsAuthors(tips)
  }
  async function takeSubjectTips(query, api){
    let tips = []
    if(api === ServerService.ST_FROM_API)
      tips = await ServerService.fromAPI.getSubjectsByQuery(query)
    else if(api === ServerService.ST_FROM_DB){
      const [allWorks] = await ServerService.fromDB.getAllWorks()
      tips = Array.from(new Set(allWorks.map(work=>work.subjects?work.subjects:[]).flat().filter(subj=>strInclude(subj, query))))
      tips = tips.slice(0, 10)
    }

    setTipsSubjects(tips)
  }

  useEffect( ()=>{
    takeAuthorTips(authorQ, api)
  }, [authorQ, api])
  useEffect( ()=>{
    takeSubjectTips(subjectQ, api)
  }, [subjectQ, api])

  return [tipsAuthors,tipsSubjects]
}