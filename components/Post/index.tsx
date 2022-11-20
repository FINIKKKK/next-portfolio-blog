import Link from "next/link";
import React from "react";

import ss from "./Post.module.scss";

type PostProps = {
  id: number;
  img: string;
  date: string;
  author: string;
  category: string;
  title: string;
  text: string;
};

export const Post: React.FC<PostProps> = ({
  id,
  img,
  date,
  author,
  category,
  title,
  text,
}) => {
  return (
    <div className="post">
      <Link href={`/news/${id}`} className="img">
        <img src={img} alt={title} />
      </Link>
      <div className="info">
        <div className="item date">{date}</div>
        <a href="#" className="item author">
          {author}
        </a>
        <a href="#" className="item category">
          {category}
        </a>
      </div>
      <Link href={`/news/${id}`} className="title">
        {title}
      </Link>
      <div className="text">{text}</div>
    </div>
  );
};
