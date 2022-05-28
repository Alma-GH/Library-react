import React, {useEffect} from 'react';
import FilterBlock from "../FilterBlock";
import InputBlock from "../InputBlock";
import ContentBlock from "../ContentBlock";
import {SearchContext} from "../../context/SearchContext";
import {useDispatch, useSelector} from "react-redux";
import {getAction_setEditMenu} from "../../store/reducers/tableReducer";
import {ACCESS_FOR_SEARCH, ACCESS_FOR_SEARCH_LIB} from "../../tools/utils/const";
import {getEditAccess} from "../../tools/utils/func";
import ServerService from "../../tools/Services/ServerService";


const SearchPage = () => {

  const context = {isEdit:false,areLists:false}

  const dispatch = useDispatch()

  const api = useSelector(state=>state.filter.searchAPI)



  useEffect(()=>{
    dispatch(getAction_setEditMenu(getEditAccess(api===ServerService.ST_FROM_DB
      ? ACCESS_FOR_SEARCH_LIB
      : ACCESS_FOR_SEARCH
    )))
  }, [api])



  return (
    <SearchContext.Provider value={context}>
      <FilterBlock prtClass="filter"/>
      <InputBlock/>
      <ContentBlock/>
    </SearchContext.Provider>
  );
};

export default SearchPage;