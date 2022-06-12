const defaultState = {
  headTitle: ""
}

const SET_HEAD = "SET_HEAD"

export const globalReducer = (state=defaultState,action)=>{

  switch (action.type){
    case SET_HEAD:
      return {...state, headTitle: action.payload}

    default:
      return state
  }
}


export const getAction_setHeadTitle = (title)=>{return {type:SET_HEAD, payload:title}}
