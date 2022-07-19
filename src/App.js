import './style/App.scss';
import AppRouter from "./components/App.Router";
import React, {useContext, useEffect} from "react";
import {DBContext} from "./context/DBContext";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "./components/UI/Notifications/Loader";
import DatabaseAPI from "./tools/Services/DatabaseAPI";

function App() {

  const {auth, db} = useContext(DBContext)
  const [user,loader,err] = useAuthState(auth)

  useEffect(()=>{
    DatabaseAPI.user = user
    DatabaseAPI.database = db
  }, [user, db])

  if(err) console.log(err)
  if(loader) return <Loader/>

  return (
    <AppRouter access={user}/>
  );
}

export default App;

