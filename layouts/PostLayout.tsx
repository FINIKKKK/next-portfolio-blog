import React from "react";
import { Footer, Header, Sidebar } from "../components";

type PostlayoutsProps = {
  children: any;
};

export const PostLayout: React.FC<PostlayoutsProps> = ({ children }) => {
  return (
    <>
      <Header />

      <main className="main">
        <div className="container">
          <div className="main__inner">
            <div className="inner">{children}</div>
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
