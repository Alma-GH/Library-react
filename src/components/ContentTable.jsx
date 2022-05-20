import React from 'react';
import cls from "../style/main/ContentTable.module.scss";
import imgTest from "../assets/imgs/plus.png";
import {NavLink} from "react-router-dom";
import {LINK_INFO} from "../tools/utils/const";
import {Reorder, useDragControls} from "framer-motion";
import ContentTableControlMenu from "./ContentTable.ControlMenu";
import {useSelector} from "react-redux";

const ContentTable = ({prtClass, content}) => {

  const {id,img,title,author,publish} = content

  const controls = useDragControls()

  const editMenu = useSelector(state=>state.table.items.edit.menu)


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

      {editMenu &&
        <ContentTableControlMenu drugControl={controls} idTable={id}/>
      }
    </Reorder.Item>
  );
};

export default ContentTable;