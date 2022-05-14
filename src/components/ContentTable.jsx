import React, {useState} from 'react';
import cls from "../style/main/ContentTable.module.scss";
import imgTest from "../assets/imgs/plus.png";
import {NavLink} from "react-router-dom";
import {LINK_INFO} from "../tools/utils/const";
import BtnCorner from "./UI/BtnCorner";
import {useDragControls} from "framer-motion";
import {Reorder} from "framer-motion";


const ContentTable = ({prtClass, content, isEditable}) => {

  const {id,img,title,author,publish} = content

  const controls = useDragControls()

  function editClick(e){
    e.preventDefault()
    setVisibleMenu(!visibleMenu)
  }



  //styles
  const varsAnimation = {
    initial: {
      opacity:0,
    },
    animate:{
      opacity: 1,
    },
    exit:{
      opacity:0,
    }
  }

  const [visibleMenu, setVisibleMenu] = useState(false)
  const stylesMenu = [cls.edit]
  if(visibleMenu) stylesMenu.push(cls.vis)
  else            stylesMenu.push(cls.invis)

  const styles = [cls.block]
  if(prtClass) styles.push(prtClass)

  return (
    <Reorder.Item
      className={styles.join(" ")}
      value={content}
      dragListener={false}
      dragControls={controls}
      {...varsAnimation}

    >
      <div className={cls.cover}>
        {img
          ?<img src={img} alt="IMG"/>
          :<img src={imgTest} alt="NONE"/>
        }
      </div>

      <div className={cls.text}>
        <h2>{title}</h2>
        {author && <>Author: {author}<br/></>}
        {publish && <>First publish: {publish}<br/></>}
        <NavLink to={ LINK_INFO + `/${id}`}>link</NavLink>
      </div>

      {isEditable &&
        <>
          <div className={stylesMenu.join(" ")}>
            edit
          </div>

          <BtnCorner cbR={editClick} cbL={e=>controls.start(e)} cornerN={2}/>
        </>
      }
    </Reorder.Item>
  );
};

export default ContentTable;