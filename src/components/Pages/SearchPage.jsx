import React, {useEffect} from 'react';
import FilterBlock from "../FilterBlock";
import InputBlock from "../InputBlock";
import ContentBlock from "../ContentBlock";
import {SearchContext} from "../../context/SearchContext";
import {useDispatch, useSelector} from "react-redux";
import {getAction_confirmFilter, getAction_setCountSearch} from "../../store/reducers/filterReducer";
import {getAction_clearTable, getAction_setEditMenu} from "../../store/reducers/tableReducer";
import {getAction_setNumAll} from "../../store/reducers/pageReducer";
import {useLocation} from "react-router-dom";
import ToolBar from "../ToolBar";
import {LINK_ADD, LINK_LIBRARY, LINK_LIBRARY_ALL, LINK_LIBRARY_FAV, LINK_LIBRARY_LISTS} from "../../tools/utils/const";


const SearchPage = ({isEdit, updateOrderFunc,areLists}) => {

  const path = useLocation().pathname
  const context = {isEdit,updateOrderFunc,areLists}

  const dispatch = useDispatch()

  const tables = useSelector(state=>state.table.items.arr)


  const allTrue = {menu:false,order:true, deleteBtn:true, listBtn:true, favBtn:true, summBtn:true}
  const allFalse = {menu:false,order:false, deleteBtn:false, listBtn:false, favBtn:false, summBtn:false}
  const editAccess = {
    [LINK_LIBRARY]: {menu:true,order:false, deleteBtn:true, listBtn:true, favBtn:true, summBtn:true},
    [LINK_LIBRARY_ALL]: allTrue,
    [LINK_LIBRARY_FAV]: allTrue,
    [LINK_LIBRARY_LISTS]: {menu:false,order:true, deleteBtn:true, listBtn:false, favBtn:false, summBtn:false},
    [LINK_ADD]: allFalse
  }

  useEffect(()=>{
    console.log("clear")
    // Controller.abort()
    dispatch(getAction_clearTable())
    dispatch(getAction_setCountSearch(0))
    dispatch(getAction_confirmFilter())
    dispatch(getAction_setNumAll(0))

    dispatch(getAction_setEditMenu(editAccess[path]))
    if(isEdit){
      dispatch(getAction_setCountSearch(1))
      dispatch(getAction_confirmFilter())
    }
  }, [path])

  return (
    <SearchContext.Provider value={context}>
      {isEdit
        ? <ToolBar className="toolBar"/>
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