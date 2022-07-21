import React, {useContext, useEffect, useState} from 'react';
import ReorderPanel from "./ReorderPanel";
import BtnIco from "./UI/BtnIco";
import imgE from "../assets/imgs/edit.png";
import imgP from "../assets/imgs/plus.png";
import {SearchContext} from "../context/SearchContext";
import {getAction_setEditMenu, getAction_setSizeTable} from "../store/reducers/tableReducer";
import {useDispatch, useSelector} from "react-redux";
import {useFetching} from "../hooks/useFetching";
import ServerService from "../tools/Services/ServerService";
import Loader from "./UI/Notifications/Loader";
import {getAction_confirmFilter} from "../store/reducers/filterReducer";
import SelectC from "./UI/SelectC";
import cls from "../style/main/InputBlock.module.scss";
import {useLocation} from "react-router-dom";

const ToolBar = ({className}) => {

  const dispatch = useDispatch()
  const {areLists, updateOrderFunc} = useContext(SearchContext)
  const path = useLocation().pathname

  const defNameList = useSelector(state=>state.option.defNameList)
  const defTableSize = useSelector(state=>state.option.defTableSize)

  const tables = useSelector(state=>state.table.items.arr)
  const listID = useSelector(state=>state.filter.confirm.title)
  const editOptions = useSelector(state=>state.table.items.edit)
  const editable = editOptions.menu
  const sizeBlock = useSelector(state=>state.table.items.size)

  useEffect(()=>{
    dispatch(getAction_setSizeTable(defTableSize))
  }, [path])


  const [fetchList, isLoadingList, errList] = useFetching(async ()=>{
    dispatch(getAction_setEditMenu({...editOptions, menu:false}))
    const res = await ServerService.fromDB.addNewList(defNameList)
    dispatch(getAction_confirmFilter())
    dispatch(getAction_setEditMenu({...editOptions, menu:editable}))
  })

  function editTables(e){
    e.preventDefault()
    dispatch(getAction_setEditMenu({...editOptions, menu: !editable}))
  }

  function updateTables(){
    updateOrderFunc(tables, listID)
      .then(res=>console.log("UPDATE TABLES"))
  }

  async function addList(e){
    fetchList()
  }

  function selectSize(e){
    dispatch(getAction_setSizeTable(e.target.value))
  }

  return (
    <div className={className}>
      {isLoadingList
        ? <Loader/>
        : <>
            <ReorderPanel cbOnReverse={updateTables} cbOnSort={updateTables}/>
            <SelectC
              id="size" value={+sizeBlock} onChange={selectSize}
              defaultVal="Размер блока"
              options={[
                {name:"50%",value:50},
                {name:"100%",value:100},
                {name:"200%",value:200},
              ]}
            />
            <BtnIco img={imgE} cb={editTables} isActiveStyle={editable}/>
            {areLists && <BtnIco img={imgP} cb={addList}/>}
          </>
      }

    </div>
  );
};


export default ToolBar;