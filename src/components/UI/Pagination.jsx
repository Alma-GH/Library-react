import React from 'react';
import cls from "./../../style/UI/Pagination.module.scss"
import {useDispatch} from "react-redux";
import {usePagination} from "../../hooks/usePagination";
import {getAction_setPage} from "../../store/reducers/pageReducer";

const Pagination = ({countPages, view, current}) => {

  const dispatch = useDispatch()

  const [cur, setCur, pagesNum] = usePagination(countPages,view)

  function setPage(page){
    dispatch(getAction_setPage(page))
  }

  function getBtn(visCond, setter, sign){
    return (
      <div
        style={{visibility:visCond?"visible":"hidden"}}
        className={cls.block}
        onClick={()=>setCur(setter)}
      >
        {sign}
      </div>
    )
  }


  return (
    <div className={cls.line}>
      {getBtn(cur!==1, prevState => prevState-view>=1 ? prevState-view : 1, "<")}

        {pagesNum.map(n=>
          <div onClick={()=>setPage(n)} key={n} className={current===n?`${cls.block} ${cls.current}`:`${cls.block}`}>
            {(n>99 ?".":"") + (n).toString().slice(-2)}
          </div>)
        }

      {getBtn(countPages - cur >= view, prevState => prevState + view, ">")}
    </div>
  );
};

export default Pagination;