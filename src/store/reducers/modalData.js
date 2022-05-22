const defaultState = {
  newNameList: "",


  optionsLists: [],
  selectedLists: [],

}

const SET_MODAL_NEW_NAME_LIST = "SET_MODAL_NEW_NAME_LIST"


const SET_MODAL_OPTIONS_LISTS = "SET_MODAL_OPTIONS_LISTS"
const SET_MODAL_SELECTED_LISTS = "SET_MODAL_SELECTED_LISTS"


export const modalDataReducer = (state=defaultState,action)=>{

  switch (action.type){
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

export const getAction_setNewNameList = (name)=>{return {type:SET_MODAL_NEW_NAME_LIST, payload:name}}


export const getAction_setSelectedLists = (lists)=>{return {type:SET_MODAL_SELECTED_LISTS, payload: lists}}
export const getAction_setOptionsLists = (options)=>{return {type:SET_MODAL_OPTIONS_LISTS, payload: options}}