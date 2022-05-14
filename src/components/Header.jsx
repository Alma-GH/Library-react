import React from 'react';
import {NavLink} from "react-router-dom";
import cls from "../style/main/Header.module.scss"
import {LINK_AUTH, LINK_FIND, LINK_HOME, LINK_LIBRARY} from "../tools/utils/const";
import BtnIco from "./UI/BtnIco";
import imgQ from "../assets/imgs/question.png"
import imgT from "../assets/imgs/theme.png"
import imgG from "../assets/imgs/gear.png"
import imgO from "../assets/imgs/out.png"
import BtnLink from "./UI/Compounds/BtnLink";

const Header = ({prtClass}) => {

  const styles = [cls.head]
  if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>

      <div className={cls.links}>
        <NavLink to={LINK_HOME}>H</NavLink>
        <NavLink to={LINK_FIND}>Поиск</NavLink>
        <NavLink to={LINK_LIBRARY}>Моя библиотека</NavLink>
      </div>

      <div className={cls.menu}>
        <BtnIco img={imgQ} cb={()=>console.log("btn")} isAnimStyle={true}/>
        <BtnIco img={imgT} cb={()=>console.log("btn")} isAnimStyle={true}/>
        <BtnIco img={imgG} cb={()=>console.log("btn")} isAnimStyle={true}/>

        <BtnLink link={LINK_AUTH} img={imgO} isAnimStyle={true}/>
      </div>

    </div>
  );
};

export default Header;