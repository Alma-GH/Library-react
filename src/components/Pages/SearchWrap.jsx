import React, {useEffect} from 'react';
import {Outlet} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import {getAction_setNumAll, getAction_setPage} from "../../store/reducers/pageReducer";
import {
  getAction_clearTable,
  getAction_setErrorTable,
  getAction_setLoadTable,
  getAction_setTable,
  getAction_sortTables
} from "../../store/reducers/tableReducer";
import {useDispatch, useSelector} from "react-redux";
import {getAction_clearSearch, getAction_confirmFilter} from "../../store/reducers/filterReducer";

const SearchWrap = ({GET_METHOD}) => {

  const dispatch = useDispatch()

  const confirmF = useSelector(state=>state.filter.confirm)
  const page = useSelector(state=>state.page.currentPage)
  const limit = useSelector(state=>state.page.limit)

  const [fetchTables, isLoading, err] = useFetching(  async (...args)=>{
    const [dataWorks, nWorks] = await GET_METHOD(...args)
    dispatch(getAction_setNumAll(nWorks))
    dispatch(getAction_setTable(dataWorks))
    dispatch(getAction_sortTables())
  })

  useEffect(()=>{
    dispatch(getAction_setLoadTable(isLoading))
    dispatch(getAction_setErrorTable(!!err,err?.message))
  }, [isLoading,err])

  useEffect(()=>{
    dispatch(getAction_setPage(1))
  },[confirmF])

  useEffect(()=>{
    fetchTables(confirmF, page, limit);
  }, [page, confirmF])

  //ComponentMount/ComponentUnmount
  useEffect(()=>{
    return ()=>{
      console.log("ALL CLEAR")
      dispatch(getAction_clearSearch())
      dispatch(getAction_clearTable())
      dispatch(getAction_confirmFilter())
    }
  }, [])





  return (
    <>
      <Outlet/>
    </>
  );
};

export default SearchWrap;