import {useEffect, useState} from "react";
import ServerService from "../tools/Services/ServerService";
import {useFetching} from "./useFetching";
import DatabaseAPI from "../tools/Services/DatabaseAPI";

export const useFilterSelectOptions = ()=>{

  const [optLang, setOptLang] = useState([])
  const [optList, setOptList] = useState([])


  const [setListsOptions] = useFetching(async ()=>{
    const [lists] = await ServerService.fromDB.getAllLists()
    const arr = lists.map(list=>({value:list.lid,name:list.name}))
    setOptList(arr)
  })

  function setLanguagesOptions(){
    const arr = ServerService.fromAPI.getLanguages()
    setOptLang(arr)
  }


  useEffect(()=>{
    setLanguagesOptions()
  }, [])
  useEffect(()=>{
    setListsOptions()
  }, [DatabaseAPI.isUser])

  return [optLang, optList]

}