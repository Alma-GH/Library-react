import {deepCopyOBJ} from "../../tools/utils/func";

const defaultState = {
  countSearch: 0,
  confirm: {},
  /*
      title: "",
      language: "",
      author: {
        name:"",
        key:"",
      },
      subjects: [],
      publish: "",
   */

  title: "",

  author: {
    name:"",
    key:"",
  },
  subjects: [],

  language: "",
  publish: "",

  list: "",
  checkFavourite:false,

  searchAPI: "",
}

const SET_COUNT_SEARCH = "SET_COUNT_SEARCH"
const SET_SEARCH = "SET_SEARCH"
const SET_AUTHOR = "SET_AUTHOR"
const SET_LANG = "SET_LANG"
const SET_SUBJ = "SET_SUBJ"
const SET_PUB = "SET_PUB"
const SET_LIST = "SET_LIST"
const SET_FAV = "SET_FAV"

const SET_SEARCH_API = "SET_SEARCH_API"

const CONFIRM_FILTER = "CONFIRM_FILTER"
const CLEAR_SEARCH = "CLEAR_SEARCH"



export const filterReducer = (state=defaultState,action)=>{

  const pl = action.payload

  switch (action.type){
    case SET_AUTHOR:
      return {...state, author: {...pl}}
    case SET_LANG:
      return {...state, language: pl}
    case SET_SUBJ:
      return {...state, subjects: [...pl]}
    case SET_PUB:
      return {...state, publish: pl}
    case SET_LIST:
      return {...state, list: pl}
    case SET_FAV:
      return {...state, checkFavourite: pl}

    case SET_SEARCH:
      return {...state, title: pl}

    case SET_COUNT_SEARCH:
      return {...state, countSearch: pl}

    case SET_SEARCH_API:
      return {...state, searchAPI: pl}



    case CONFIRM_FILTER:

      const newConfirm = {}

      if(state.title)                           newConfirm.title = state.title
      if(state.language)                        newConfirm.language = state.language
      if(state.author.name||state.author.key)   newConfirm.author = {...state.author}
      if(state.subjects.length)                 newConfirm.subjects = [...state.subjects]
      if(state.publish)                         newConfirm.publish = state.publish

      if(state.list)                            newConfirm.list = state.list
      if(state.checkFavourite)                  newConfirm.checkFavourite = state.checkFavourite

      return {...state, confirm: newConfirm}

    case CLEAR_SEARCH:

      const newFilter = {...deepCopyOBJ(defaultState)}
      newFilter.confirm = state.confirm
      newFilter.searchAPI = state.searchAPI
      return newFilter

    default:
      return state
  }
}

export const getAction_confirmFilter = ()=>{return {type:CONFIRM_FILTER}}
export const getAction_clearSearch = ()=>{return {type: CLEAR_SEARCH}}

export const getAction_setCountSearch= (val)=>{return {type:SET_COUNT_SEARCH, payload:val}}
export const getAction_setSearch= (val)=>{return {type:SET_SEARCH, payload:val}}
export const getAction_setAuthor = (name,key)=>{return {type:SET_AUTHOR, payload: {name, key}}}
export const getAction_setLanguage = (lang)=>{return {type:SET_LANG, payload:lang}}
export const getAction_setSubjects = (subjects)=>{return {type:SET_SUBJ, payload:subjects}}
export const getAction_setFirstPublish = (val)=>{return {type:SET_PUB, payload:val}}
export const getAction_setList = (val)=>{return {type:SET_LIST, payload:val}}
export const getAction_setFavourite = (val)=>{return {type:SET_FAV, payload:val}}

export const getAction_setSearchAPI = (api)=>{return {type:SET_SEARCH_API, payload:api}}


