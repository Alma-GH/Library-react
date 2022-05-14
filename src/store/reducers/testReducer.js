const defaultState = {
  count: 0
}

const ADD = "ADD"
const GET = "GET"

export const testReducer = (state=defaultState,action)=>{

  switch (action.type){
    case ADD:
      return {...state, count: state.count + action.payload}
    case GET:
      return {...state, count: state.count - action.payload}
    default:
      return state
  }
}

export const getAddCountAction = (add)=>{return {type:ADD, payload:add}}
export const getGetCountAction = (get)=>{return {type:GET, payload:get}}