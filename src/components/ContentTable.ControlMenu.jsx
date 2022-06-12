import React, {useContext, useEffect, useRef, useState} from 'react';
import cls from "../style/main/ContentTable.module.scss";
import BtnIco from "./UI/BtnIco";

import imgD from "../assets/imgs/cancel.png"
import imgL from "../assets/imgs/list.png";
import imgF from "../assets/imgs/star.png";
import imgW from "../assets/imgs/edit.png";

import BtnCorner from "./UI/BtnCorner";
import {useDispatch, useSelector} from "react-redux";
import ServerService from "../tools/Services/ServerService";
import {getAction_confirmFilter} from "../store/reducers/filterReducer";
import {getAction_setTable} from "../store/reducers/tableReducer";
import Loader from "./UI/Notifications/Loader";
import {useFavourite} from "../hooks/useFavourite";
import {SearchContext} from "../context/SearchContext";
import {
  getAction_setBodyModal,
  getAction_setIdInModal,
  getAction_setNewNameList,
  getAction_setOptionsLists,
  getAction_setSelectedLists,
  getAction_setVisModal
} from "../store/reducers/modalData";
import {useNavigate} from "react-router-dom";
import {LINK_LIBRARY_SUMMARY} from "../tools/utils/const";
import {createMyTimer} from "../tools/utils/wrappers";

const ContentTableControlMenu = ({drugControl, idTable}) => {

  const {areLists} = useContext(SearchContext)

  const nav = useNavigate()

  const dispatch = useDispatch()

  const sizeBlock = useSelector(state=>state.table.items.size)
  const tables = useSelector(state=>state.table.items.arr)
  const editOptions = useSelector(state=>state.table.items.edit)

  const [isFav,fetchFav, fetchListMembership, isLoadingFav, err] = useFavourite(idTable)

  const [timer,setTimer] = useState(null)


  function editClick(e){
    e.preventDefault()

    if(!visibleMenu && !areLists){
      fetchListMembership()
    }
    if(timer) clearTimeout(timer)
    setTimer(setTimeout(()=>setVisibleMenu(false),10000))
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
    dispatch(getAction_setIdInModal(idTable))
    dispatch(getAction_setBodyModal(2))
    setVisibleMenu(false)


    const [allLists] = await ServerService.fromDB.getAllLists()
    const listsByWork = await ServerService.fromDB.getListsByWorkId(idTable)
    dispatch(getAction_setSelectedLists(
      listsByWork.map(list=>({...list, idSelect:idTable}))
    ))
    dispatch(getAction_setOptionsLists(
      allLists.map(list=>({...list, idSelect:idTable}))
    ))

    dispatch(getAction_setVisModal(true))
  }
  async function toggleFavClick(e){
    fetchFav(!isFav)
  }
  function summaryClick(e){
    nav(LINK_LIBRARY_SUMMARY + "/" + idTable)
  }

  function renameList(e){
    dispatch(getAction_setIdInModal(idTable))
    dispatch(getAction_setBodyModal(1))
    dispatch(getAction_setNewNameList(tables.find(table=>table.lid === idTable).name))
    setVisibleMenu(false)
    dispatch(getAction_setVisModal(true))
  }

  useEffect(()=>{

  }, [])


  const [visibleMenu, setVisibleMenu] = useState(false)
  const stylesMenu = [cls.edit]
  if(sizeBlock<100) stylesMenu.push(cls.large)
  if(visibleMenu) stylesMenu.push(cls.vis)
  else            stylesMenu.push(cls.invis)

  return (
    <>
      <div className={stylesMenu.join(" ")}>
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
    </>
  );
};

export default ContentTableControlMenu;