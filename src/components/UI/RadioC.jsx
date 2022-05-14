import React from 'react';

const RadioC = ({prtClass,choices}) => {

  let styles = []
  // const styles = [cls.head]
  // if(prtClass) styles.push(prtClass)

  return (
    <div className={styles.join(" ")}>
      {/*{choices.map(choice=>*/}
      {/*  <>*/}
      {/*    <input type="radio" id={choice.id} name={choice.name} value={choice.value}/>*/}
      {/*    <label htmlFor={choice.id}>{choice.text}</label>*/}
      {/*  </>)*/}
      {/*}*/}
      <input type="radio" id="contactChoice1"
             name="contact" value="email"/>
        <label htmlFor="contactChoice1">Email</label>

      <input type="radio" id="contactChoice2"
             name="contact" value="phone"/>
        <label htmlFor="contactChoice2">Phone</label>

      <input type="radio" id="contactChoice3"
             name="contact" value="mail"/>
        <label htmlFor="contactChoice3">Mail</label>
    </div>
  );
};

export default RadioC;