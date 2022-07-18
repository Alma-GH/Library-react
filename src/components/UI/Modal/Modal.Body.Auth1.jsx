import React, {useState} from 'react';
import cls from "../../../style/UI/Modal/Modal.module.scss";
import BtnText from "../BtnText";
import {useDispatch} from "react-redux";
import {getAction_setBodyModal} from "../../../store/reducers/modalData";
import InputC from "../InputC";

const ModalBodyAuth1 = () => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  function inputEmail(e){
    setEmail(e.target.value)
  }
  function inputPass(e){
    setPass(e.target.value)
  }

  return (
    <div className={cls.auth1}>
      <h2>Вход</h2>

      <div>
        <InputC type="text" placeholder="почта" value={email} onChange={inputEmail}/>
        <InputC type="password" placeholder="пароль" value={pass} onChange={inputPass}/>
      </div>

      <div>
        <BtnText text="Войти" cb={()=>console.log("ENTER")}/>
        <BtnText text="Нет аккаунта" cb={()=>dispatch(getAction_setBodyModal(2))}/>
      </div>

    </div>
  );
};

export default ModalBodyAuth1;