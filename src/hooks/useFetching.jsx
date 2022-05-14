import {useState} from "react";
import {errTimer} from "../tools/utils/func"

export const useFetching = (cb)=>{
  const [isLoading, setIsLoading] = useState(null)
  const [err, setErr] = useState(null)


  const fetching = async (...args) => {
    try{
      setIsLoading(true)
      return await cb(...args)
    }catch(e){
      console.log(e.message)
      setErr(e)
      errTimer(()=>setErr(null), 4000)
    }finally {
      setIsLoading(false)
    }
  }
  return [fetching, isLoading, err]
}