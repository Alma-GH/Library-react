import React from 'react';
import {Reorder, useDragControls} from "framer-motion";
import cls from "../style/main/ContentTable.module.scss";
import imgTest from "../assets/imgs/plus.png";
import {NavLink} from "react-router-dom";
import {LINK_INFO} from "../tools/utils/const";
import ContentTableControlMenu from "./ContentTable.ControlMenu";

const ContentTableList = ({prtClass, content, isEditable}) => {

  const {lid,name} = content

  const controls = useDragControls()


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

  const styles = [cls.block, cls.blockList]
  if(prtClass) styles.push(prtClass)

  return (
    <Reorder.Item
      className={styles.join(" ")}
      value={content}
      dragListener={false}
      dragControls={controls}
      {...varsAnimation}

    >


      {name}

      {/*{isEditable &&*/}
      {/*<ContentTableControlMenu drugControl={controls} idTable={id}/>*/}
      {/*}*/}
    </Reorder.Item>
  );
};

export default ContentTableList;