import { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Comment } from "../../components";
import { useSelectors } from "../../hooks/useSelectors";
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
  const refPopup = React.useRef<HTMLDivElement>(null);
  const { data: userData } = useSelectors((state) => state.user);
  const [isVisible, setIsVisible] = React.useState(false);
  const router = useRouter();

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

  const removeComment = (id: number) => {
    setComments((prev) => prev.filter((obj) => obj.id !== id));
  };

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
    if (refPopup.current && !_event.path.includes(refPopup.current)) {
      setIsVisible(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const onRemovePost = async () => {
    try {
      // await Api().comment.removeAllOnPost(post.id)
      await Api().post.remove(post.id);
      router.push("/");
    } catch (err) {
      console.warn(err);
      alert("Ошибка при удалении поста");
    }
  };

  return (
    <PostLayout>
      <div className="post">
        {userData?.user?.data && userData?.user?.data.id === post.user.id && (
          <div ref={refPopup} className="popupBox">
            <svg
              onClick={() => setIsVisible(!isVisible)}
              className="options"
              width="20"
              height="5"
              viewBox="0 0 20 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.18171 4.36342C3.38508 4.36342 4.36342 3.3849 4.36342 2.18171C4.36342 0.978342 3.38508 0 2.18171 0C0.978343 0 0 0.978342 0 2.18171C0 3.38508 0.978343 4.36342 2.18171 4.36342ZM2.18171 1.32231C2.65509 1.32231 3.04112 1.70732 3.04112 2.18171C3.04112 2.6561 2.6561 3.04112 2.18171 3.04112C1.70834 3.04112 1.32231 2.6561 1.32231 2.18171C1.32231 1.70732 1.70835 1.32231 2.18171 1.32231Z"
                fill="#EAE7F4"
              />
              <path
                d="M10.0001 4.36342C11.2034 4.36342 12.1818 3.3849 12.1818 2.18171C12.1818 0.978342 11.2034 0 10.0001 0C8.7967 0 7.81836 0.978518 7.81836 2.18171C7.81836 3.38508 8.7967 4.36342 10.0001 4.36342ZM10.0001 1.32231C10.4734 1.32231 10.8595 1.70732 10.8595 2.18171C10.8595 2.6561 10.4734 3.04112 10.0001 3.04112C9.52671 3.04112 9.14067 2.65507 9.14067 2.18171C9.14067 1.70835 9.52671 1.32231 10.0001 1.32231Z"
                fill="#EAE7F4"
              />
              <path
                d="M17.8184 0.000244141C16.6151 0.000244141 15.6367 0.978763 15.6367 2.18196C15.6367 3.38532 16.6152 4.36367 17.8184 4.36367C19.0218 4.36367 20.0001 3.38515 20.0001 2.18196C20.0001 0.978587 19.0218 0.000244141 17.8184 0.000244141ZM17.8184 3.04136C17.3451 3.04136 16.959 2.65634 16.959 2.18196C16.959 1.70757 17.344 1.32255 17.8184 1.32255C18.2928 1.32255 18.6778 1.70757 18.6778 2.18196C18.6778 2.65634 18.2918 3.04136 17.8184 3.04136Z"
                fill="#EAE7F4"
              />
            </svg>
            {isVisible && (
              <div className="popup">
                <div className="item"><Link href={`/create/${post.id}`}> Редактировать</Link></div>
                <div onClick={onRemovePost} className="item">
                  Удалить
                </div>
              </div>
            )}
          </div>
        )}
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
          {userData?.user?.data && (
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
          )}
        </div>

        <div className="list">
          {comments.map((obj) => (
            <Comment key={obj.id} {...obj} removeComment={removeComment} />
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
