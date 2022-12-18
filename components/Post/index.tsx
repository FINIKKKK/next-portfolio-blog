import Link from "next/link";
import React from "react";

import ss from "./Post.module.scss";

type PostProps = {
  id: number;
  date: string;
  title: string;
  description: string;
  userId: number;
  userName: string;
};

export const Post: React.FC<PostProps> = ({
  id,
  date,
  title,
  description,
  userId,
  userName,
}) => {
  const newDate = new Date(date).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="post">
      <Link href={`/posts/${id}`} className="img">
        <img src="./static/img/post__img.jpg" alt={title} />
      </Link>
      <div className="info">
        <div className="item date">{newDate}</div>
        <Link href={`/profile/${userId}`} className="item author">
          {userName}
        </Link>
        <a href="#" className="item category">
          Category
        </a>
      </div>
      <Link href={`/posts/${id}`} className="title">
        {title}
      </Link>
      <div className="text">{description}</div>
    </div>
  );
};
