import React from "react";

import ss from "./Footer.module.scss";

type FooterProps = {};

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={ss.footer}>
      <div className="container">
        <div className={ss.inner}>
          <p className={ss.copy}>Создатель макета Dmitiy Bozhko</p>
          <ul className={ss.soclist}>
            <li className={ss.soclist__item}>
              <a href="#">
                <svg width="20" height="20">
                  <use xlinkHref="./static/img/icons/icons.svg#facebook" />
                </svg>
              </a>
            </li>
            <li className={ss.soclist__item}>
              <a href="#">
                <svg width="20" height="20">
                  <use xlinkHref="./static/img/icons/icons.svg#vk" />
                </svg>
              </a>
            </li>
            <li className={ss.soclist__item}>
              <a href="#">
                <svg width="20" height="20">
                  <use xlinkHref="./static/img/icons/icons.svg#twitter" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
