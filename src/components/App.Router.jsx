import React from 'react';
import {Route, Routes} from "react-router-dom";
import {
  PARAMS_INFO,
  PARAMS_SUMMARY,
  PATH_ADD,
  PATH_HOME,
  PATH_INFO,
  PATH_LIBRARY,
  PATH_LIBRARY_LISTS,
  PATH_LIBRARY_SUMMARY, PATH_OPTIONS,
  PATH_ROOT_APP, PATH_ROOT_AUTH,
  PATH_ROOT_SEARCH
} from "../tools/utils/const";
import SearchWrap from "./Pages/SearchWrap";
import InfoPage from "./Pages/InfoPage";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import AppPrivat from "./App.Privat";
import LibraryPage from "./Pages/LibraryPage";
import {libraryListsRoutes, libraryRoutes} from "../router/routes";
import SummaryPage from "./Pages/SummaryPage";
import OptionsPage from "./Pages/OptionsPage";
import AppPublic from "./App.Public";

const AppRouter = () => {

  const auth = false ;

  return (
    <Routes>
      <Route path={PATH_ROOT_APP}>
        {!auth
          ?
            <Route path={PATH_ROOT_AUTH} element={<AppPublic/>}/>
          :
            <Route element={<AppPrivat/>}>

              <Route path={PATH_HOME} element={<HomePage prtClass="home"/>}/>

              <Route path={PATH_ROOT_SEARCH} element={<SearchWrap/>} >
                <Route path={PATH_ADD} element={<SearchPage/>}/>
                <Route path={PATH_INFO +"/"+PARAMS_INFO} element={<InfoPage prtClass="info"/>}/>
              </Route>

              <Route path={PATH_LIBRARY}>
                {libraryRoutes.map(route=>(
                  <Route key={route.path} path={route.path} element={<LibraryPage {...route.elementProps}/>} />
                ))}
                <Route path={PATH_LIBRARY_SUMMARY + "/" + PARAMS_SUMMARY} element={<SummaryPage/>} />
                <Route path={PATH_LIBRARY_LISTS}>
                  {libraryListsRoutes.map(route =>(
                    !route.path
                      ? <Route key="INDEX" index element={<LibraryPage {...route.elementProps}/>}/>
                      : <Route key={route.path} path={route.path} element={<LibraryPage {...route.elementProps}/>}/>
                  ))}
                </Route>
              </Route>

              <Route path={PATH_OPTIONS} element={<OptionsPage prtClass="options"/>}/>

            </Route>
        }
      </Route>


      {/*Redirect*/}
      {!auth
        ?
          <Route path="*" element={<AppPublic/>}/>
        :
          <Route path="*" element={<AppPrivat/>}>
            <Route path="*" element={<HomePage prtClass="home"/>}/>
          </Route>
      }

    </Routes>
  );
};

export default AppRouter;