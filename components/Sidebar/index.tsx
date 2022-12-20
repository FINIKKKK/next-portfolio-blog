import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { Api } from "../../utils/api";
import { TCategory, TPost } from "../../utils/api/types";

import ss from "./Sidebar.module.scss";

type SidebarProps = {};

export const Sidebar: React.FC<SidebarProps> = () => {
  const [posts, setPosts] = React.useState<TPost[]>([]);
  const [categories, setCategories] = React.useState<TCategory[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const posts = await Api().post.getAll();
        const categories = await Api().category.getAll();
        setPosts(posts);
        setCategories(categories);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении постов");
      }
    })();
  }, []);

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
        <h6 className="title">Категории</h6>
        <div className="categories">
          {categories.map((obj) => (
            <Link
              key={obj.id}
              href={`/posts?categoryId=${obj.id}`}
              className="item"
            >
              {obj.name} (1)
            </Link>
          ))}
        </div>
      </div>
      <div className="block">
        <div className="title">Последнии посты</div>
        <div className="posts">
          {posts.slice(0, 3).map((obj) => (
            <div key={obj.id} className="post">
              <Link href={`/profile/${obj.user.id}`} className="post__title">
                {obj.title}
              </Link>
              <div className="info">
                <p className="date">
                  {new Date(obj.createdAt).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="date">{obj.user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="block tags">
        <div className="title">Метки</div>
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
