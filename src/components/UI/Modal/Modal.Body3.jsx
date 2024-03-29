import React from 'react';
import cls from "../../../style/UI/Modal/Modal.module.scss";
import {Multiselect} from "multiselect-react-dropdown";
import {useDispatch, useSelector} from "react-redux";
import {getAction_setSelectedLists} from "../../../store/reducers/modalData";
import {useFetching} from "../../../hooks/useFetching";
import ServerService from "../../../tools/Services/ServerService";

const ModalBody3 = () => {

  const dispatch = useDispatch()

  const idTable = useSelector(state=>state.modal.idTable)
  const modalOptionsLists = useSelector(state=>state.modal.optionsLists)
  const modalSelectedLists = useSelector(state=>state.modal.selectedLists)


  const [fetchList, isLoadingList, errList] = useFetching(async (work, isDelete)=>{

    const [allLists] = await ServerService.fromDB.getAllLists()
    const resFromServer = await ServerService.fromDB.setLists(allLists.map(list=>{
      if(list.lid === idTable){
        if(isDelete) list.wids = list.wids.filter(id=>id!==work.id)
        else         list.wids = list.wids ? [...list.wids, work.id] : [work.id]
      }
      return list
    }))
    console.log({resFromServer})
  })

  function addSelectedWork(selectedList, selectedItem){
    fetchList(selectedItem, false)
    dispatch(getAction_setSelectedLists(selectedList))
  }
  function deleteFromList(selectedList, removedItem){
    fetchList(removedItem, true)
    dispatch(getAction_setSelectedLists(selectedList))
  }


  return (
    <div className={cls.modal2}>
      <Multiselect
        options={[...modalOptionsLists]}
        selectedValues={[...modalSelectedLists]}
        displayValue="name"
        id={idTable}
        isObject={true}
        placeholder="WORK"
        onSelect={addSelectedWork}
        onRemove={deleteFromList}
        loading={isLoadingList}
      />
    </div>
  );
};

export default ModalBody3;