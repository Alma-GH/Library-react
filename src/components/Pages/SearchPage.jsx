import React, {useEffect} from 'react';
import FilterBlock from "../FilterBlock";
import InputBlock from "../InputBlock";
import ContentBlock from "../ContentBlock";
import {SearchContext} from "../../context/SearchContext";
import {useDispatch, useSelector} from "react-redux";
import {getAction_setEditMenu} from "../../store/reducers/tableReducer";
import {ACCESS_FOR_SEARCH, ACCESS_FOR_SEARCH_LIB} from "../../tools/utils/const";
import {getEditAccess} from "../../tools/utils/func.js";
import ServerService from "../../tools/Services/ServerService";


const SearchPage = () => {

  const context = {isEdit:false,areLists:false}

  const dispatch = useDispatch()

  const filterHide = useSelector(state=>state.filter.hide)

  const api = useSelector(state=>state.filter.searchAPI)


  useEffect(()=>{
    dispatch(getAction_setEditMenu(getEditAccess(api===ServerService.ST_FROM_DB
      ? ACCESS_FOR_SEARCH_LIB
      : ACCESS_FOR_SEARCH
    )))
  }, [api])



  return (
    <SearchContext.Provider value={context}>
      {filterHide
        ?
          <>
            <FilterBlock prtClass="invis"/>
            <InputBlock prtClass="wideContent"/>
            <ContentBlock prtClass="wideContent"/>
          </>

        :
          <>
            <FilterBlock prtClass="filter"/>
            <InputBlock/>
            <ContentBlock/>
          </>
      }
    </SearchContext.Provider>
  );
};

export default SearchPage;