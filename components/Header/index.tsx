import Image from "next/image";
import React from "react";

import logo from '../../public/static/img/logo.svg';

import ss from "./Header.module.scss";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="inner">
          <a href="index.html" className="logo">
            <Image src={logo} alt="logo" />
          </a>
          <div className="btns">
            <a href="#" className="btn">
              Войти
            </a>
            <a href="#" className="btn btn2">
              Регистрация
            </a>
          </div>
          {/* <div className="toProfile">
            <img src="./img/avatar.png" alt="avatar" />
            <span className="number">99</span>
            <div className="popup active">
              <a href="#" className="item">
                Профиль
              </a>
              <a href="#" className="item">
                Уведомления <span>99</span>
              </a>
              <a href="#" className="item">
                Выйти
              </a>
            </div>
          </div> */}
        </div>
      </div>
      <div className="down"></div>
    </header>
  );
};
