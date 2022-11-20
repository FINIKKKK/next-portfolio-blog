import React from "react";

import ss from "./pages.module.scss";


export default function errorPage() {
  return (
    <section className="error404">
      <div className="content">
        <h1 className="title">404</h1>
        <p className="text">Извините, но страница не найдена</p>
        <a href="index.html" className="btn">
          На главную
        </a>
      </div>
      <svg width="20" height="20" className="img">
        <use xlinkHref="./static/img/icons/icons.svg#404" />
      </svg>
    </section>
  );
};
