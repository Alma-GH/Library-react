import React, {useContext} from 'react';
import ReorderPanel from "./ReorderPanel";
import BtnIco from "./UI/BtnIco";
import imgE from "../assets/imgs/edit.png";
import imgP from "../assets/imgs/plus.png";
import {SearchContext} from "../context/SearchContext";
import {getAction_setEditMenu} from "../store/reducers/tableReducer";
import {useDispatch, useSelector} from "react-redux";
import {useFetching} from "../hooks/useFetching";
import ServerService from "../tools/Services/ServerService";
import Loader from "./UI/Notifications/Loader";
import {getAction_confirmFilter} from "../store/reducers/filterReducer";

const ToolBar = ({className}) => {

  const dispatch = useDispatch()
  const {areLists, updateOrderFunc} = useContext(SearchContext)

  const tables = useSelector(state=>state.table.items.arr)
  const listID = useSelector(state=>state.filter.confirm.title)
  const editOptions = useSelector(state=>state.table.items.edit)
  const editable = editOptions.menu

  const [fetchList, isLoadingList, errList] = useFetching(async ()=>{
    dispatch(getAction_setEditMenu({...editOptions, menu:false}))
    const res = await ServerService.fromDB.addNewList()
    dispatch(getAction_confirmFilter())
    dispatch(getAction_setEditMenu({...editOptions, menu:editable}))
  })

  function editTables(e){
    e.preventDefault()
    dispatch(getAction_setEditMenu({...editOptions, menu: !editable}))
  }

  function updateTables(){
    updateOrderFunc(tables, listID)
      .then(res=>console.log("UPDATE TABLES"))
  }


  async function addList(e){
    fetchList()
  }

  return (
    <div className={className}>
      {isLoadingList
        ? <Loader/>
        : <>
            <ReorderPanel cbOnReverse={updateTables} cbOnSort={updateTables}/>
            <BtnIco img={imgE} cb={editTables} isActiveStyle={editable}/>
            {areLists && <BtnIco img={imgP} cb={addList}/>}
          </>
      }

    </div>
  );
};


export default ToolBar;