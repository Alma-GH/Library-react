import './style/App.scss';
import AppRouter from "./components/App.Router";
import React, {useContext, useEffect} from "react";
import {DBContext} from "./context/DBContext";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./components/UI/Notifications/Loader";
import DatabaseAPI from "./tools/Services/DatabaseAPI";
import ServerService from "./tools/Services/ServerService";
import {
  getAction_setDefNameList,
  getAction_setDefRedactMode,
  getAction_setDefTableSize, getAction_setTheme
} from "./store/reducers/optionsReducer";
import {useDispatch, useSelector} from "react-redux";

function App() {

  const dispatch = useDispatch()

  const {auth, db} = useContext(DBContext)
  const [user,loader,err] = useAuthState(auth)

  const settingsObj = useSelector(state=>state.option)

  useEffect(()=>{
    async function takeSettings(){
      const settings = await ServerService.fromDB.getSettings();

      if(settings){
        dispatch(getAction_setDefTableSize(settings.defTableSize))
        dispatch(getAction_setDefNameList(settings.defNameList))
        dispatch(getAction_setDefRedactMode(settings.defRedactMode))
        dispatch(getAction_setTheme(settings.theme))
      }
    }

    DatabaseAPI.user = user
    DatabaseAPI.database = db

    if(user)
      takeSettings()
        .catch(reason => console.log(reason))

  }, [user, db])

  useEffect(()=>{
    async function saveSettings(){
      await ServerService.fromDB.setSettings(settingsObj)
      console.log("settings was saved...")
    }

    if(DatabaseAPI._uid)
      saveSettings()
        .catch(reason => console.log(reason))
  }, [settingsObj])

  if(err) console.log(err)
  if(loader) return <Loader/>

  return (
    <AppRouter access={user}/>
  );
}

export default App;

