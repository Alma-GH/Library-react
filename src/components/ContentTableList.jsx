import React, {useState} from 'react';
import {Reorder, useDragControls} from "framer-motion";
import cls from "../style/main/ContentTable.module.scss";
import ContentTableControlMenu from "./ContentTable.ControlMenu";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {getAction_setSearch} from "../store/reducers/filterReducer";

const ContentTableList = ({prtClass, content, isEditable}) => {

  const {lid,name} = content

  const nav = useNavigate()
  const path = useLocation().pathname

  const controls = useDragControls()

  const dispatch = useDispatch()

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

  const [hover, setHover] = useState("")
  const styles = [cls.block, cls.blockList, hover]
  if(prtClass) styles.push(prtClass)

  return (
    <Reorder.Item
      className={styles.join(" ")}
      value={content}
      dragListener={false}
      dragControls={controls}
      {...varsAnimation}
      onMouseOver={e=> {
        if(e.target === e.currentTarget){
          setHover(cls.hover)
        }

      }}
      onMouseOut={e=> {
        setHover("")
      }}
      onClick={e=>{
        if(e.target === e.currentTarget){
          nav(path + "/" + lid)
        }
      }}
    >


      {name}

      {editMenu &&
        <ContentTableControlMenu drugControl={controls} idTable={lid}/>
      }
    </Reorder.Item>
  );
};

export default ContentTableList;