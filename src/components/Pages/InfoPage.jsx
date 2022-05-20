import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import cls from "./../../style/Pages/InfoPage.module.scss"
import BtnIco from "../UI/BtnIco";
import imgA from "../../assets/imgs/plus.png"
import imgS from "../../assets/imgs/star.png"
import {useDispatch, useSelector} from "react-redux";
import {getAction_setInfo} from "../../store/reducers/tableReducer";
import ServerService from "../../tools/Services/ServerService";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../UI/Notifications/Loader";
import {useFavourite} from "../../hooks/useFavourite";

const InfoPage = ({prtClass}) => {

  const dispatch = useDispatch()
  const page = useSelector(state=>state.table.info)

  const params = useParams()
  const KEY = params.page

  const [isAdded, setIsAdded] = useState(true)
  const [fetchWork, isLoadingSetWorks, errSetWorks] = useFetching(async()=>{
    const res = await ServerService.fromDB.addWork({
      ...page,
      id:KEY,
      author:page.author.name,
    })
    setIsAdded(true)
    console.log(res)
  })

  const [isFav,fetchFav,fetchListMembership,isLoadingFav, errFav] = useFavourite(KEY)

  useEffect(()=>{
    async function takeInfo(){
      dispatch(getAction_setInfo({}))
      const dataWork = await ServerService.fromAPI.getWorkByKey(KEY)
      console.log({dataWork})
      dispatch(getAction_setInfo({...dataWork}))

      const [works, num] = await ServerService.fromDB.getWorksByFilter()
      setIsAdded(works.some(work=>KEY===work.id))

      fetchListMembership()
    }

    takeInfo()
  }, [])


  async function addWorkInLibrary(e){
    fetchWork()
  }

  async function toggleWorkFav(e){
    if(!isAdded) await fetchWork()
    fetchFav()
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
        {isLoadingSetWorks
          ? <Loader/>
          : <>
              {!isAdded && <BtnIco img={imgA} cb={addWorkInLibrary}/>}
              {isLoadingFav
                ?<Loader/>
                :<BtnIco img={imgS} cb={toggleWorkFav} isActiveStyle={isFav}/>
              }

            </>
        }
      </div>




      <div className={cls.text}>
        <h2>{page.title}</h2>
        <h3>Author: {page.author?.name}</h3>
        <h3>Subjects: {page.subjects}</h3>

        <p>
          {page.description}
        </p>
      </div>

      <div className={cls.link}>
        <a href={page.url}>LINK</a>
      </div>

    </div>
  );
};

export default InfoPage;