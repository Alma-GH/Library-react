import React from 'react';
import clsHint from "../../../style/UI/Modal/Hint.module.scss";

const HintBody1 = () => {

  let styleH = [clsHint.hint]
  styleH.push(clsHint.hint1)

  return (
    <div className={styleH.join(" ")}>
      hint1
    </div>
  );
};

export default HintBody1;