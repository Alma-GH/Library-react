import {useEffect, useState} from "react";
import ServerService from "../tools/Services/ServerService";

export const useFilterSelectOptions = ()=>{

  const [optLang, setOptLang] = useState([])
  const [optList, setOptList] = useState([])

  async function setListsOptions(){
    const [lists] = await ServerService.fromDB.getAllLists()
    const arr = lists.map(list=>({value:list.lid,name:list.name}))
    setOptList(arr)
  }

  function setLanguagesOptions(){
    const arr = ServerService.fromAPI.getLanguages()
    setOptLang(arr)
  }


  useEffect(()=>{
    setLanguagesOptions()
  }, [])
  useEffect(()=>{
    setListsOptions()
  }, [])

  return [optLang, optList]

}