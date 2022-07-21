import React, {useEffect, useState} from 'react';
import cls from "./../../style/Pages/OptionsPage.module.scss"
import OptionInput from "../Option.Input";
import InputC from "../UI/InputC";
import CheckboxC from "../UI/CheckboxC";
import SelectC from "../UI/SelectC";
import {useDispatch, useSelector} from "react-redux";
import {
  getAction_clearOptions,
  getAction_setDefNameList,
  getAction_setDefRedactMode,
  getAction_setDefTableSize,
  getAction_setTheme
} from "../../store/reducers/optionsReducer";
import RadioC from "../UI/RadioC";
import BtnText from "../UI/BtnText";
import {NAME_NEW_LIST} from "../../tools/utils/const";
import {
  getAction_setBodyModal,
  getAction_setConfirmCallback,
  getAction_setConfirmText,
  getAction_setVisModal
} from "../../store/reducers/modalData";


const OptionsPage = ({prtClass}) => {

  const dispatch = useDispatch()


  const sizeBlock = useSelector(state=>state.option.defTableSize)
  const listName = useSelector(state=>state.option.defNameList)
  const redactMode = useSelector(state=>state.option.defRedactMode)
  const theme = useSelector(state=>state.option.theme)

  const [entSizeBlock, setEntSizeBlock] = useState(100)
  const [entListName, setEntListName] = useState(NAME_NEW_LIST)
  const [entRedactMode, setEntRedactMode] = useState(false)
  const [entTheme, setEntTheme] = useState(1)

  useEffect(()=>{

    setEntTheme(theme)
    setEntListName(listName)
    setEntSizeBlock(sizeBlock)
    setEntRedactMode(redactMode)

  }, [sizeBlock, listName, redactMode,theme])

  //input functions
  function selectTheme(e){
    let val = e.target.value
    setEntTheme(+val)
  }
  function selectSize(e){
    let val = e.target.value
    setEntSizeBlock(+val)
  }
  function inputListName(e){
    let val = e.target.value
    setEntListName(val)
  }
  function setMode(){
    setEntRedactMode(!entRedactMode)
  }

  //confirm functions
  function saveOptions(){
    //set option state according to the input fields
    dispatch(getAction_setTheme(entTheme))
    dispatch(getAction_setDefTableSize(entSizeBlock))
    dispatch(getAction_setDefNameList(entListName))
    dispatch(getAction_setDefRedactMode(entRedactMode))
  }

  function defOptions(){
    //set default option state
    dispatch(getAction_clearOptions())
  }

  function resetOptions(){
    //set option in input fields according to the state
    setEntTheme(theme)
    setEntListName(listName)
    setEntSizeBlock(sizeBlock)
    setEntRedactMode(redactMode)
  }

  //button functions
  function openConfirmModalSave(){
    dispatch(getAction_setConfirmCallback(saveOptions))
    dispatch(getAction_setConfirmText("Сохранить настройки?"))

    dispatch(getAction_setVisModal(true))
    dispatch(getAction_setBodyModal(3))
  }

  function openConfirmModalDefault(){
    dispatch(getAction_setConfirmCallback(defOptions))
    dispatch(getAction_setConfirmText("Поставить настройки по умолчанию?"))

    dispatch(getAction_setVisModal(true))
    dispatch(getAction_setBodyModal(3))
  }

  function openConfirmModalReset(){
    dispatch(getAction_setConfirmCallback(resetOptions))
    dispatch(getAction_setConfirmText("Поставить текущие настройки(сбросить изменения в полях)?"))

    dispatch(getAction_setVisModal(true))
    dispatch(getAction_setBodyModal(3))
  }

  const styles = [cls.page]
  if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>
      <OptionInput title="Theme">
        <RadioC
          name="theme"
          choices={[
            {text:"light", value: 1},
            {text:"dark", value: 2},
          ]}
          value={entTheme}
          onChange={selectTheme}
        />
      </OptionInput>

      <OptionInput title="Default table size">
        <SelectC
          id="size in op" value={+entSizeBlock} onChange={selectSize}
          defaultVal="Размер блока"
          options={[
            {name:"50%",value:50},
            {name:"100%",value:100},
            {name:"200%",value:200},
          ]}
        />
      </OptionInput>

      <OptionInput title="Default list name">
        <InputC type="text" value={entListName} onChange={inputListName}/>
      </OptionInput>

      <OptionInput title="Enable redact mod by default">
        <CheckboxC
          choices={[
            {name:"enable mode"},
          ]}
          values={[entRedactMode]}
          onChange={setMode}
        />
      </OptionInput>

      <div className={cls.btns}>
        <BtnText text="SAVE" cb={openConfirmModalSave}/>
        <BtnText text="RESET" cb={openConfirmModalReset}/>
        <BtnText text="DEFAULT" cb={openConfirmModalDefault}/>
      </div>
    </div>
  );
};

export default OptionsPage;