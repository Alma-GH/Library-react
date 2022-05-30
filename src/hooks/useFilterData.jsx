import {useSelector} from "react-redux";


export const useFilterData = ()=>{

  const inputAuthorR = useSelector(state=>state.filter.author.name)
  const languageR = useSelector(state=>state.filter.language)
  const subjects = useSelector(state=>state.filter.subjects)
  const fPublish = useSelector(state=> state.filter.publish)
  const fList = useSelector(state=>state.filter.list)
  const fFav = useSelector(state=>state.filter.checkFavourite)

  const api = useSelector(state=>state.filter.searchAPI)


  return {inputAuthorR, languageR, subjects, fPublish, fList, fFav, api}
}