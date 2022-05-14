import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import cls from "./../../style/Pages/InfoPage.module.scss"
import BtnIco from "../UI/BtnIco";
import imgA from "../../assets/imgs/plus.png"
import imgS from "../../assets/imgs/star.png"
import BookAPI from "../../tools/Services/BookAPI";
import {useDispatch, useSelector} from "react-redux";
import {getAction_setInfo} from "../../store/reducers/tableReducer";
import ServerService from "../../tools/Services/ServerService";
import {useFetching} from "../../hooks/useFetching";
import Loader from "../UI/Notifications/Loader";

const InfoPage = ({prtClass}) => {

  const dispatch = useDispatch()
  const page = useSelector(state=>state.table.info)

  const params = useParams()
  const KEY = params.page

  const [isAdded, setIsAdded] = useState(true)
  const [fetchWork, isLoadingSetWorks, errSetWorks] = useFetching(async()=>{
    const res = await ServerService.fromDB.setWork({
      wid:KEY,
      ...page
    })
    setIsAdded(true)
    console.log(res)
  })

  useEffect(()=>{
    async function takeInfo(){
      dispatch(getAction_setInfo({}))
      const dataWork = await ServerService.fromAPI.getWorkByKey(KEY)
      console.log({dataWork})
      dispatch(getAction_setInfo({...dataWork}))
    }
    async function takeIsAdded(){
      const [works, num] = await ServerService.fromDB.getWorksByFilter()
      setIsAdded(works.some(work=>KEY===work.id))
    }
    takeInfo()
    takeIsAdded()
  }, [])


  async function addWorkInLibrary(e){
    fetchWork()
  }

  async function addWorkInFav(e){
    console.log(addWorkInFav.name + ": NOT WORK")
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
              <BtnIco img={imgS} cb={addWorkInFav}/>
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