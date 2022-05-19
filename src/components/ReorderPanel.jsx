import React, {useContext, useState} from 'react';
import cls from "../style/main/InputBlock.module.scss";
import SelectC from "./UI/SelectC";
import {T_AUTHOR, T_PUBLISH, T_TITLE} from "../tools/utils/const";
import BtnIco from "./UI/BtnIco";
import imgS from "../assets/imgs/sort.png";
import imgE from "../assets/imgs/edit.png";
import {
  getAction_reverseTables,
  getAction_setEditableTable,
  getAction_setSort,
  getAction_sortTables
} from "../store/reducers/tableReducer";
import {useDispatch, useSelector} from "react-redux";
import {SearchContext} from "../context/SearchContext";

const ReorderPanel = ({disabled}) => {

  const {isEdit} = useContext(SearchContext)
  const dispatch = useDispatch()

  const editable = useSelector(state=>state.table.items.editable)

  const [sort, setSort] = useState('')

  function selectSort(e){
    const newSort = e.target.value
    dispatch(getAction_setSort(newSort))
    dispatch(getAction_sortTables())
    setSort(newSort)
  }

  function editTables(e){
    e.preventDefault()
    dispatch(getAction_setEditableTable(!editable))
  }
  function reverseTables(e){
    e.preventDefault();
    dispatch(getAction_reverseTables())
  }

  return (
    <div className={cls.sortBlock}>
      <SelectC
        id="sort" prtClass={cls.selectSort} value={sort} onChange={selectSort} disabled={disabled}
        defaultVal="Сортировка"
        options={[
          {value:T_TITLE, name:"Название"},
          {value:T_AUTHOR, name:"Автор"},
          {value:T_PUBLISH, name:"Год появления"},
        ]}
      />
      <div className={cls.btns}>
        <BtnIco img={imgS} cb={reverseTables}/>
        {isEdit && <BtnIco img={imgE} cb={editTables} isActiveStyle={editable}/>}
      </div>

    </div>
  );
};

export default ReorderPanel;