import {
  ACCESS_FOR_ALL_LIB,
  ACCESS_FOR_FAV, ACCESS_FOR_LISTS, PARAMS_LIST,
  PATH_LIBRARY_ALL,
  PATH_LIBRARY_FAV,
  PATH_LIBRARY_LISTS
} from "../tools/utils/const";
import {
  getEditAccess,
  updateOrderFavsThrottle,
  updateOrderListsThrottle, updateOrderWorksInListThrottle,
  updateOrderWorksThrottle
} from "../tools/utils/func.js";
import ServerService from "../tools/Services/ServerService";


export const libraryRoutes = [
  {path:PATH_LIBRARY_ALL, elementProps: {
    updateOrderFunc:updateOrderWorksThrottle,
    editAccess:getEditAccess(ACCESS_FOR_ALL_LIB),
    GET_METHOD:ServerService.fromDB.getAllWorks.bind(ServerService.fromDB)
  }},

  {path:PATH_LIBRARY_FAV, elementProps:{
    updateOrderFunc:updateOrderFavsThrottle,
    editAccess:getEditAccess(ACCESS_FOR_FAV),
    GET_METHOD:ServerService.fromDB.getAllFav.bind(ServerService.fromDB)
  }},

]

export const libraryListsRoutes = [
  {elementProps:{
    areLists:true,
    updateOrderFunc:updateOrderListsThrottle,
    GET_METHOD:ServerService.fromDB.getAllLists.bind(ServerService.fromDB),
    editAccess:getEditAccess(ACCESS_FOR_LISTS)
  }},

  {path:PARAMS_LIST, elementProps:{
      updateOrderFunc:updateOrderWorksInListThrottle,
      GET_METHOD:ServerService.fromDB.getWorksByListId.bind(ServerService.fromDB),
      editAccess:getEditAccess(ACCESS_FOR_ALL_LIB)
  }},
]