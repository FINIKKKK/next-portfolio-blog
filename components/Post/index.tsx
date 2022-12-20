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
  categoryId: number;
  categoryName: string;
};

export const Post: React.FC<PostProps> = ({
  id,
  date,
  title,
  description,
  userId,
  userName,
  categoryId,
  categoryName,
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
        <Link
          href={`/posts?categoryId=${categoryId}`}
          className="item category"
        >
          {categoryName}
        </Link>
      </div>
      <Link href={`/posts/${id}`} className="title">
        {title}
      </Link>
      <div className="text">{description}</div>
    </div>
  );
};
