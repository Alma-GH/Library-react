import React, {useContext, useEffect, useState} from 'react';
import cls from "../style/main/InputBlock.module.scss";
import SelectC from "./UI/SelectC";
import {T_AUTHOR, T_PUBLISH, T_TITLE} from "../tools/utils/const";
import BtnIco from "./UI/BtnIco";
import imgS from "../assets/imgs/sort.png";
import {getAction_reverseTables, getAction_setSort, getAction_sortTables} from "../store/reducers/tableReducer";
import {useDispatch} from "react-redux";
import {SearchContext} from "../context/SearchContext";

const ReorderPanel = ({disabled, cbOnSort, cbOnReverse}) => {

  if(typeof cbOnReverse !== "function") cbOnReverse = ()=>console.log("not work cbOnReverse")
  if(typeof cbOnSort !== "function") cbOnSort = ()=>console.log("not work cbOnSort")


  const {isEdit, areLists} = useContext(SearchContext)

  const dispatch = useDispatch()


  const [sort, setSort] = useState('')
  const [selectOptions, setSelectOptions] = useState([])

  useEffect(()=>{
    if(areLists){
      setSelectOptions([
        {value:"name", name:"Название"},
      ])
    }else if(isEdit){
      setSelectOptions([
        {value:T_TITLE, name:"Название"},
        {value:T_AUTHOR, name:"Автор"},
      ])
    }else{
      setSelectOptions([
        {value:T_TITLE, name:"Название"},
        {value:T_AUTHOR, name:"Автор"},
        {value:T_PUBLISH, name:"Год появления"},
      ])
    }
  }, [isEdit,areLists])


  function selectSort(e){
    const newSort = e.target.value
    dispatch(getAction_setSort(newSort))
    dispatch(getAction_sortTables())
    setSort(newSort)

    cbOnSort()
  }


  function reverseTables(e){
    e.preventDefault();
    dispatch(getAction_reverseTables())

    cbOnReverse()
  }

  return (
    <div className={cls.sortBlock}>
      <SelectC
        id="sort" prtClass={cls.selectSort} value={sort} onChange={selectSort} disabled={disabled}
        defaultVal="Сортировка"
        options={selectOptions}
      />
      <div className={cls.btns}>
        <BtnIco img={imgS} cb={reverseTables}/>
      </div>

    </div>
  );
};

export default ReorderPanel;