import React from 'react';
import Loader from "./UI/Notifications/Loader";
import cls from "../style/main/ContentTable.module.scss";
import BtnIco from "./UI/BtnIco";
import imgD from "../assets/imgs/cancel.png";
import imgL from "../assets/imgs/list.png";
import imgF from "../assets/imgs/star.png";
import imgW from "../assets/imgs/edit.png";

const RedactMenu = ({isTable, delF, addF}) => {



  return (
    <>
      {isLoadingFav
        ? <Loader/>
        : <div className={cls.btns}>
          {editOptions.deleteBtn && <BtnIco img={imgD} cb={deleteClick} isAnimStyle={true}/>}
          {editOptions.listBtn && <BtnIco img={imgL} cb={addInListClick} isAnimStyle={true}/>}
          {editOptions.favBtn && <BtnIco img={imgF} cb={toggleFavClick} isAnimStyle={true} isActiveStyle={isFav}/>}
        </div>
      }
      <div  className={cls.summ}>
        {editOptions.summBtn && <BtnIco img={imgW} cb={summaryClick} isAnimStyle={true}/>}
        {areLists && <BtnIco img={imgW} cb={renameList} isAnimStyle={true}/>}
      </div>
    </>
  );
};

export default RedactMenu;