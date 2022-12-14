import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import avatar from "../../assets/img/avatar.png";
import { useSelectors } from "../../hooks/useSelectors";

import logo from "../../public/static/img/logo.svg";

import ss from "./Header.module.scss";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const { data: userData } = useSelectors((state) => state.user);
  const [activePopup, setActivePopup] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutSide = (e: MouseEvent) => {
    const _event = e as MouseEvent & {
      path: Node[];
    };
    if (popupRef.current && !_event.path.includes(popupRef.current)) {
      setActivePopup(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="inner">
          <a href="index.html" className="logo">
            <Image src={logo} alt="logo" />
          </a>
          {!userData && (
            <div className="btns">
              <Link href="/login" className="btn">
                Войти
              </Link>
              <Link href="/register" className="btn btn2">
                Регистрация
              </Link>
            </div>
          )}
          {userData && (
            <div
              ref={popupRef}
              onClick={() => setActivePopup(!activePopup)}
              className="toProfile"
            >
              <Image src={avatar} alt="avatar" />
              <span className="number">99</span>
              {activePopup && (
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
              )}
            </div>
          )}
        </div>
      </div>
      <div className="down"></div>
    </header>
  );
};
