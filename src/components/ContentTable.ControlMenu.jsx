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

const ContentTableControlMenu = ({drugControl, idTable}) => {

  const dispatch = useDispatch()

  const tables = useSelector(state=>state.table.items.arr)

  const [isFav, setIsFav] = useState(null)

  const [fetchFav, isLoadingSetFav, errSetFav] = useFetching(async(addThis)=>{
    if(addThis){
      await ServerService.fromDB.addFav(idTable)
      setIsFav(true)
    }else{
      await ServerService.fromDB.deleteFav(idTable)
      setIsFav(false)
    }

  })
  const [fetchListMembership, isLoadingMembership, errMembership] = useFetching(async ()=>{
    const favs = await ServerService.fromDB.getAllFavId()
    setIsFav(favs.some(fav=>fav===idTable))
  })



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
        {isLoadingSetFav || isLoadingMembership
          ? <Loader/>
          : <div className={cls.btns}>
              <BtnIco img={imgD} cb={deleteClick} isAnimStyle={true}/>
              <BtnIco img={imgL} cb={addInListClick} isAnimStyle={true}/>
              <BtnIco img={imgF} cb={toggleFavClick} isAnimStyle={true} isActiveStyle={isFav}/>
            </div>
        }
        <div className={cls.summ}>
          <BtnIco img={imgW} cb={summaryClick} isAnimStyle={true}/>
        </div>
      </div>

      <BtnCorner cbR={editClick} cbL={e=>drugControl.start(e)} cornerN={2}/>
    </>
  );
};

export default ContentTableControlMenu;