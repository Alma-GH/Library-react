import React, {useEffect} from 'react';
import {Route, Routes, useHistory, useLocation, useNavigate} from "react-router-dom";
import {
  LINK_FIND,
  LINK_LIBRARY,
  PARAMS_INFO,
  PATH_FIND,
  PATH_HOME,
  PATH_INFO,
  PATH_LIBRARY,
  PATH_ROOT_APP,
  PATH_ROOT_SEARCH
} from "../tools/utils/const";
import SearchWrap from "./Pages/SearchWrap";
import ServerService from "../tools/Services/ServerService";
import InfoPage from "./Pages/InfoPage";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import {useDispatch} from "react-redux";
import {getAction_clearTable} from "../store/reducers/tableReducer";
import {
  getAction_clearSearch,
  getAction_confirmFilter,
  getAction_setCountSearch
} from "../store/reducers/filterReducer";
import AppPrivat from "./App.Privat";
import Controller from "../tools/Services/Controller";
import {getAction_setNumAll, getAction_setPage} from "../store/reducers/pageReducer";

const AppRouter = () => {

  const path = useLocation().pathname

  const dispatch = useDispatch()


  const GET_METHOD = !path.startsWith(LINK_LIBRARY)
    ? ServerService.fromAPI.getWorksByFilter
    : ServerService.fromDB.getWorksByFilter

  const clearCondition = path.startsWith(LINK_LIBRARY) || path.startsWith(LINK_FIND)

  useEffect(()=>{
    console.log("clear")
    // Controller.abort()
    dispatch(getAction_clearTable())
    dispatch(getAction_setCountSearch(0))
    dispatch(getAction_confirmFilter())
    dispatch(getAction_setNumAll(0))
  }, [GET_METHOD])

  return (
    <Routes>


      <Route path={PATH_ROOT_APP} element={<AppPrivat/>}>

        <Route path={PATH_ROOT_SEARCH} element={<SearchWrap GET_METHOD={GET_METHOD}/>} >
          <Route path={PATH_FIND} element={<SearchPage isEdit={false}/>}/>
          <Route path={PATH_LIBRARY} element={<SearchPage isEdit={true}/>}/>
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