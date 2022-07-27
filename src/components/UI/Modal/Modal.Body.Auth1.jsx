import React, {useContext, useState} from 'react';
import cls from "../../../style/UI/Modal/Modal.module.scss";
import BtnText from "../BtnText";
import {useDispatch} from "react-redux";
import {getAction_setBodyModal, getAction_setVisModal} from "../../../store/reducers/modalData";
import InputC from "../InputC";
import {useNavigate} from "react-router-dom";
import {useFetching} from "../../../hooks/useFetching";
import {sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth"
import {DBContext} from "../../../context/DBContext";
import {LINK_HOME} from "../../../tools/utils/const";
import Loader from "../Notifications/Loader";
import ErrorMessage from "../Notifications/ErrorMessage";
import {errTimerAuth1, errTimerAuth2} from "../../../tools/utils/func";

const ModalBodyAuth1 = () => {

  const dispatch = useDispatch()

  const push = useNavigate()

  const {auth} = useContext(DBContext)

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const [visMessage, setVisMessage] = useState(false)

  const [fetchForm, loadForm, errForm] = useFetching(  async ()=>{

    let {user} = await signInWithEmailAndPassword(auth, email, pass)
    dispatch(getAction_setVisModal(false))
    push(LINK_HOME)

    console.log({auth, user})
  }, errTimerAuth1)

  const [fetchResetPass, loadPass, errPass] = useFetching(async ()=>{

    setVisMessage(true)
    setTimeout(()=>setVisMessage(false),3000)
    let res = await sendPasswordResetEmail(auth,email)

    console.log(res)
  }, errTimerAuth2)

  function inputEmail(e){
    setEmail(e.target.value)
  }
  function inputPass(e){
    setPass(e.target.value)
  }
  function login(){
    fetchForm()
  }
  function goRegistration(){
    dispatch(getAction_setBodyModal(2))
  }
  function resetPass(){
    fetchResetPass()
  }

  return (
    <div className={cls.auth1}>

      {loadForm
        ? <Loader/>
        :
          <>
            <h2>Вход</h2>

            <div>
              <InputC type="text" placeholder="почта" value={email} onChange={inputEmail}/>
              <InputC type="password" placeholder="пароль" value={pass} onChange={inputPass}/>
            </div>

            <div>
              <BtnText text="Войти" cb={login}/>
              <BtnText text="Не помню пароль" cb={resetPass} disabled={visMessage}/>
              <BtnText text="Нет аккаунта" cb={goRegistration}/>
            </div>

            {(visMessage && !errPass) &&
              <div style={{color:"red"}}>На данный <b>email</b>  было отправлено сообщение со сбросом пароля</div>
            }
          </>
      }

      {(errForm || errPass) &&
        <ErrorMessage message={errForm?.message || errPass?.message} prefix="Ошибка входа"/>
      }

    </div>
  );
};

export default ModalBodyAuth1;