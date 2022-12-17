import Image from "next/image";
import Link from "next/link";
import { destroyCookie } from "nookies";
import React from "react";
import { useSelector } from "react-redux";
import avatar from "../../assets/img/avatar.png";
import { useActions } from "../../hooks/useActions";
import { useSelectors } from "../../hooks/useSelectors";

import logo from "../../public/static/img/logo.svg";

import ss from "./Header.module.scss";

type HeaderProps = {};

export const Header: React.FC<HeaderProps> = () => {
  const { data: userData } = useSelectors((state) => state.user);
  const [activePopup, setActivePopup] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const notices = false;
  const { removeUser } = useActions();

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

  const onLogout = () => {
    removeUser();
    destroyCookie(null, "token");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="inner">
          <a href="index.html" className="logo">
            <Image src={logo} alt="logo" />
          </a>
          {!userData?.user?.data && (
            <div className="btns">
              <Link href="/login" className="btn">
                Войти
              </Link>
              <Link href="/register" className="btn btn2">
                Регистрация
              </Link>
            </div>
          )}
          {userData?.user?.data && (
            <div
              ref={popupRef}
              onClick={() => setActivePopup(!activePopup)}
              className="toProfile"
            >
              <Image src={avatar} alt="avatar" />
              {notices && <span className="number">99</span>}
              {activePopup && (
                <div className="popup active">
                  <a href="#" className="item">
                    Профиль
                  </a>
                  <a href="#" className="item">
                    Уведомления {notices && <span>99</span>}
                  </a>
                  <div onClick={onLogout} className="item">
                    Выйти
                  </div>
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
