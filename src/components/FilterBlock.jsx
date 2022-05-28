import React, {useEffect, useState} from 'react';
import cls from "../style/main/FilterBlock.module.scss"
import InputTipsC from "./UI/InputTipsC";
import ServerService from "../tools/Services/ServerService";
import {useDispatch, useSelector} from "react-redux";
import {
  getAction_confirmFilter,
  getAction_setAuthor, getAction_setCountSearch,
  getAction_setFirstPublish,
  getAction_setLanguage, getAction_setList, getAction_setSearchAPI,
  getAction_setSubjects
} from "../store/reducers/filterReducer";
import SelectC from "./UI/SelectC";
import SelectSearchC from "./UI/SelectSearchC";
import FilterInput from "./Filter.Input";
import InputC from "./UI/InputC";
import RadioC from "./UI/RadioC";
import {getAction_clearTable} from "../store/reducers/tableReducer";
import {getAction_setNumAll} from "../store/reducers/pageReducer";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import {useFilterTips} from "../hooks/useFilterTips";
import {useFilterSelectOptions} from "../hooks/useFilterSelectOptions";

const FilterBlock = ({prtClass}) => {

  const dispatch = useDispatch()

  const inputAuthorR = useSelector(state=>state.filter.author.name)
  const languageR = useSelector(state=>state.filter.language)
  const subjects = useSelector(state=>state.filter.subjects)
  const fPublish = useSelector(state=> state.filter.publish)
  const fList = useSelector(state=>state.filter.list)

  const api = useSelector(state=>state.filter.searchAPI)


  const [inputSubject, setInputSubject] = useState("")

  //for server calls
  const [tipsAuthors, tipsSubjects] = useFilterTips(inputAuthorR, inputSubject)
  const [optLang, optList] = useFilterSelectOptions()


  function selectSearchFrom(e){
    let val = e.target.value
    //TODO: clear
    dispatch(getAction_clearTable())
    dispatch(getAction_setCountSearch(0))
    dispatch(getAction_setNumAll(0))

    dispatch(getAction_setSearchAPI(val))
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
    setInputSubject("")
  }

  function subjDel(ind){
    subjects.splice(ind, 1)
    dispatch(getAction_setSubjects(subjects))
  }



  function subjInp(e){
    const subjName = e.target.value
    setInputSubject(subjName)
  }


  function selectList(e){
    const list = e.target.value
    dispatch(getAction_setList(list))
  }


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
          value={api}
          onChange={selectSearchFrom}

        />
      </FilterInput>

      <FilterInput className={cls.author} title="Author:">
        <InputTipsC prtClass={cls.input}  id="auth" tips={tipsAuthors.map(auth=>auth.name)} inputV={inputAuthorR} inputC={authorInp}/>
      </FilterInput>

      {api === ServerService.ST_FROM_API &&
        <FilterInput className={cls.lang} title="Language:">
          <SelectC
            prtClass={cls.input}
            id="lang" value={languageR} onChange={selectLang}
            defaultVal=""
            options={optLang}
          />
        </FilterInput>
      }


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

      {api === ServerService.ST_FROM_API &&
        <FilterInput className={cls.publish} title="First publish:">
          <div className={cls.input}>
            <InputC type="number" value={fPublish} onChange={publishInp}/>
          </div>
        </FilterInput>
      }


      {api === ServerService.ST_FROM_DB &&
      <FilterInput className={cls.lang} title="From list:">
        <SelectC
          prtClass={cls.input}
          id="list filter" value={fList} onChange={selectList}
          defaultVal=""
          options={optList}
        />
      </FilterInput>
      }


    </div>
  );
};

export default FilterBlock;