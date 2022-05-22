import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {getAction_confirmFilter, getAction_setLanguage} from "../store/reducers/filterReducer";
import {getAction_setTable} from "../store/reducers/tableReducer";
import {useFetching} from "../hooks/useFetching";
import Loader from "./UI/Notifications/Loader";
import {useFavourite} from "../hooks/useFavourite";
import {SearchContext} from "../context/SearchContext";
import Modal from "./UI/Modal";
import InputC from "./UI/InputC";
import {tab} from "@testing-library/user-event/dist/tab";
import SelectC from "./UI/SelectC";
import {
  getAction_setNewNameList, getAction_setOptionsLists,
  getAction_setSelectedLists,
  getAction_setSelectList,
  getAction_setTipsList
} from "../store/reducers/modalData";
import SelectSearchC from "./UI/SelectSearchC";
import {Multiselect} from "multiselect-react-dropdown";

const ContentTableControlMenu = ({drugControl, idTable}) => {

  const {areLists} = useContext(SearchContext)

  const dispatch = useDispatch()

  const tables = useSelector(state=>state.table.items.arr)
  const editOptions = useSelector(state=>state.table.items.edit)

  const modalListName = useSelector(state=>state.modal.newNameList)

  const modalOptionsLists = useSelector(state=>state.modal.optionsLists)
  const modalSelectedLists = useSelector(state=>state.modal.selectedLists)

  const [isFav,fetchFav, fetchListMembership, isLoadingFav, err] = useFavourite(idTable)

  const [visModal, setVisModal] = useState(false)

  const [fetchList, isLoadingList, errList] = useFetching(async (listItem, isDelete)=>{

    const [allLists] = await ServerService.fromDB.getAllLists()
    const resFromServer = await ServerService.fromDB.setLists(allLists.map(list=>{
      if(list.lid === listItem.lid){
        if(isDelete) list.wids = list.wids.filter(id=>id!==idTable)
        else         list.wids = list.wids ? [...list.wids, idTable] : [idTable]
      }
      return list
    }))
    console.log({resFromServer})
  })


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
  async function addInListClick(e){
    setVisibleMenu(false)


    const [allLists] = await ServerService.fromDB.getAllLists()
    const listsByWork = await ServerService.fromDB.getListsByWorkId(idTable)
    dispatch(getAction_setSelectedLists(listsByWork.map((list,ind)=>({...list, name:ind+") "+list.name, idSelect:idTable}))))
    dispatch(getAction_setOptionsLists(allLists.map((list,ind)=>({...list, name:ind+") "+list.name, idSelect:idTable}))))

    setVisModal(true)
  }
  async function toggleFavClick(e){
    fetchFav(!isFav)
  }
  function summaryClick(e){
    console.log(summaryClick.name + ": not work")
  }

  function renameList(e){
    dispatch(getAction_setNewNameList(tables.find(table=>table.lid === idTable).name))
    setVisModal(true)
    setVisibleMenu(false)
  }

  function cancelRename(e){
    setVisModal(false)
  }
  function confirmRename(e){

    if(!modalListName){
      console.log("Пустой ввод имени")
      setVisModal(false)
      return
    }

    let newTables = tables.map(table=>{
      if(table.lid === idTable) table.name = modalListName
      return table
    })

    dispatch(getAction_setTable(newTables))
    ServerService.fromDB.setLists(newTables)
      .then(res=>console.log(res))
    setVisModal(false)
  }

  function addSelectedList(selectedList, selectedItem){
    fetchList(selectedItem, false)
    dispatch(getAction_setSelectedLists(selectedList))
  }
  function deleteFromList(selectedList, removedItem){


    fetchList(removedItem, true)
    dispatch(getAction_setSelectedLists(selectedList))
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
          ? <div className={cls.modal1}>
              <div className={cls.input}>
                <InputC  type="text" value={modalListName} onChange={e=>dispatch(getAction_setNewNameList(e.target.value))}/>
              </div>

              <div className={cls.btns}>
                <BtnIco img={imgP} cb={confirmRename} isAnimStyle={true} prtClass={cls.btn}/>
                <BtnIco img={imgD} cb={cancelRename} isAnimStyle={true} prtClass={cls.btn}/>
              </div>
            </div>
          : <div className={cls.modal2}>
                <Multiselect
                  options={[...modalOptionsLists]}
                  selectedValues={[...modalSelectedLists]}
                  displayValue="name"
                  id={idTable}
                  isObject={true}
                  placeholder="LIST"
                  onSelect={addSelectedList}
                  onRemove={deleteFromList}
                  loading={isLoadingList}
                />
            </div>
        }
      </Modal>
    </>
  );
};

export default ContentTableControlMenu;