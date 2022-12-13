import React from "react";

type MiniLayoutsProps = {
  children: any;
};

export const MiniLayout: React.FC<MiniLayoutsProps> = ({ children }) => {
  return <div className="mini">{children}</div>;
};
