import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAction_confirmFilter, getAction_setSearch} from "../../store/reducers/filterReducer";
import {
  getAction_clearTable,
  getAction_setEditMenu,
  getAction_setErrorTable,
  getAction_setLoadTable,
  getAction_setTable
} from "../../store/reducers/tableReducer";
import {SearchContext} from "../../context/SearchContext";
import ToolBar from "../ToolBar";
import ContentBlock from "../ContentBlock";
import {useFetching} from "../../hooks/useFetching";
import {getEditAccess} from "../../tools/utils/func";

const LibraryPage = ({updateOrderFunc,areLists, editAccess, GET_METHOD}) => {

  const context = {isEdit:true,updateOrderFunc,areLists}

  const dispatch = useDispatch()
  const confirmF = useSelector(state=>state.filter.confirm)
  const params = useParams()

  const [fetchTables, isLoading, err] = useFetching(  async (...args)=>{
    const [dataTables] = await GET_METHOD(...args)
    dispatch(getAction_setTable(dataTables))
  })

  useEffect(()=>{
    dispatch(getAction_setLoadTable(isLoading))
    dispatch(getAction_setErrorTable(!!err,err?.message))
  }, [isLoading,err])

  useEffect(()=>{
    fetchTables(confirmF);
  }, [confirmF])


  useEffect(()=>{
    if(params.list){
      dispatch(getAction_setSearch(+params.list))
    }
    dispatch(getAction_confirmFilter())
    dispatch(getAction_setEditMenu(editAccess))

    return ()=>{
      dispatch(getAction_clearTable())
      dispatch(getAction_setEditMenu(getEditAccess()))
    }
  }, [])

  return (
    <SearchContext.Provider value={context}>
      <ToolBar className="toolBar"/>
      <ContentBlock prtClass="wideContent"/>
    </SearchContext.Provider>
  );
};

export default LibraryPage;