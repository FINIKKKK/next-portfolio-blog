import { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { Comment } from "../../components";
import { PostLayout } from "../../layouts/PostLayout";
import { Api } from "../../utils/api";
import { TComment, TPost } from "../../utils/api/types";

import ss from "./post.module.scss";

interface PostPageProps {
  post: TPost;
}

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const [isActive, setIsActive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [comments, setComments] = React.useState<TComment[]>([]);
  const refInput = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    (async () => {
      try {
        const comments = await Api().comment.getAll(post.id);
        setComments(comments);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении комментариев");
      }
    })();
  }, []);

  const newDate = new Date(post.createdAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const onChangeInput = (e: any) => {
    setInputValue(e.target.value);
  };

  const onCreateComment = async () => {
    try {
      setIsLoading(true);
      const obj = {
        text: inputValue,
        postId: post.id,
      };
      const comment = await Api().comment.create(obj);
      setComments((prev) => [comment, ...prev]);
      setInputValue("");
      setIsActive(false);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании комментария");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickOutSide = (e: MouseEvent) => {
    const _event = e as MouseEvent & {
      path: Node[];
    };
    if (refInput.current && !_event.path.includes(refInput.current)) {
      setIsActive(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  return (
    <PostLayout>
      <div className="post">
        <div className="img">
          <img src="../../static/img/post__img.jpg" alt={post.title} />
        </div>
        <h3 className="title">{post.title}</h3>
        <div className="info">
          <div className="item date">{newDate}</div>
          <Link href={`/profile/${post.user.id}`} className="item author">
            {post.user.name}
          </Link>
          <Link
            href={`/posts?categoryId=${post.category.id}`}
            className="item category"
          >
            {post.category.name}
          </Link>
        </div>
        <div className="content">
          {post.body.map((obj) => (
            <p>{obj.data.text}</p>
          ))}
        </div>
      </div>

      <div className="tags post__tags">
        <h5 className="title">Метки</h5>
        <ul className="list">
          <li className="item">
            <a href="#">Bedroom furniture</a>
          </li>
          <li className="item">
            <a href="#">Office furniture</a>
          </li>
          <li className="item">
            <a href="#">Chair</a>
          </li>
        </ul>
      </div>

      <div className="navigation">
        <a href="#" className="item">
          <svg className="" width="20" height="20">
            <use xlinkHref="../../static/img/icons/icons.svg#prev" />
          </svg>
          <p>Cred selfies edison bulb four dollar toast humblebrag</p>
        </a>
        <a href="#" className="item">
          <p>Cred selfies edison bulb four dollar toast humblebrag</p>
          <svg className="" width="20" height="20">
            <use xlinkHref="../../static/img/icons/icons.svg#next" />
          </svg>
        </a>
      </div>

      <div className="comments">
        <div className="header">
          <h4 className="title">Комменты:</h4>
          <div
            ref={refInput}
            onClick={() => setIsActive(true)}
            className="input"
          >
            <textarea
              value={inputValue}
              onChange={onChangeInput}
              className={isActive || inputValue ? "active" : ""}
              placeholder="Оставить комментарий:"
            ></textarea>
            {inputValue && (
              <svg
                onClick={onCreateComment}
                className={isLoading ? "disabled" : ""}
                width="20"
                height="20"
              >
                <use xlinkHref="../../static/img/icons/icons.svg#submit" />
              </svg>
            )}
          </div>
        </div>

        <div className="list">
          {comments.map((obj) => (
            <Comment key={obj.id} {...obj} />
          ))}
        </div>
      </div>
    </PostLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const id = ctx?.params?.id;
    const post = await Api(ctx).post.getOne(+id);
    return {
      props: {
        post,
      },
    };
  } catch (err) {
    console.warn(err);
    alert("Ошибка при получении поста");
    return {
      props: {},
    };
  }
};

export default PostPage;
