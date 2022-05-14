import React from 'react';
import cls from "./../../../style/UI/Notifications/ErrorMessage.module.scss"

const ErrorMessage = ({message, prefix}) => {


  return (
    <div className={cls.error}>
      {prefix}: {message}
    </div>
  );
};

export default ErrorMessage;