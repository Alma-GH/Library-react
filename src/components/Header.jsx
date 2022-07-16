import React, {useEffect} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import cls from "../style/main/Header.module.scss"
import {
  HEAD_NAME,
  LINK_ADD,
  LINK_AUTH,
  LINK_HOME, LINK_INFO,
  LINK_LIBRARY_ALL,
  LINK_LIBRARY_FAV,
  LINK_LIBRARY_LISTS, LINK_LIBRARY_SUMMARY, LINK_OPTIONS
} from "../tools/utils/const";
import BtnIco from "./UI/BtnIco";
import imgQ from "../assets/imgs/question.png"
import imgT from "../assets/imgs/theme.png"
import imgG from "../assets/imgs/gear.png"
import imgO from "../assets/imgs/out.png"
import BtnLink from "./UI/BtnLink";
import {useDispatch, useSelector} from "react-redux";
import {getAction_setHint} from "../store/reducers/modalData";
import {getAction_setHeadTitle} from "../store/reducers/globalReducer";

const Header = ({prtClass}) => {

  const dispatch = useDispatch()
  const head = useSelector(state=>state.global.headTitle)
  const path = useLocation().pathname

  useEffect(()=>{
    if(path in HEAD_NAME) dispatch(getAction_setHeadTitle(HEAD_NAME[path]))
    else if(path.startsWith(LINK_INFO) || path.startsWith(LINK_LIBRARY_SUMMARY))
                            dispatch(getAction_setHeadTitle(HEAD_NAME[path.slice(0,path.lastIndexOf("/"))]))
    else if(!path.startsWith(LINK_LIBRARY_LISTS))   dispatch(getAction_setHeadTitle(""))

  }, [path])


  function questionClick(e){
    dispatch(getAction_setHint(path.startsWith(LINK_LIBRARY_SUMMARY)? -1 :1))
  }
  function themeClick(e){
    console.log("btn")
  }
  function optionsClick(e){
    console.log("btn")
  }


  const styles = [cls.head]
  if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>

      <div className={cls.links}>
        <NavLink to={LINK_HOME}>H</NavLink>
        <NavLink to={LINK_ADD}>Поиск</NavLink>
        Моя библиотека:
        <NavLink to={LINK_LIBRARY_ALL}>Все</NavLink> /
        <NavLink to={LINK_LIBRARY_LISTS}>Списки</NavLink> /
        <NavLink to={LINK_LIBRARY_FAV}>Избранное</NavLink> /
      </div>

      <h3>
        {head}
      </h3>

      <div className={cls.menu}>
        <BtnIco img={imgQ} cb={questionClick} isAnimStyle={true}/>
        <BtnIco img={imgT} cb={themeClick} isAnimStyle={true}/>
        <BtnLink link={LINK_OPTIONS} img={imgG} cb={optionsClick} isAnimStyle={true}/>

        <BtnLink link={LINK_AUTH} img={imgO} isAnimStyle={true}/>
      </div>

    </div>
  );
};

export default Header;