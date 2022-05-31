import {useEffect} from "react";
import {LINK_HOME} from "../tools/utils/const";
import {useNavigate} from "react-router-dom";

export const useGoHome = (err)=>{

  const nav = useNavigate()

  useEffect(()=>{
    if(err) nav(LINK_HOME)
  }, [err])

}