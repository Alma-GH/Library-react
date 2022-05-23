import React from 'react';
import cls from "../../style/main/ContentTable.module.scss";
import InputC from "./InputC";
import {getAction_setNewNameList, getAction_setVisModal} from "../../store/reducers/modalData";
import BtnIco from "./BtnIco";
import imgP from "../../assets/imgs/plus.png";
import imgD from "../../assets/imgs/cancel.png";
import {useDispatch, useSelector} from "react-redux";
import {getAction_setTable} from "../../store/reducers/tableReducer";
import ServerService from "../../tools/Services/ServerService";
import {useFetching} from "../../hooks/useFetching";
import Loader from "./Notifications/Loader";

const ModalBody1 = () => {

  const dispatch = useDispatch()

  const idTable = useSelector(state=>state.modal.idTable)
  const tables = useSelector(state=>state.table.items.arr)
  const modalListName = useSelector(state=>state.modal.newNameList)

  const [fetchName, isLoadingName, errName] = useFetching(async ()=>{

    const renameTable = tables.find(table=>{
      if(table.lid === idTable) return table
    })

    const wids = renameTable?.wids
    const pos = tables.indexOf(renameTable)

    if(renameTable.name !== modalListName){
      await ServerService.fromDB.addNewList(modalListName,wids, pos)
      await ServerService.fromDB.deleteList(idTable)
    }

    const [newLists] = await ServerService.fromDB.getAllLists()

    dispatch(getAction_setTable(newLists))
  })

  function cancelRename(e){
    dispatch(getAction_setVisModal(false))
  }
  function confirmRename(e){

    if(!modalListName){
      console.log("Пустой ввод имени")
      dispatch(getAction_setVisModal(false))
      return
    }
    fetchName()
      .then(()=>dispatch(getAction_setVisModal(false)))

  }

  return (
    <div className={cls.modal1}>
      <div className={cls.input}>
        <InputC  type="text" value={modalListName} onChange={e=>dispatch(getAction_setNewNameList(e.target.value))}/>
      </div>

      {isLoadingName
        ? <Loader/>
        : <div className={cls.btns}>
            <BtnIco img={imgP} cb={confirmRename} isAnimStyle={true} prtClass={cls.btn}/>
            <BtnIco img={imgD} cb={cancelRename} isAnimStyle={true} prtClass={cls.btn}/>
          </div>
      }

    </div>
  );
};

export default ModalBody1;