import {createMyTimer, createThrottling} from "./wrappers";
import ServerService from "../Services/ServerService";
import {
  ACCESS_FOR_ALL_LIB,
  ACCESS_FOR_FAV,
  ACCESS_FOR_LISTS,
  ACCESS_FOR_SEARCH,
  ACCESS_FOR_SEARCH_LIB,
  ARR_ACCESS
} from "./const";

export const errTimer = createMyTimer()
export const updateOrderWorksThrottle = createThrottling(ServerService.fromDB.setWorks,1000).bind(ServerService.fromDB)
export const updateOrderFavsThrottle = createThrottling(ServerService.fromDB.setFavsByWorks,1000).bind(ServerService.fromDB)
export const updateOrderListsThrottle = createThrottling(ServerService.fromDB.setLists,1000).bind(ServerService.fromDB)
export const updateOrderWorksInListThrottle = createThrottling(ServerService.fromDB.setWorksInList,1000).bind(ServerService.fromDB)




export const getTotalPages = (count, limit)=>{
  return Math.ceil(count/limit)
}

export const deepCopyOBJ = (obj) => {
  return {...JSON.parse(JSON.stringify(obj))}
}

export const getLocationByURL = (url)=>{
  return url.slice(url.lastIndexOf("/")+1)
}

export const paramsFromObj = (obj)=>{
  let params = []

  for(let param in obj){
    params.push(`${param}=${obj[param]}`)
  }

  return params.join("&")
}

export const getEditAccess = (access)=>{
  const allTrue = {menu:false,order:true, deleteBtn:true, listBtn:true, favBtn:true, summBtn:true}
  const allFalse = {menu:false,order:false, deleteBtn:false, listBtn:false, favBtn:false, summBtn:false}

  if(!ARR_ACCESS.includes(access)) return allFalse
  else{

    const o = {
      [ACCESS_FOR_ALL_LIB]: allTrue,
      [ACCESS_FOR_FAV]: allTrue,
      [ACCESS_FOR_LISTS]: {menu:false,order:true, deleteBtn:true, listBtn:false, favBtn:false, summBtn:false},
      [ACCESS_FOR_SEARCH_LIB]: {menu:true,order:false, deleteBtn:true, listBtn:true, favBtn:true, summBtn:true},
      [ACCESS_FOR_SEARCH]: allFalse
    }
    return o[access]

  }
}




