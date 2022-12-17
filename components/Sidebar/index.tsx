import Link from "next/link";
import React from "react";

import ss from "./Sidebar.module.scss";

type SidebarProps = {};

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <aside className="sidebar">
      <Link href="/create" className="block btn">
        <span>Создать пост</span>
      </Link>
      <div className="block search input">
        <input type="text" placeholder="Поиск" />
        <svg width="20" height="20">
          <use xlinkHref="./static/img/icons/icons.svg#search" />
        </svg>
      </div>
      <div className="block">
        <h6 className="title">Categories</h6>
        <div className="categories">
          <a href="#" className="item">
            Dining room (1)
          </a>
          <a href="#" className="item">
            Office furniture (12)
          </a>
          <a href="#" className="item">
            Simple interiror design (2)
          </a>
          <a href="#" className="item">
            Design (4)
          </a>
          <a href="#" className="item">
            Bedroom Furniture (1)
          </a>
        </div>
      </div>
      <div className="block">
        <div className="title">Recent Posts</div>
        <div className="posts">
          <div className="post">
            <a href="#" className="post__title">
              Cred selfies edison bulb four dollar toast humblebrag
            </a>
            <div className="info">
              <p className="date">May 2, 2020</p>
              <p className="date"> Ann Summers</p>
            </div>
          </div>
          <div className="post">
            <a href="#" className="post__title">
              Cred selfies edison bulb four dollar toast humblebrag
            </a>
            <div className="info">
              <p className="date">May 2, 2020</p>
              <p className="date"> Ann Summers</p>
            </div>
          </div>
          <div className="post">
            <a href="#" className="post__title">
              Cred selfies edison bulb four dollar toast humblebrag
            </a>
            <div className="info">
              <p className="date">May 2, 2020</p>
              <p className="date"> Ann Summers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="block tags">
        <div className="title">Tags</div>
        <ul className="list">
          <li className="item">
            <a href="#">Dining room futniture</a>
          </li>
          <li className="item">
            <a href="#">Chair</a>
          </li>
          <li className="item">
            <a href="#">Table</a>
          </li>
          <li className="item">
            <a href="#">Office Furniture</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};
