import React, {useContext} from 'react';
import Loader from "./UI/Notifications/Loader";
import ContentTable from "./ContentTable";
import cls from "../style/main/ContentBlock.module.scss";
import ErrorMessage from "./UI/Notifications/ErrorMessage";
import {useDispatch, useSelector} from "react-redux";
import {AnimatePresence, Reorder} from "framer-motion";
import {getAction_setTable} from "../store/reducers/tableReducer";
import {updateOrderWorksThrottle} from "../tools/utils/func";
import {SearchContext} from "../context/SearchContext";
import ContentTableList from "./ContentTableList";

const ContentBody = () => {

  const {areLists} = useContext(SearchContext)
  const {updateOrderFunc} = useContext(SearchContext)

  const dispatch = useDispatch()

  const tables = useSelector(state=>state.table.items.arr)
  const tablesIsLoading = useSelector(state=>state.table.items.loading)
  const tablesErr = useSelector(state=>state.table.items.error)

  const countSearch = useSelector(state=>state.filter.countSearch)

  function setTables(tables){


    updateOrderFunc(tables)
      .then(res=>console.log("UPDATE TABLES"))


    console.log("REORDER")
    dispatch(getAction_setTable(tables))
  }

  if(!countSearch) return <h2>Начните поиск</h2>
  if(tablesIsLoading) return <Loader/>
  if(tablesErr.err) return <ErrorMessage message={tablesErr.message} prefix="ERROR FOUND"/>

  return (
    <Reorder.Group as="ol" axis="y" values={tables} onReorder={setTables} layoutScroll style={{overflowY: "scroll", height:"100%" }}>
      <AnimatePresence>
        {tables.length
          ?   tables.map(table=> {
                if(!areLists) return <ContentTable key={table.id || table.lid} content={table} prtClass={cls.block}/>
                else          return <ContentTableList key={table.id || table.lid} content={table} prtClass={cls.block} />
              })
          :   <h2>Ничего не найдено</h2>
        }
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default ContentBody;