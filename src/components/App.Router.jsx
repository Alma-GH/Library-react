import React from 'react';
import {Route, Routes} from "react-router-dom";
import {
  PARAMS_INFO, PARAMS_LIST,
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
import {updateOrderFavsThrottle, updateOrderListsThrottle, updateOrderWorksThrottle} from "../tools/utils/func";

const AppRouter = () => {

  return (
    <Routes>
      <Route path={PATH_ROOT_APP} element={<AppPrivat/>}>

        <Route path={PATH_ROOT_SEARCH} element={<SearchWrap/>} >
          <Route path={PATH_ADD} element={<SearchPage isEdit={false}/>}/>

          <Route path={PATH_LIBRARY}>
            <Route index element={<SearchPage isEdit={false}/>}/>

            <Route path={PATH_LIBRARY_ALL}
                   element={<SearchPage isEdit={true} updateOrderFunc={updateOrderWorksThrottle}/>}/>
            <Route path={PATH_LIBRARY_FAV}
                   element={<SearchPage isEdit={true} updateOrderFunc={updateOrderFavsThrottle}/>}/>
            <Route path={PATH_LIBRARY_LISTS}>
              <Route index element={<SearchPage isEdit={true} areLists={true} updateOrderFunc={updateOrderListsThrottle} />}/>
              <Route path={PARAMS_LIST} element={<SearchPage isEdit={true}/>}/>
            </Route>
          </Route>

          <Route path={PATH_INFO +"/"+PARAMS_INFO} element={<InfoPage prtClass="info"/>}/>
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