import React from 'react';
import Loader from "./UI/Notifications/Loader";
import cls from "../style/main/ContentTable.module.scss";
import BtnIco from "./UI/BtnIco";
import imgD from "../assets/imgs/cancel.png";
import imgL from "../assets/imgs/list.png";
import imgF from "../assets/imgs/star.png";
import imgW from "../assets/imgs/edit.png";
import {useFavourite} from "../hooks/useFavourite";
import {getAction_setTable} from "../store/reducers/tableReducer";
import ServerService from "../tools/Services/ServerService";
import {getAction_confirmFilter} from "../store/reducers/filterReducer";

const RedactMenu = ({isTable, delF, addF}) => {



  return (
    <div>
      {isLoadingSetFav || isLoadingMembership
        ? <Loader/>
        : <div className={cls.btns}>
            <BtnIco img={imgD} cb={deleteClick} isAnimStyle={true}/>
            <BtnIco img={imgL} cb={addInListClick} isAnimStyle={true}/>
            <BtnIco img={imgF} cb={toggleFavClick} isAnimStyle={true} isActiveStyle={isFav}/>
          </div>
      }
      <div className={cls.summ}>
        <BtnIco img={imgW} cb={summaryClick} isAnimStyle={true}/>
      </div>
    </div>
  );
};

export default RedactMenu;