import React from 'react';
import clsHint from "../../../style/UI/Modal/Hint.module.scss";

const HintBody3 = () => {

  let styleH = [clsHint.hint]
  styleH.push(clsHint.hint3)

  return (
    <div className={styleH.join(" ")}>
      hint3
    </div>
  );
};

export default HintBody3;