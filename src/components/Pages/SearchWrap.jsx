import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import {getAction_setNumAll, getAction_setPage} from "../../store/reducers/pageReducer";
import {
  getAction_clearTable, getAction_setEditMenu,
  getAction_setErrorTable,
  getAction_setLoadTable,
  getAction_setTable
} from "../../store/reducers/tableReducer";
import {useDispatch, useSelector} from "react-redux";
import {
  getAction_clearSearch,
  getAction_confirmFilter,
  getAction_setCountSearch
} from "../../store/reducers/filterReducer";
import {getEditAccess} from "../../tools/utils/func";

const SearchWrap = () => {

  const dispatch = useDispatch()

  const GET_METHOD = useSelector(state=>state.filter.searchAPI)

  const confirmF = useSelector(state=>state.filter.confirm)
  const page = useSelector(state=>state.page.currentPage)
  const limit = useSelector(state=>state.page.limit)

  const countSearch = useSelector(state=>state.filter.countSearch)

  const [fetchTables, isLoading, err] = useFetching(  async (...args)=>{
    const [dataWorks, nWorks] = await GET_METHOD(...args)
    dispatch(getAction_setNumAll(nWorks))
    dispatch(getAction_setTable(dataWorks))
    // dispatch(getAction_sortTables())
  })

  useEffect(()=>{
    dispatch(getAction_setLoadTable(isLoading))
    dispatch(getAction_setErrorTable(!!err,err?.message))
  }, [isLoading,err])

  useEffect(()=>{
    dispatch(getAction_setPage(1))
  },[confirmF])

  useEffect(()=>{
    if(!countSearch) return
    fetchTables(confirmF, page, limit);
  }, [page, confirmF])

  //ComponentMount/ComponentUnmount
  useEffect(()=>{

    console.log("clear")
    // Controller.abort()

    dispatch(getAction_clearTable())
    dispatch(getAction_setCountSearch(0))
    dispatch(getAction_confirmFilter())  //TODO: delete?
    dispatch(getAction_setNumAll(0))

    return ()=>{
      console.log("ALL CLEAR")
      dispatch(getAction_clearSearch())
      dispatch(getAction_clearTable())
      dispatch(getAction_setEditMenu(getEditAccess()))
    }
  }, [])

  return <Outlet/>
};

export default SearchWrap;