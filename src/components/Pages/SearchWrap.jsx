import React, {useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";
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
import {LINK_ADD, LINK_LIBRARY, LINK_LIBRARY_ALL, LINK_LIBRARY_FAV, LINK_LIBRARY_LISTS} from "../../tools/utils/const";
import ServerService from "../../tools/Services/ServerService";

const SearchWrap = () => {

  const path = useLocation().pathname

  const fetchFrom = {
    [LINK_LIBRARY]: ServerService.fromDB.getWorksByFilter.bind(ServerService.fromDB),
    [LINK_LIBRARY_ALL]: ServerService.fromDB.getWorksByFilter.bind(ServerService.fromDB),
    [LINK_LIBRARY_FAV]: ServerService.fromDB.getAllFav.bind(ServerService.fromDB),
    [LINK_LIBRARY_LISTS]: ServerService.fromDB.getAllLists.bind(ServerService.fromDB),
    [LINK_ADD]: ServerService.fromAPI.getWorksByFilter.bind(ServerService.fromAPI),
  }

  const GET_METHOD = fetchFrom[path]


  const dispatch = useDispatch()

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
    return ()=>{
      console.log("ALL CLEAR")
      dispatch(getAction_clearSearch())
      dispatch(getAction_clearTable())
    }
  }, [])

  return (
      <Outlet/>
  );
};

export default SearchWrap;