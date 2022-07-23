import {createMyTimer, createThrottling} from "./wrappers.js";
import ServerService from "../Services/ServerService.js";
import {
  ACCESS_FOR_ALL_LIB,
  ACCESS_FOR_FAV,
  ACCESS_FOR_LISTS,
  ACCESS_FOR_SEARCH,
  ACCESS_FOR_SEARCH_LIB,
  ARR_ACCESS
} from "./const.js";

export const errTimer1 = createMyTimer()
export const errTimer2 = createMyTimer()
export const errTimerAuth1 = createMyTimer()
export const errTimerAuth2 = createMyTimer()
export const updateOrderWorksThrottle = createThrottling(ServerService.fromDB.setWorks,1000).bind(ServerService.fromDB)
export const updateOrderFavsThrottle = createThrottling(ServerService.fromDB.setFavsByWorks,1000).bind(ServerService.fromDB)
export const updateOrderListsThrottle = createThrottling(ServerService.fromDB.setLists,1000).bind(ServerService.fromDB)
export const updateOrderWorksInListThrottle = createThrottling(ServerService.fromDB.setWorksInList,1000).bind(ServerService.fromDB)
export const updateSummaryThrottle = createThrottling(ServerService.fromDB.setSummaryById, 1000).bind(ServerService.fromDB)




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

export const strInclude = (str, inStr)=>{
  //TODO: fix error
  return str.toLowerCase().includes(inStr.toLowerCase())
}

export const matchInArrays = (arr1, arr2) => {

  if(!Array.isArray(arr1) || !Array.isArray(arr2)) return false

  for(let v1 of arr1){
    for(let v2 of arr2){
      if(v1 === v2) return true
    }
  }
  return false
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

export const htmlFromSpecialText = (str)=>{
  const interpreter = {
    header: "<div style='text-align: center'>",

    big: "<span style='font-size: larger'>",
    small: "<span style='font-size: smaller'>",

    bold: "<b>",
    italic: "<i>",
    inserted: "<ins>",

    red: "<span style='color: red'>",
    orange: "<span style='color: darkorange'>",
    green: "<span style='color: green'>",
    blue: "<span style='color: dodgerblue'>",
  }
  const end = {
    header: "</div>",

    big: "</span>",
    small: "</span>",

    bold: "</b>",
    italic: "</i>",
    inserted: "</ins>",

    red: "</span>",
    orange: "</span>",
    green: "</span>",
    blue: "</span>",
  }

  const stack = []
  let html = []

  for(let i = 0; i<str.length; i++){
    const char = str[i]

    if(char !== "/" && char !== "\n") html.push(char)
    else if(char === "\n") html.push("<br/>")
    else if(str[i+1] === "("){
      let key = ""
      let j = i + 2
      for(; j<str.length && str[j] !== ")"; j++) key += str[j]
      if(str[j] === ")" && interpreter[key]){
        stack.push(key)
        html.push(interpreter[key])
        i = j
      }
    }
    else if(stack.length) html.push(end[stack.pop()])

  }


  return html.join("")
}


