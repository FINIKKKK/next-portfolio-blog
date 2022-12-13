import React from "react";

type MinilayoutsProps = {
  children: any;
};

export const MiniLayout: React.FC<MinilayoutsProps> = ({ children }) => {
  return <div className="mini">{children}</div>;
};
