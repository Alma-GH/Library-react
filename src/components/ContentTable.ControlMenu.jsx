import React, {useContext, useRef, useState} from 'react';
import cls from "../style/main/ContentTable.module.scss";
import BtnIco from "./UI/BtnIco";

import imgD from "../assets/imgs/cancel.png"
import imgL from "../assets/imgs/list.png";
import imgF from "../assets/imgs/star.png";
import imgW from "../assets/imgs/edit.png";
import imgP from "../assets/imgs/plus.png"

import BtnCorner from "./UI/BtnCorner";
import {useDispatch, useSelector} from "react-redux";
import ServerService from "../tools/Services/ServerService";
import {getAction_confirmFilter} from "../store/reducers/filterReducer";
import {getAction_setTable} from "../store/reducers/tableReducer";
import {useFetching} from "../hooks/useFetching";
import Loader from "./UI/Notifications/Loader";
import {useFavourite} from "../hooks/useFavourite";
import {SearchContext} from "../context/SearchContext";
import Modal from "./UI/Modal";
import InputC from "./UI/InputC";
import {tab} from "@testing-library/user-event/dist/tab";

const ContentTableControlMenu = ({drugControl, idTable}) => {

  const {areLists} = useContext(SearchContext)

  const dispatch = useDispatch()

  const tables = useSelector(state=>state.table.items.arr)

  const editOptions = useSelector(state=>state.table.items.edit)


  const [isFav,fetchFav, fetchListMembership, isLoadingFav, err] = useFavourite(idTable)

  const [visModal, setVisModal] = useState(false)
  const [newListName, setNewListName] = useState("")


  function editClick(e){
    e.preventDefault()

    if(!visibleMenu && !areLists){
      fetchListMembership()
    }

    setVisibleMenu(!visibleMenu)
  }

  async function deleteClick(e){
    try {
      let resFromServer
      if(!areLists){
        dispatch(getAction_setTable(tables.filter(table=>table.id!==idTable)))
        resFromServer = await ServerService.fromDB.deleteWorkById(idTable)
      }else{
        dispatch(getAction_setTable(tables.filter(table=>table.lid!==idTable)))
        resFromServer = await ServerService.fromDB.deleteList(idTable)
      }
      console.log({resFromServer})

    }catch (e){
      console.log(e.message)
      dispatch(getAction_confirmFilter())
    }
  }
  function addInListClick(e){
    setVisModal(true)
    setVisibleMenu(false)
  }
  async function toggleFavClick(e){
    fetchFav(!isFav)
  }
  function summaryClick(e){
    console.log(summaryClick.name + ": not work")
  }

  function renameList(e){
    setNewListName(tables.find(table=>table.lid === idTable).name)
    setVisModal(true)
    setVisibleMenu(false)
  }

  function cancelRename(e){
    setVisModal(false)
  }
  function confirmRename(e){

    let newTables = tables.map(table=>{
      if(table.lid === idTable) table.name = newListName
      return table
    })

    dispatch(getAction_setTable(newTables))
    ServerService.fromDB.setLists(newTables)
      .then(res=>console.log(res))
    setVisModal(false)
  }

  const [visibleMenu, setVisibleMenu] = useState(false)
  const stylesMenu = [cls.edit]
  if(visibleMenu) stylesMenu.push(cls.vis)
  else            stylesMenu.push(cls.invis)

  return (
    <>
      <div  className={stylesMenu.join(" ")}>
        {isLoadingFav
          ? <Loader/>
          : <div className={cls.btns}>
              {editOptions.deleteBtn && <BtnIco img={imgD} cb={deleteClick} isAnimStyle={true}/>}
              {editOptions.listBtn && <BtnIco img={imgL} cb={addInListClick} isAnimStyle={true}/>}
              {editOptions.favBtn && <BtnIco img={imgF} cb={toggleFavClick} isAnimStyle={true} isActiveStyle={isFav}/>}
            </div>
        }
        <div  className={cls.summ}>
          {editOptions.summBtn && <BtnIco img={imgW} cb={summaryClick} isAnimStyle={true}/>}
          {areLists && <BtnIco img={imgW} cb={renameList} isAnimStyle={true}/>}
        </div>
      </div>

      <BtnCorner cbR={editClick} cbL={editOptions.order ? e=>drugControl.start(e) : editClick} cornerN={2}/>

      <Modal vis={visModal} setVis={setVisModal}>
        {areLists
          ? <div className={cls.modal}>
              <div className={cls.input}>
                <InputC  type="text" value={newListName} onChange={e=>setNewListName(e.target.value)}/>
              </div>

              <div className={cls.btns}>
                <BtnIco img={imgP} cb={confirmRename} isAnimStyle={true} prtClass={cls.btn}/>
                <BtnIco img={imgD} cb={cancelRename} isAnimStyle={true} prtClass={cls.btn}/>
              </div>
            </div>
          : <div>
              LISTS
            </div>
        }
      </Modal>
    </>
  );
};

export default ContentTableControlMenu;