import Link from "next/link";
import React from "react";
import { TPost } from "../../utils/api/types";

import ss from "./Post.module.scss";

type PostProps = {
  id: number;
  date: string;
  title: string;
  description: string;
};

export const Post: React.FC<PostProps> = ({ id, date, title, description }) => {
  const newDate = new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="post">
      <Link href={`/news/${id}`} className="img">
        <img src="./static/img/post__img.jpg" alt={title} />
      </Link>
      <div className="info">
        <div className="item date">{newDate}</div>
        <a href="#" className="item author">
          Author
        </a>
        <a href="#" className="item category">
          Category
        </a>
      </div>
      <Link href={`/news/${id}`} className="title">
        {title}
      </Link>
      <div className="text">{description}</div>
    </div>
  );
};
