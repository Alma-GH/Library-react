const defaultState = {

  //modal
  visible: false,
  bodyNum: 0,


  idTable: 0,

  //rename list (bodyNum = 1)
  newNameList: "",

  //add in list (bodyNum = 2)
  optionsLists: [],
  selectedLists: [],

  //confirm (bodyNum = 3)
  confirmCallback: ()=>console.log("none callback"),
  confirmText: "",



  //hint
  hintNum: 0,


}

const SET_MODAL_VIS = "SET_MODAL_VIS"
const SET_MODAL_BODY = "SET_MODAL_BODY"
const SET_MODAL_ID = "SET_MODAL_ID"

const SET_MODAL_NEW_NAME_LIST = "SET_MODAL_NEW_NAME_LIST"

const SET_MODAL_OPTIONS_LISTS = "SET_MODAL_OPTIONS_LISTS"
const SET_MODAL_SELECTED_LISTS = "SET_MODAL_SELECTED_LISTS"

const SET_MODAL_CONFIRM_CALLBACK = "SET_MODAL_CONFIRM_CALLBACK"
const SET_MODAL_CONFIRM_TEXT = "SET_MODAL_CONFIRM_TEXT"

const SET_HINT = "SET_HINT"


export const modalDataReducer = (state=defaultState,action)=>{

  switch (action.type){

    case SET_MODAL_VIS:
      return {...state, visible: !!action.payload}
    case SET_MODAL_BODY:
      return {...state, bodyNum: action.payload}
    case SET_MODAL_ID:
      return {...state, idTable: action.payload}

    case SET_MODAL_NEW_NAME_LIST:
      return {...state, newNameList: action.payload}

    case SET_MODAL_OPTIONS_LISTS:
      return {...state, optionsLists: [...action.payload]}
    case SET_MODAL_SELECTED_LISTS:
      return {...state, selectedLists: [...action.payload]}

    case SET_MODAL_CONFIRM_CALLBACK:
      return {...state, confirmCallback: typeof action.payload === "function" ? action.payload : defaultState.confirmCallback}

    case SET_MODAL_CONFIRM_TEXT:
      return {...state, confirmText: action.payload}

    case SET_HINT:
      return {...state, hintNum: action.payload}

    default:
      return state
  }
}

export const getAction_setVisModal = (isVis)=>{return {type:SET_MODAL_VIS, payload:isVis}}
export const getAction_setBodyModal = (num)=>{return {type:SET_MODAL_BODY, payload:num}}
export const getAction_setIdInModal = (id)=>{return {type:SET_MODAL_ID, payload:id}}

export const getAction_setNewNameList = (name)=>{return {type:SET_MODAL_NEW_NAME_LIST, payload:name}}

export const getAction_setSelectedLists = (lists)=>{return {type:SET_MODAL_SELECTED_LISTS, payload: lists}}
export const getAction_setOptionsLists = (options)=>{return {type:SET_MODAL_OPTIONS_LISTS, payload: options}}

export const getAction_setConfirmCallback = (cb)=>{return {type:SET_MODAL_CONFIRM_CALLBACK, payload: cb}}
export const getAction_setConfirmText = (text)=>{return {type:SET_MODAL_CONFIRM_TEXT, payload: text}}

export const getAction_setHint = (num)=>{return {type:SET_HINT, payload: num}}