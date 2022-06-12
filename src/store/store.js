import {composeWithDevTools} from "redux-devtools-extension";
import {createStore, combineReducers} from "redux";
import {testReducer} from "./reducers/testReducer";
import {tableReducer} from "./reducers/tableReducer";
import {pageReducer} from "./reducers/pageReducer";
import {filterReducer} from "./reducers/filterReducer";
import {modalDataReducer} from "./reducers/modalData";
import {globalReducer} from "./reducers/globalReducer";
import {optionsReducer} from "./reducers/optionsReducer";


const rootReducers = combineReducers({
  test: testReducer,
  table: tableReducer,
  page: pageReducer,
  filter: filterReducer,
  modal: modalDataReducer,
  global: globalReducer,
  option: optionsReducer
})

export const store = createStore(rootReducers, composeWithDevTools())