import React from 'react';
import cls from "../../style/UI/BtnCorner.module.scss"

const BtnCorner = ({cbL,cbR,prtClass, cornerN}) => {
  /* parent should be - position: relative */


  function leftClick(e){
    if(e.button === 0)
      cbL(e)
  }

  //styles
  const styles = [cls.btn]
  if(prtClass) styles.push(prtClass)

  const pos = [cls.leftUp, cls.rightUp, cls.rightDown, cls.leftDown]
  if(1<= cornerN && cornerN<=4) styles.push(pos[cornerN-1])
  else                          styles.push(cls.rightUp)

  return (
    <button className={styles.join(" ")} onContextMenu={cbR} onPointerDown={leftClick} />
  );
};

export default BtnCorner;