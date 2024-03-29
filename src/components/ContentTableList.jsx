import React, {useState} from 'react';
import {Reorder, useDragControls} from "framer-motion";
import cls from "../style/main/ContentTable.module.scss";
import ContentTableControlMenu from "./ContentTable.ControlMenu";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {LINK_LIBRARY_LISTS} from "../tools/utils/const";
import {getAction_setHeadTitle} from "../store/reducers/globalReducer";

const ContentTableList = ({prtClass, content}) => {

  const {lid,name} = content

  const nav = useNavigate()

  const dispatch = useDispatch()

  const controls = useDragControls()
  const sizeBlock = useSelector(state=>state.table.items.size)
  const editMenu = useSelector(state=>state.table.items.edit.menu)

  const [isDownClick, setIsDownClick] = useState(null)

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
  if(sizeBlock>100) styles.push(cls.large)
  else if(sizeBlock<100) styles.push(cls.small)
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
        setIsDownClick(false)
      }}
      onPointerDown={e=>{
        if(e.target === e.currentTarget)
          setIsDownClick(true)
      }}

      onClick={e=>{
        if(e.target === e.currentTarget && isDownClick){
          nav(LINK_LIBRARY_LISTS + "/" + lid)
          dispatch(getAction_setHeadTitle(name))
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