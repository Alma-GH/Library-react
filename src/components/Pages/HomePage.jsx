import React from 'react';
import BtnIco from "../UI/BtnIco";
import imgQ from "../../assets/imgs/question.png";
import cls from "../../style/Pages/HomePage.module.scss"

const HomePage = ({prtClass}) => {

  const styles = [cls.home]
  if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>
      <div>
        <h2>Добро пожаловать в My library</h2>
        <h2>Если вы здесь в первый раз нажмите на <BtnIco img={imgQ} disabled={true}/> и ознакомьтесь с приложением</h2>
      </div>
    </div>
  );
};

export default HomePage;