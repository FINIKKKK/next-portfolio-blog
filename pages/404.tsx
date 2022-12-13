import Link from "next/link";
import React from "react";
import { MiniLayout } from "../layouts/MiniLayot";

import ss from "./pages.module.scss";

export default function errorPage() {
  return (
    <MiniLayout>
      <section className="error404">
        <div className="content">
          <h1 className="title">404</h1>
          <p className="text">Извините, но страница не найдена</p>
          <Link href="/" className="btn">
            На главную
          </Link>
        </div>
        <svg width="20" height="20" className="img">
          <use xlinkHref="./static/img/icons/icons.svg#404" />
        </svg>
      </section>
    </MiniLayout>
  );
}
