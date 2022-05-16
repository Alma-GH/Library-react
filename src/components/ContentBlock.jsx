import React from 'react';
import cls from "./../style/main/ContentBlock.module.scss"
import ContentBody from "./ContentBody";

const ContentBlock = ({prtClass, }) => {

  const styles = [cls.content]
  if(prtClass) styles.push(prtClass)


  return (
    <div className={styles.join(" ")}>
      <ContentBody/>
    </div>
  );
};

export default ContentBlock;