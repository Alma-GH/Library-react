import React from 'react';
import cls from "../style/main/InputBlock.module.scss";
import InputSearch from "./UI/InputSearch";
import {useDispatch, useSelector} from "react-redux";
import Pagination from "./UI/Pagination";
import {getTotalPages} from "../tools/utils/func.js";
import {
  getAction_confirmFilter,
  getAction_setCountSearch,
  getAction_setSearch,
  getAction_setVisFilter
} from "../store/reducers/filterReducer";
import ReorderPanel from "./ReorderPanel";
import CountPagesPanel from "./CountPagesPanel";
import ServerService from "../tools/Services/ServerService";
import imgOpen from "../assets/imgs/list.png"
import BtnIco from "./UI/BtnIco";

const InputBlock = ({prtClass}) => {


  const dispatch = useDispatch()

  const filterHide = useSelector(state=>state.filter.hide)

  const countSearch = useSelector(state=>state.filter.countSearch)
  const searchInput = useSelector(state=>state.filter.title)

  const page = useSelector(state=>state.page.currentPage)
  const limit = useSelector(state=>state.page.limit)
  const numWorks = useSelector(state=>state.page.all)

  const isLoading = useSelector(state=>state.table.items.loading)

  const api = useSelector(state=>state.filter.searchAPI)



  function setSearch(e){
    dispatch(getAction_setSearch(e.target.value))
  }


  function submit(e){

    e.preventDefault()
    if (isLoading) {console.log("NOT SUBMIT"); return}
    console.log("SUBMIT")

    dispatch(getAction_confirmFilter())
    dispatch(getAction_setCountSearch(countSearch+1))
  }

  function openFilter(){
    dispatch(getAction_setVisFilter(true))
  }


  const styles = [cls.inputS]
  if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>
      <form onSubmit={submit} className={cls.form}>
        <InputSearch prtClass={cls.inputBlock} val={searchInput} setVal={setSearch} disabledBTN={isLoading}/>

        <div style={{display: "flex", justifyContent:"space-between"}}>

          {filterHide &&
            <BtnIco cb={openFilter} img={imgOpen} isAnimStyle={true}/>
          }

          <ReorderPanel disabled={isLoading}/>

          {api === ServerService.ST_FROM_API &&
            <>
              <Pagination countPages={getTotalPages(numWorks,limit)} view={10} current={page}/>
              {numWorks!==null && <CountPagesPanel all={numWorks} onpage={limit} page={page}/>}
            </>
          }


        </div>


      </form>

    </div>
  );
};

export default InputBlock;