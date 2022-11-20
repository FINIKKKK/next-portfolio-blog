import React from "react";
import { Footer, Header } from "../components";

type MainlayoutsProps = {
  children: any;
};

export const MainLayout: React.FC<MainlayoutsProps> = ({ children }) => {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
};
