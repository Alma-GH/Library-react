import React from 'react';
import clsHint from "../../../style/UI/Modal/Hint.module.scss";

const HintBody2 = () => {
  let styleH = [clsHint.hint]
  styleH.push(clsHint.hint2)

  return (
    <div className={styleH.join(" ")}>
      hint2
    </div>
  );
};

export default HintBody2;