const defaultState = {

  visible: false,
  bodyNum: 0,
  idTable: 0,

  //rename list
  newNameList: "",

  //add in list
  optionsLists: [],
  selectedLists: [],

}

const SET_MODAL_VIS = "SET_MODAL_VIS"
const SET_MODAL_BODY = "SET_MODAL_BODY"
const SET_MODAL_ID = "SET_MODAL_ID"

const SET_MODAL_NEW_NAME_LIST = "SET_MODAL_NEW_NAME_LIST"

const SET_MODAL_OPTIONS_LISTS = "SET_MODAL_OPTIONS_LISTS"
const SET_MODAL_SELECTED_LISTS = "SET_MODAL_SELECTED_LISTS"


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