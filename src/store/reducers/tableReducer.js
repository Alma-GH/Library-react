import {deepCopyOBJ} from "../../tools/utils/func";

const defaultState = {

  items:{
    arr:[],
    loading: false,
    error: {err:false, message:""},

    sort: "",
  },

  info:{},
}

const SET_TABLES = "SET_TABLES"
const SET_LOAD_TABLES = "SET_LOAD_TABLES"
const SET_ERR_TABLES = "SET_ERR_TABLES"
const SET_SORT_TABLES = "SET_SORT_TABLES"

const SET_INFO = "SET_INFO"


const SORT_TABLES = "SORT_TABLES"
const REVERSE_TABLES = "REVERSE_TABLES"

const CLEAR_TABLE = "CLEAR_TABLE"

function sortTables(arr,prop){
  return arr.sort((a,b)=>(a[prop]>b[prop] ? 1 : -1))
}

export const tableReducer = (state=defaultState,action)=>{

  switch (action.type){
    case SET_TABLES:
      return {...state, items: {...state.items, arr: action.payload}}
    case SET_LOAD_TABLES:
      return {...state, items: {...state.items, loading: action.payload}}
    case SET_ERR_TABLES:
      return {...state, items: {...state.items, error: action.payload}}
    case SET_SORT_TABLES:
      return {...state, items: {...state.items, sort: action.payload}}

    case SET_INFO:
      return {...state, info: action.payload}


    case SORT_TABLES:
      return {...state, items:{...state.items, arr: [...sortTables(state.items.arr,state.items.sort)]}}
    case REVERSE_TABLES:
      return {...state, items:{...state.items, arr: [...state.items.arr.reverse()]}}


    case CLEAR_TABLE:
      return deepCopyOBJ(defaultState)


    default:
      return state
  }
}

export const getAction_setTable = (val)=>{return {type:SET_TABLES, payload:val}}
export const getAction_setLoadTable = (val)=>{return {type:SET_LOAD_TABLES, payload:val}}
export const getAction_setErrorTable = (isErr,message)=>{return {type:SET_ERR_TABLES, payload: {err:isErr, message:message}}}
export const getAction_setInfo = (val)=>{return {type:SET_INFO, payload:val}}
export const getAction_setSort = (val)=>{return {type:SET_SORT_TABLES, payload:val}}
export const getAction_sortTables = ()=>{return {type:SORT_TABLES}}
export const getAction_reverseTables = ()=>{return {type:REVERSE_TABLES}}

export const getAction_clearTable = ()=>{return {type:CLEAR_TABLE}}
