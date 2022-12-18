import React from "react";
import { Footer, Header, Sidebar } from "../components";
import { TPost } from "../utils/api/types";

type PostLayoutsProps = {
  children: any;
};

export const PostLayout: React.FC<PostLayoutsProps> = ({ children }) => {
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
