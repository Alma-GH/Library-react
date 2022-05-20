import React from 'react';
import ReorderPanel from "./ReorderPanel";

const ToolBar = ({className}) => {
  return (
    <div className={className}>
      <ReorderPanel />
    </div>
  );
};

export default ToolBar;