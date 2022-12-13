import React from "react";
import Image from "next/image";
import registerImg from "../assets/img/register__img.jpg";

type AuthLayoutsProps = {
  children: any;
};

export const AuthLayout: React.FC<AuthLayoutsProps> = ({ children }) => {
  return (
    <div className="mini">
      <div className="register">
        <div className="inner">
          {children}
          <div className="img">
            <Image src={registerImg} alt="register" />
          </div>
        </div>
      </div>
    </div>
  );
};
