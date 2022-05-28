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
  getAction_setCountSearch, getAction_setSearch
} from "../../store/reducers/filterReducer";
import {getEditAccess} from "../../tools/utils/func";
import ServerService from "../../tools/Services/ServerService";

const SearchWrap = () => {

  const dispatch = useDispatch()

  const api = useSelector(state=>state.filter.searchAPI)

  const confirmF = useSelector(state=>state.filter.confirm)
  const page = useSelector(state=>state.page.currentPage)
  const limit = useSelector(state=>state.page.limit)

  const countSearch = useSelector(state=>state.filter.countSearch)

  const [fetchTables, isLoading, err] = useFetching(  async (...args)=>{
    let GET_METHOD
    if(api === ServerService.ST_FROM_DB) GET_METHOD = ServerService.fromDB.getWorksByFilter.bind(ServerService.fromDB)
    else if(api === ServerService.ST_FROM_API) GET_METHOD = ServerService.fromAPI.getWorksByFilter.bind(ServerService.fromAPI)

    const [dataWorks, nWorks] = await GET_METHOD(...args)
    dispatch(getAction_setNumAll(nWorks))
    dispatch(getAction_setTable(dataWorks))
    // dispatch(getAction_sortTables())

    const myWorksIds = await ServerService.fromDB.getAllWorksIds()
    console.log({myWorksIds})


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

    dispatch(getAction_setSearch(""))
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