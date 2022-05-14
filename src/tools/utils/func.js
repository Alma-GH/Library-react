import {createMyTimer} from "./wrappers";

export const errTimer = createMyTimer()




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