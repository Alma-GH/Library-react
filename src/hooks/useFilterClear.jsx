import {useDispatch, useSelector} from "react-redux";
import {getAction_clearSearch, getAction_setCountSearch, getAction_setSearch} from "../store/reducers/filterReducer";


export const useFilterClear = ()=>{

  const dispatch = useDispatch()

  const title = useSelector(state=>state.filter.title)
  const countSearch = useSelector(state=>state.filter.countSearch)

  function clearFilter(){
    dispatch(getAction_clearSearch())
    dispatch(getAction_setCountSearch(countSearch))
    dispatch(getAction_setSearch(title))
  }


  return clearFilter
}