import React from 'react';
import clsHint from "../../../style/UI/Modal/Hint.module.scss";

const HintBody4 = () => {

  let styleH = [clsHint.hint]
  styleH.push(clsHint.hint4)

  return (
    <div className={styleH.join(" ")}>
      hint4
    </div>
  );
};

export default HintBody4;