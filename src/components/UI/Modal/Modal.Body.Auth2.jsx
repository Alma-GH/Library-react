import React, {useContext, useState} from 'react';
import cls from "../../../style/UI/Modal/Modal.module.scss";
import BtnText from "../BtnText";
import {useDispatch} from "react-redux";
import {getAction_setBodyModal, getAction_setVisModal} from "../../../store/reducers/modalData";
import InputC from "../InputC";
import {useFetching} from "../../../hooks/useFetching";
import {createUserWithEmailAndPassword} from "firebase/auth";
import Loader from "../Notifications/Loader";
import ErrorMessage from "../Notifications/ErrorMessage";
import {DBContext} from "../../../context/DBContext";
import {errTimerAuth1} from "../../../tools/utils/func";

const ModalBodyAuth2 = () => {

  const dispatch = useDispatch()

  const {auth} = useContext(DBContext)

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const [fetchForm, loadForm, errForm] = useFetching(  async ()=>{
    let {user} = await createUserWithEmailAndPassword(auth, email, pass)
    dispatch(getAction_setVisModal(false))
    console.log({auth, user})
  }, errTimerAuth1)

  function inputEmail(e){
    setEmail(e.target.value)
  }
  function inputPass(e){
    setPass(e.target.value)
  }
  function createAcc(){
    fetchForm()
  }


  return (
    <div className={cls.auth2}>

      {loadForm
        ? <Loader/>
        :
          <>
            <h2>Регистрация</h2>

            <div>
              <InputC type="text" placeholder="почта" value={email} onChange={inputEmail}/>
              <InputC type="password" placeholder="пароль" value={pass} onChange={inputPass}/>
            </div>

            <div>
              <BtnText text="Создать" cb={createAcc}/>
              <BtnText text="Есть аккаунт" cb={()=>dispatch(getAction_setBodyModal(1))}/>
            </div>
          </>
      }

      {errForm &&
        <ErrorMessage message={errForm.message} prefix="Ошибка создания"/>
      }


    </div>
  );
};

export default ModalBodyAuth2;