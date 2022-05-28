import React from 'react';
import cls from "./../../style/UI/TextareaC.module.scss"


const TextareaC = ({prtClass, text, onChange , ...textProps}) => {

  const styles = [cls.textarea]
  if(prtClass) styles.push(prtClass)

  return (
    <textarea className={styles.join(" ")} value={text} onChange={onChange} {...textProps}>
    </textarea>
  );
};

export default TextareaC;