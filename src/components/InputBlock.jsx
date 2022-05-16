import React, {useState} from 'react';
import cls from "../style/main/InputBlock.module.scss";
import InputSearch from "./UI/Compounds/InputSearch";
import {useDispatch, useSelector} from "react-redux";
import {getAction_reverseTables, getAction_setSort, getAction_sortTables} from "../store/reducers/tableReducer";
import BtnIco from "./UI/BtnIco";
import imgS from "../assets/imgs/sort.png"
import {T_AUTHOR, T_PUBLISH, T_TITLE} from "../tools/utils/const";
import Pagination from "./UI/Pagination";
import {getTotalPages} from "../tools/utils/func";
import SelectC from "./UI/SelectC";
import {getAction_confirmFilter, getAction_setCountSearch, getAction_setSearch} from "../store/reducers/filterReducer";

const InputBlock = ({prtClass}) => {

  const dispatch = useDispatch()

  const countSearch = useSelector(state=>state.filter.countSearch)
  const searchInput = useSelector(state=>state.filter.title)

  const page = useSelector(state=>state.page.currentPage)
  const limit = useSelector(state=>state.page.limit)
  const numWorks = useSelector(state=>state.page.all)

  const isLoading = useSelector(state=>state.table.items.loading)

  const [sort, setSort] = useState('')


  function setSearch(e){
    dispatch(getAction_setSearch(e.target.value))
  }

  function selectSort(e){
    const newSort = e.target.value
    dispatch(getAction_setSort(newSort))
    dispatch(getAction_sortTables())
    setSort(newSort)
  }

  function reverseTables(e){
    e.preventDefault();

    dispatch(getAction_reverseTables())
  }

  function submit(e){

    e.preventDefault()
    if (isLoading) {console.log("NOT SUBMIT"); return}
    console.log("SUBMIT")

    dispatch(getAction_confirmFilter())
    dispatch(getAction_setCountSearch(countSearch+1))
  }


  const styles = [cls.inputS]
  if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>
      <form onSubmit={submit} className={cls.form}>
        <InputSearch prtClass={cls.inputBlock} val={searchInput} setVal={setSearch} disabledBTN={isLoading}/>

        <div style={{display: "flex", justifyContent:"space-between"}}>
          <div className={cls.sortBlock}>
            <SelectC
              id="sort" prtClass={cls.selectSort} value={sort} onChange={selectSort} disabled={isLoading}
              defaultVal="Сортировка"
              options={[
                {value:T_TITLE, name:"Название"},
                {value:T_AUTHOR, name:"Автор"},
                {value:T_PUBLISH, name:"Год появления"},
              ]}
            />
            <BtnIco img={imgS} cb={reverseTables}/>
          </div>

          <Pagination countPages={getTotalPages(numWorks,limit)} view={10} current={page}/>

          {numWorks!==null && <div>Найдено:{numWorks} <br/> На странице: {limit} <br/> Страница: {page}</div>}

        </div>


      </form>

    </div>
  );
};

export default InputBlock;