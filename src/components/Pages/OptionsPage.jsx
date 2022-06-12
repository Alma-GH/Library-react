import React from 'react';
import cls from "./../../style/Pages/OptionsPage.module.scss"
import OptionInput from "../Option.Input";
import InputC from "../UI/InputC";
import CheckboxC from "../UI/CheckboxC";
import SelectC from "../UI/SelectC";
import {useDispatch, useSelector} from "react-redux";
import {getAction_setSizeTable} from "../../store/reducers/tableReducer";
import {
  getAction_setDefNameList,
  getAction_setDefRedactMode,
  getAction_setTheme
} from "../../store/reducers/optionsReducer";
import RadioC from "../UI/RadioC";
import ServerService from "../../tools/Services/ServerService";


const OptionsPage = ({prtClass}) => {

  const dispatch = useDispatch()

  const sizeBlock = useSelector(state=>state.option.defTableSize)
  const listName = useSelector(state=>state.option.defNameList)
  const redactMode = useSelector(state=>state.option.defRedactMode)
  const theme = useSelector(state=>state.option.theme)

  function selectTheme(e){
    let val = e.target.value
    dispatch(getAction_setTheme(val))
  }
  function selectSize(e){
    dispatch(getAction_setSizeTable(e.target.value))
  }
  function inputListName(e){
    dispatch(getAction_setDefNameList(e.target.value))
  }
  function setMode(){
    dispatch(getAction_setDefRedactMode(!redactMode))
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
          value={theme}
          onChange={selectTheme}
        />
      </OptionInput>

      <OptionInput title="Default table size">
        <SelectC
          id="size in op" value={+sizeBlock} onChange={selectSize}
          defaultVal="Размер блока"
          options={[
            {name:"50%",value:50},
            {name:"100%",value:100},
            {name:"200%",value:200},
          ]}
        />
      </OptionInput>

      <OptionInput title="Default list name">
        <InputC type="text" value={listName} onChange={inputListName}/>
      </OptionInput>

      <OptionInput title="Enable redact mod by default">
        <CheckboxC
          choices={[
            {name:"enable mode"},
          ]}
          values={[redactMode]}
          onChange={setMode}
        />
      </OptionInput>

      <div className={cls.btns}>
        <button>SAVE</button>
        <button>RESET</button>
        <button>DEFAULT</button>
      </div>
    </div>
  );
};

export default OptionsPage;