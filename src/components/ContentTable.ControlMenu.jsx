import React, {useState} from 'react';
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
import {useFetching} from "../hooks/useFetching";
import Loader from "./UI/Notifications/Loader";
import {useFavourite} from "../hooks/useFavourite";

const ContentTableControlMenu = ({drugControl, idTable}) => {

  const dispatch = useDispatch()

  const tables = useSelector(state=>state.table.items.arr)

  const editOptions = useSelector(state=>state.table.items.edit)


  const [isFav,fetchFav, fetchListMembership, isLoadingFav, err] = useFavourite(idTable)

  function editClick(e){
    e.preventDefault()

    if(!visibleMenu){
      fetchListMembership()
    }

    setVisibleMenu(!visibleMenu)
  }

  async function deleteClick(e){
    try {
      dispatch(getAction_setTable(tables.filter(table=>table.id!==idTable)))
      let resFromServer = await ServerService.fromDB.deleteWorkById(idTable)
      console.log({resFromServer})
    }catch (e){
      console.log(e.message)
      dispatch(getAction_confirmFilter())
    }
  }
  function addInListClick(e){
    console.log(addInListClick.name + ": not work")
  }
  async function toggleFavClick(e){
    fetchFav(!isFav)
  }
  function summaryClick(e){
    console.log(summaryClick.name + ": not work")
  }



  const [visibleMenu, setVisibleMenu] = useState(false)
  const stylesMenu = [cls.edit]
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
        <div className={cls.summ}>
          {editOptions.summBtn && <BtnIco img={imgW} cb={summaryClick} isAnimStyle={true}/>}
        </div>
      </div>

      <BtnCorner cbR={editClick} cbL={editOptions.order ? e=>drugControl.start(e) : editClick} cornerN={2}/>
    </>
  );
};

export default ContentTableControlMenu;