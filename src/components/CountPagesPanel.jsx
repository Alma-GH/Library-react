import React from 'react';
import cls from "./../style/main/CountPagesPanel.module.scss"

const CountPagesPanel = ({all, onpage, page}) => {
  return (
    <div className={cls.panel}>
      Найдено:{all} <br/>
      На странице: {onpage} <br/>
      Страница: {page}
    </div>
  );
};

export default CountPagesPanel;