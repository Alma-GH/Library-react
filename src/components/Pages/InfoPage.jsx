import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import cls from "./../../style/Pages/InfoPage.module.scss"
import BtnIco from "../UI/BtnIco";
import imgA from "../../assets/imgs/plus.png"
import imgS from "../../assets/imgs/star.png"
import imgP from "../../assets/imgs/list.png"
import {useDispatch, useSelector} from "react-redux";
import {getAction_setInfo} from "../../store/reducers/tableReducer";
import ServerService from "../../tools/Services/ServerService";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../UI/Notifications/Loader";
import {useFavourite} from "../../hooks/useFavourite";
import {
  getAction_setBodyModal,
  getAction_setIdInModal, getAction_setOptionsLists,
  getAction_setSelectedLists, getAction_setVisModal
} from "../../store/reducers/modalData";

const InfoPage = ({prtClass}) => {

  const dispatch = useDispatch()
  const page = useSelector(state=>state.table.info)

  const params = useParams()
  const KEY = params.page

  const [isAdded, setIsAdded] = useState(true)
  const [isFav,toggleFav,initFav,isLoadingFav, errFav] = useFavourite(KEY)

  const [fetchWork, isLoadingSetWorks, errSetWorks] = useFetching(async()=>{
    const res = await ServerService.fromDB.addWork({
      ...page,
      id:KEY,
      author:page.author.name,
    })
    setIsAdded(true)
  })

  const [takeInfo, isLoadingInfo, errInfo] = useFetching(async ()=>{

    //set info
    dispatch(getAction_setInfo({}))
    const dataWork = await ServerService.fromAPI.getWorkByKey(KEY)
    dispatch(getAction_setInfo({...dataWork}))

    //set buttons
    const [works, num] = await ServerService.fromDB.getWorksByFilter()
    setIsAdded(works.some(work=>KEY===work.id))

    await initFav()

  })

  useEffect(()=>{
    takeInfo()
  }, [])


  async function addWorkInLibrary(e){
    fetchWork()
  }

  async function addInList(e){
    //TODO: remove code duplication(mb create func(dispatch, id) || create new component BtnIco.AddInList)
    dispatch(getAction_setIdInModal(KEY))
    dispatch(getAction_setBodyModal(2))

    const [allLists] = await ServerService.fromDB.getAllLists()
    const listsByWork = await ServerService.fromDB.getListsByWorkId(KEY)
    dispatch(getAction_setSelectedLists(
      listsByWork.map(list=>({...list, idSelect:KEY}))
    ))
    dispatch(getAction_setOptionsLists(
      allLists.map(list=>({...list, idSelect:KEY}))
    ))

    dispatch(getAction_setVisModal(true))
  }

  async function toggleWorkFav(e){
    if(!isAdded) await fetchWork()
    toggleFav()
  }



  const styles = [cls.info]
  if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>

      <div className={cls.wrapCover}>
        <div className={cls.cover}>
          <img src={page.img} alt=""/>
        </div>
      </div>


      <div className={cls.btns}>
        {isLoadingSetWorks || isLoadingFav || isLoadingInfo
          ? <Loader/>
          : <>
              {isAdded
                ? <BtnIco img={imgP} cb={addInList} isAnimStyle={true}/>
                : <BtnIco img={imgA} cb={addWorkInLibrary} isAnimStyle={true}/>
              }
              <BtnIco img={imgS} cb={toggleWorkFav} isActiveStyle={isFav} isAnimStyle={true}/>
            </>
        }
      </div>


      <div className={cls.text}>
        {isLoadingInfo
          ? <Loader/>
          : <>
              <h2>{page.title}</h2>
              <h3>Author: {page.author?.name}</h3>
              <h3>Subjects: {page.subjects}</h3>

              <p>
                {page.description}
              </p>
            </>
        }
      </div>

      <div className={cls.link}>
        <a href={page.url}>MORE</a>
      </div>

    </div>
  );
};

export default InfoPage;