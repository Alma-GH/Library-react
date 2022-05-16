import React, {useState} from 'react';
import cls from "../style/main/ContentTable.module.scss";
import BtnIco from "./UI/BtnIco";

import imgD from "../assets/imgs/cancel.png"
import imgL from "../assets/imgs/list.png";
import imgF from "../assets/imgs/star.png";
import imgW from "../assets/imgs/edit.png";

import BtnCorner from "./UI/BtnCorner";
import {useDispatch} from "react-redux";
import ServerService from "../tools/Services/ServerService";
import {getAction_confirmFilter} from "../store/reducers/filterReducer";

const ContentTableControlMenu = ({drugControl, idTable}) => {

  const dispatch = useDispatch()

  function editClick(e){
    e.preventDefault()
    setVisibleMenu(!visibleMenu)
  }

  async function deleteClick(e){
    let resFromServer = await ServerService.fromDB.deleteWorkById(idTable)
    console.log({resFromServer})
    dispatch(getAction_confirmFilter())
  }
  function addInListClick(e){
    console.log(addInListClick.name + ": not work")
  }
  function addInFavClick(e){
    console.log(addInFavClick.name + ": not work")
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
        <div className={cls.btns}>
          <BtnIco img={imgD} cb={deleteClick} isAnimStyle={true}/>
          <BtnIco img={imgL} cb={addInListClick} isAnimStyle={true}/>
          <BtnIco img={imgF} cb={addInFavClick} isAnimStyle={true}/>
        </div>

        <div className={cls.summ}>
          <BtnIco img={imgW} cb={summaryClick} isAnimStyle={true}/>
        </div>
      </div>

      <BtnCorner cbR={editClick} cbL={e=>drugControl.start(e)} cornerN={2}/>
    </>
  );
};

export default ContentTableControlMenu;