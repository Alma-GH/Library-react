const defaultState = {

  limit: 30,
  currentPage: 1,
  //TODO: scroll: 0,

  all: 0,

}

const SET_LIMIT = "SET_LIMIT"
const SET_PAGE = "SET_PAGE"
const SET_ALL = "SET_ALL"


export const pageReducer = (state=defaultState,action)=>{

  switch (action.type){
    case SET_LIMIT:
      return {...state, limit: action.payload}
    case SET_PAGE:
      return {...state, currentPage: action.payload}
    case SET_ALL:
      return {...state, all: action.payload}


    default:
      return state
  }
}

export const getAction_setLimit = (val)=>{return {type:SET_LIMIT, payload:val}}
export const getAction_setPage = (val)=>{return {type:SET_PAGE, payload:val}}
export const getAction_setNumAll = (val)=>{return {type:SET_ALL, payload:val}}

