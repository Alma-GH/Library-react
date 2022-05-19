import React, {useEffect} from 'react';
import FilterBlock from "../FilterBlock";
import InputBlock from "../InputBlock";
import ContentBlock from "../ContentBlock";
import {SearchContext} from "../../context/SearchContext";
import {useDispatch} from "react-redux";
import {getAction_confirmFilter, getAction_setCountSearch} from "../../store/reducers/filterReducer";
import {getAction_clearTable} from "../../store/reducers/tableReducer";
import {getAction_setNumAll} from "../../store/reducers/pageReducer";
import {useLocation} from "react-router-dom";


const SearchPage = ({isEdit, areLists}) => {

  const path = useLocation().pathname
  const context = {isEdit,areLists}

  const dispatch = useDispatch()

  useEffect(()=>{
    console.log("clear")
    // Controller.abort()
    dispatch(getAction_clearTable())
    dispatch(getAction_setCountSearch(0))
    dispatch(getAction_confirmFilter())
    dispatch(getAction_setNumAll(0))


    if(isEdit){
      dispatch(getAction_setCountSearch(1))
      dispatch(getAction_confirmFilter())
    }
  }, [path])

  return (
    <SearchContext.Provider value={context}>
      {isEdit
        ? <div className="toolBar">tool bar</div>
        : <>
            <FilterBlock prtClass="filter"/>
            <InputBlock/>
          </>

      }
      <ContentBlock prtClass={isEdit && "wideContent"}/>
    </SearchContext.Provider>
  );
};

export default SearchPage;