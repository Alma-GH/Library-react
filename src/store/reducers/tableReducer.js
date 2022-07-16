import {deepCopyOBJ} from "../../tools/utils/func.js";

const defaultState = {

  items:{
    arr:[],
    loading: false,
    error: {err:false, message:""},

    sort: "",
    edit:{
      menu: false,
      order: false,

      deleteBtn: false,
      listBtn: false,
      favBtn: false,
      summBtn: false,
    },
    size: 100
  },

  info:{},
}

const SET_TABLES = "SET_TABLES"
const SET_LOAD_TABLES = "SET_LOAD_TABLES"
const SET_ERR_TABLES = "SET_ERR_TABLES"
const SET_SORT_TABLES = "SET_SORT_TABLES"
const SET_EDIT_MENU = "SET_EDIT_MENU"
const SET_SIZE_TABLES = "SET_SIZE_TABLES"

const SET_INFO = "SET_INFO"


const SORT_TABLES = "SORT_TABLES"
const REVERSE_TABLES = "REVERSE_TABLES"

const CLEAR_TABLE = "CLEAR_TABLE"

function sortTables(arr,prop){
  return arr.sort((a,b)=>(
    // typeof a[prop] === "string" && typeof b[prop] === "string"
      // ? (a[prop].toLowerCase() > b[prop].toLowerCase() ? 1 : -1) :
      a[prop]>b[prop] ? 1 : -1
  ))
}

function checkTypeError(err){
  for(let key in defaultState.items.error){
    if(!err.hasOwnProperty(key)) throw Error("INCORRECT TYPE items.error IN TABLE_REDUCER")
  }
}

function checkTypeEdit(edit){
  for(let key in defaultState.items.edit){
    if(!edit.hasOwnProperty(key)) throw Error("INCORRECT TYPE items.edit IN TABLE_REDUCER")
  }
}

export const tableReducer = (state=defaultState,action)=>{

  switch (action.type){
    case SET_TABLES:
      return {...state, items: {...state.items, arr: action.payload}}
    case SET_LOAD_TABLES:
      return {...state, items: {...state.items, loading: action.payload}}
    case SET_ERR_TABLES:
      checkTypeError(action.payload)
      return {...state, items: {...state.items, error: action.payload}}
    case SET_SORT_TABLES:
      return {...state, items: {...state.items, sort: action.payload}}
    case SET_EDIT_MENU:
      checkTypeEdit(action.payload)
      return {...state, items: {...state.items, edit: action.payload}}
    case SET_SIZE_TABLES:
      return {...state, items: {...state.items, size: +action.payload}}


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
export const getAction_setEditMenu =
  ({menu, order, deleteBtn, listBtn, favBtn, summBtn})=>{return {type: SET_EDIT_MENU, payload:{menu,order, deleteBtn, listBtn, favBtn, summBtn}}}
export const getAction_setSizeTable = (size)=>{return {type:SET_SIZE_TABLES, payload:size}}
export const getAction_setInfo = (val)=>{return {type:SET_INFO, payload:val}}
export const getAction_setSort = (val)=>{return {type:SET_SORT_TABLES, payload:val}}
export const getAction_sortTables = ()=>{return {type:SORT_TABLES}}
export const getAction_reverseTables = ()=>{return {type:REVERSE_TABLES}}

export const getAction_clearTable = ()=>{return {type:CLEAR_TABLE}}
