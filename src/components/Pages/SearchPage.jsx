import React, {createContext, useContext} from 'react';
import FilterBlock from "../FilterBlock";
import InputBlock from "../InputBlock";
import ContentBlock from "../ContentBlock";
import {Outlet, useLocation} from "react-router-dom";
import {LINK_INFO} from "../../tools/utils/const";
import {SearchContext} from "../../context/SearchContext";


const SearchPage = ({isEdit}) => {


  return (
    <SearchContext.Provider value={{isEdit}}>
      <FilterBlock prtClass="filter"/>
      <InputBlock/>
      <ContentBlock/>
    </SearchContext.Provider>
  );
};

export default SearchPage;