const defaultState = {

  theme: 2,
  defTableSize: 100,
  defNameList: "New list",
  defRedactMode: false,

}

const SET_THEME = "SET_THEME"
const SET_TABLE_SIZE_OP = "SET_TABLE_SIZE_OP"
const SET_NAME_LIST_OP = "SET_NAME_LIST_OP"
const SET_REDACT_MODE_OP = "SET_REDACT_MODE_OP"

const CLEAR_OPTIONS = "CLEAR_OPTIONS"

export const optionsReducer = (state=defaultState,action)=>{

  switch (action.type){
    case SET_THEME:
      return {...state, theme: +action.payload}
    case SET_TABLE_SIZE_OP:
      return {...state, defTableSize: action.payload}
    case SET_NAME_LIST_OP:
      return {...state, defNameList: String(action.payload)}
    case SET_REDACT_MODE_OP:
      return {...state, defRedactMode: !!action.payload}

    case CLEAR_OPTIONS:
      return {...defaultState}


    default:
      return state
  }
}

export const getAction_setTheme = (numTheme)=>{return {type:SET_THEME, payload:numTheme}}
export const getAction_setDefTableSize = (size)=>{return {type:SET_TABLE_SIZE_OP, payload:size}}
export const getAction_setDefNameList = (name)=>{return {type:SET_NAME_LIST_OP, payload:name}}
export const getAction_setDefRedactMode = (on)=>{return {type:SET_REDACT_MODE_OP, payload:on}}

export const getAction_clearOptions = ()=>{return {type:CLEAR_OPTIONS}}
