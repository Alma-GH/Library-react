import React from 'react';
import {Route, Routes} from "react-router-dom";
import {
  PARAMS_INFO,
  PATH_ADD,
  PATH_HOME,
  PATH_INFO,
  PATH_LIBRARY,
  PATH_LIBRARY_ALL,
  PATH_LIBRARY_FAV,
  PATH_LIBRARY_LISTS,
  PATH_ROOT_APP,
  PATH_ROOT_SEARCH
} from "../tools/utils/const";
import SearchWrap from "./Pages/SearchWrap";
import InfoPage from "./Pages/InfoPage";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import AppPrivat from "./App.Privat";

const AppRouter = () => {

  return (
    <Routes>


      <Route path={PATH_ROOT_APP} element={<AppPrivat/>}>

        <Route path={PATH_ROOT_SEARCH} element={<SearchWrap/>} >
          <Route path={PATH_ADD} element={<SearchPage isEdit={false}/>}/>

          <Route path={PATH_LIBRARY} element={<SearchPage isEdit={false}/>}/>
          <Route path={PATH_LIBRARY + "/" + PATH_LIBRARY_ALL} element={<SearchPage isEdit={true}/>}/>
          <Route path={PATH_LIBRARY + "/" + PATH_LIBRARY_LISTS} element={<SearchPage isEdit={true} areLists={true}/>}/>
          <Route path={PATH_LIBRARY + "/" + PATH_LIBRARY_FAV} element={<SearchPage isEdit={true}/>}/>

          <Route path={PATH_INFO + PARAMS_INFO} element={<InfoPage prtClass="info"/>}/>
        </Route>


        <Route path={PATH_HOME} element={<HomePage prtClass="home"/>}/>
      </Route>


      <Route path="*" element={<AppPrivat/>}>
        <Route path="*" element={<HomePage prtClass="home"/>}/>
      </Route>


    </Routes>
  );
};

export default AppRouter;