import React from 'react';
import Loader from "./UI/Notifications/Loader";
import ContentTable from "./ContentTable";
import cls from "../style/main/ContentBlock.module.scss";
import ErrorMessage from "./UI/Notifications/ErrorMessage";
import {useDispatch, useSelector} from "react-redux";
import {Reorder, AnimatePresence} from "framer-motion";
import {getAction_clearTable, getAction_setTable} from "../store/reducers/tableReducer";

const ContentBody = () => {

  const dispatch = useDispatch()

  const tables = useSelector(state=>state.table.items.arr)
  const tablesIsLoading = useSelector(state=>state.table.items.loading)
  const tablesErr = useSelector(state=>state.table.items.error)

  function setTables(tables){
    //TODO: send order on DB(here or use useEffect)
    dispatch(getAction_setTable(tables))
  }


  if(tablesIsLoading) return <Loader/>
  if(tablesErr.err) return <ErrorMessage message={tablesErr.message} prefix="ERROR FOUND"/>
  return (
    <Reorder.Group as="ol" axis="y" values={tables} onReorder={setTables} layoutScroll style={{overflowY: "scroll", height:"100%" }}>
      <AnimatePresence>
        {tables.length
          ?   tables.map(table=>
                <ContentTable key={table.id} isEditable={true} content={table} prtClass={cls.block}/>
              )
          :   <h2>Ничего не найдено</h2>
        }
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default ContentBody;