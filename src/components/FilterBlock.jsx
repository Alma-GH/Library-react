import React, {useEffect, useState} from 'react';
import cls from "../style/main/FilterBlock.module.scss"
import InputTipsC from "./UI/InputTipsC";
import ServerService from "../tools/Services/ServerService";
import {useDispatch, useSelector} from "react-redux";
import {
  getAction_setAuthor,
  getAction_setFirstPublish,
  getAction_setLanguage, getAction_setSearchAPI,
  getAction_setSubjects
} from "../store/reducers/filterReducer";
import SelectC from "./UI/SelectC";
import SelectSearchC from "./UI/SelectSearchC";
import FilterInput from "./Filter.Input";
import InputC from "./UI/InputC";
import RadioC from "./UI/RadioC";

const FilterBlock = ({prtClass}) => {

  const dispatch = useDispatch()

  const inputAuthorR = useSelector(state=>state.filter.author.name)
  const languageR = useSelector(state=>state.filter.language)
  const subjects = useSelector(state=>state.filter.subjects)
  const fPublish = useSelector(state=> state.filter.publish)

  const api = useSelector(state=>state.filter.searchAPI)


  const [inputSubject, setInputSubject] = useState("")

  //for server calls
  const [tipsAuthors, setTipsAuthors] = useState([])
  const [tipsSubjects, setTipsSubjects] = useState([])
  const [optLang, setOptLang] = useState([])


  function selectSearchFrom(e){
    let val = e.target.value
    //TODO: clear
    if(val === ServerService.ST_FROM_API){
      dispatch(getAction_setSearchAPI(ServerService.fromAPI.getWorksByFilter))
    }else if(val === ServerService.ST_FROM_DB){
      dispatch(getAction_setSearchAPI(ServerService.fromDB.getWorksByFilter))
    }
  }

  function authorInp(e){
    const authorName = e.target.value
    dispatch(getAction_setAuthor(authorName))
  }

  function selectLang(e){
    const lang = e.target.value
    dispatch(getAction_setLanguage(lang))
  }

  function publishInp(e){
    const year = e.target.value
    dispatch(getAction_setFirstPublish(year))
  }

  function subjAdd(){
    subjects.push(inputSubject)
    dispatch(getAction_setSubjects(subjects))
  }

  function subjDel(ind){
    subjects.splice(ind, 1)
    dispatch(getAction_setSubjects(subjects))
  }



  function subjInp(e){
    const subjName = e.target.value
    setInputSubject(subjName)
  }




  function setLanguagesOptions(){
    const arr = ServerService.fromAPI.getLanguages()
    setOptLang(arr)
  }
  async function takeAuthorTips(query){
    let tips = await ServerService.fromAPI.getAuthorsByQuery(query)
    setTipsAuthors(tips)
  }
  async function takeSubjectTips(query){
    let tips = await ServerService.fromAPI.getSubjectsByQuery(query)
    setTipsSubjects(tips)
  }

  useEffect( ()=>{
    takeAuthorTips(inputAuthorR)
  }, [inputAuthorR])
  useEffect( ()=>{
    takeSubjectTips(inputSubject)
  }, [inputSubject])
  useEffect(()=>{
    setLanguagesOptions()
  }, [])



  const styles = [cls.filter]
  if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>

      <FilterInput title="Search from: ">
        <RadioC
          name="api"
          choices={[
            {text:"open library", value: ServerService.ST_FROM_API},
            {text:"my library", value: ServerService.ST_FROM_DB},
          ]}
          value={api === ServerService.fromAPI.getWorksByFilter
            ? ServerService.ST_FROM_API
            : api === ServerService.fromDB.getWorksByFilter
              ? ServerService.ST_FROM_DB
              : 0
          }
          onChange={selectSearchFrom}

        />
      </FilterInput>

      <FilterInput className={cls.author} title="Author:">
        <InputTipsC prtClass={cls.input}  id="auth" tips={tipsAuthors.map(auth=>auth.name)} inputV={inputAuthorR} inputC={authorInp}/>
      </FilterInput>

      <FilterInput className={cls.lang} title="Language:">
        <SelectC
          prtClass={cls.input}
          id="lang" value={languageR} onChange={selectLang}
          defaultVal=""
          options={optLang}
        />
      </FilterInput>

      <FilterInput className={cls.subj} title="Subjects:">
        <SelectSearchC
          prtClass={cls.input}
          selected={subjects}
          delCB={subjDel}
          inputTipsAtt={{
            id:"subjects",
            tips: tipsSubjects,
            inputV: inputSubject,
            inputC: subjInp,

          }}
          btnIcoAtt={{
            cb: subjAdd,
          }}
        />
      </FilterInput>

      <FilterInput className={cls.publish} title="First publish:">
          <div className={cls.input}>
            <InputC type="number" value={fPublish} onChange={publishInp}/>
          </div>
      </FilterInput>


    </div>
  );
};

export default FilterBlock;