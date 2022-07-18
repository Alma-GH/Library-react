
//paths
export const PATH_ROOT_APP = "/app"
export const PATH_ROOT_AUTH = "auth"
export const PATH_ROOT_SEARCH = "search"


export const PATH_HOME = "home"
export const PATH_OPTIONS = "options"


export const PATH_ADD = "add"

export const PATH_LIBRARY = "library"
export const PATH_LIBRARY_ALL = "all"
export const PATH_LIBRARY_FAV = "favourite"

export const PATH_LIBRARY_LISTS = "lists"
export const PARAMS_LIST = ":list"
export const PATH_LIBRARY_SUMMARY = "summary"
export const PARAMS_SUMMARY = ":summary"
export const PATH_INFO = "info"
export const PARAMS_INFO = ":page"



export const LINK_AUTH = `${PATH_ROOT_APP}/${PATH_ROOT_AUTH}`
export const LINK_HOME = `${PATH_ROOT_APP}/${PATH_HOME}`
export const LINK_OPTIONS = `${PATH_ROOT_APP}/${PATH_OPTIONS}`

export const LINK_ADD    = `${PATH_ROOT_APP}/${PATH_ROOT_SEARCH}/${PATH_ADD}`
export const LINK_INFO    = `${PATH_ROOT_APP}/${PATH_ROOT_SEARCH}/${PATH_INFO}`

export const LINK_LIBRARY_ALL = `${PATH_ROOT_APP}/${PATH_LIBRARY}/${PATH_LIBRARY_ALL}`
export const LINK_LIBRARY_FAV = `${PATH_ROOT_APP}/${PATH_LIBRARY}/${PATH_LIBRARY_FAV}`
export const LINK_LIBRARY_LISTS = `${PATH_ROOT_APP}/${PATH_LIBRARY}/${PATH_LIBRARY_LISTS}`
export const LINK_LIBRARY_SUMMARY = `${PATH_ROOT_APP}/${PATH_LIBRARY}/${PATH_LIBRARY_SUMMARY}`


export const HEAD_NAME = Object.freeze({
  [LINK_HOME]: "HOME",
  [LINK_ADD]: "SEARCH",
  [LINK_INFO]: "INFO",
  [LINK_OPTIONS]: "OPTIONS",

  [LINK_LIBRARY_ALL]: "LIBRARY",
  [LINK_LIBRARY_FAV]: "LIBRARY FAVOURITE",
  [LINK_LIBRARY_LISTS]: "LIBRARY LISTS",
  [LINK_LIBRARY_SUMMARY]: "LIBRARY SUMMARY",
})




//table props
export const T_AUTHOR = "author"
export const T_TITLE = "title"
export const T_PUBLISH = "publish"

//DB
export const DB_ROOT = "https://mylib-e19e9-default-rtdb.europe-west1.firebasedatabase.app"
export const DB_WORKS = `/data/works/all.json`
export const DB_LISTS = `/data/works/lists/all.json`
export const DB_FAV = `/data/works/lists/fav.json`
export const DB_SUMM = `/data/summary.json`
export const WORK_PROPS = ["author", "description", "img", "subjects", "title", "url", "id"]
export const LIST_PROPS = ["lid", "wids", "name"]
export const NAME_NEW_LIST = "New list"
export const ADD_FOR_NAME = "+"


//big data
export const BIG_LANGUAGES = [
  {"name": "English", "key": "/languages/eng"},
  {"name": "German / Deutsch", "key": "/languages/ger"},
  {"name": "French / fran\u00e7ais", "key": "/languages/fre"},
  {"name": "Spanish / espa\u00f1ol", "key": "/languages/spa"},
  {"name": "Russian / \u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a", "key": "/languages/rus",},
  {"name": "Chinese", "key": "/languages/chi",}, {"name": "Italian", "key": "/languages/ita",},
  {"name": "Japanese", "key": "/languages/jpn",}, {"name": "Portuguese", "key": "/languages/por",},
  {"name": "Arabic", "key": "/languages/ara",}, {"name": "Polish", "key": "/languages/pol",},
  {"name": "Korean", "key": "/languages/kor",}, {"name": "Hebrew", "key": "/languages/heb",},
  {"name": "Dutch", "key": "/languages/dut",}, {"name": "Indonesian", "key": "/languages/ind",}
]

//edit menu access
export const ACCESS_FOR_ALL_LIB = "ACCESS_FOR_ALL_LIB"
export const ACCESS_FOR_FAV = "ACCESS_FOR_FAV"
export const ACCESS_FOR_LISTS = "ACCESS_FOR_LISTS"
export const ACCESS_FOR_SEARCH_LIB = "ACCESS_FOR_SEARCH_LIB"
export const ACCESS_FOR_SEARCH = "ACCESS_FOR_SEARCH"
export const ARR_ACCESS = [ACCESS_FOR_SEARCH_LIB,ACCESS_FOR_ALL_LIB,ACCESS_FOR_FAV,ACCESS_FOR_LISTS,ACCESS_FOR_SEARCH]