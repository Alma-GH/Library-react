import React, {useContext, useState} from 'react';
import cls from "../../../style/UI/Modal/Modal.module.scss";
import BtnText from "../BtnText";
import {useDispatch} from "react-redux";
import {getAction_setBodyModal, getAction_setVisModal} from "../../../store/reducers/modalData";
import InputC from "../InputC";
import {useNavigate} from "react-router-dom";
import {useFetching} from "../../../hooks/useFetching";
import {createUserWithEmailAndPassword, sendEmailVerification,
  signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth"
import {DBContext} from "../../../context/DBContext";
import {LINK_HOME} from "../../../tools/utils/const";
import Loader from "../Notifications/Loader";
import ErrorMessage from "../Notifications/ErrorMessage";

const ModalBodyAuth1 = () => {

  const dispatch = useDispatch()

  const push = useNavigate()

  const {auth} = useContext(DBContext)

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const [fetchForm, loadForm, errForm] = useFetching(  async ()=>{

    let {user} = await signInWithEmailAndPassword(auth, email, pass)
    dispatch(getAction_setVisModal(false))
    push(LINK_HOME)

    console.log({auth, user})
  })

  function inputEmail(e){
    setEmail(e.target.value)
  }
  function inputPass(e){
    setPass(e.target.value)
  }
  function login(){
    fetchForm()
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
              <BtnText text="Нет аккаунта" cb={()=>dispatch(getAction_setBodyModal(2))}/>
            </div>
          </>
      }

      {errForm &&
        <ErrorMessage message={errForm.message} prefix="Ошибка входа"/>
      }

    </div>
  );
};

export default ModalBodyAuth1;