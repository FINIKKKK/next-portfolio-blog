import { NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import { PostLayout } from "../layouts/PostLayout";
import { Api } from "../utils/api";

const Editor = dynamic(
  () => import("../components/Editor").then((m) => m.Editor),
  {
    ssr: false,
  }
);

interface CreatePostPageProps {}

const CreatePostPage: NextPage<CreatePostPageProps> = ({}) => {
  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const onChangeImage = (e: any) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const obj = {
        title,
        body,
      };
      const post = await Api().post.create(obj);
      console.log(post);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании поста");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PostLayout>
      <div className="createPost">
        <div className="category block">
          <p>Категория</p>
          <svg width="20" height="20">
            <use xlinkHref="./static/img/icons/icons.svg#triangle" />
          </svg>
        </div>

        <div className="img block">
          <div className="box">
            <svg width="20" height="20">
              <use xlinkHref="./static/img/icons/icons.svg#edit" />
            </svg>
          </div>
          {image && <img src={URL.createObjectURL(image)} alt="img" />}
          <input onChange={onChangeImage} type="file" />
        </div>

        <div className="title block">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Заголовок"
          />
        </div>

        <Editor initialValue={body} onChange={(blocks) => setBody(blocks)} />

        <div className="createTags block">
          <input type="text" placeholder="Метки" />
          <div className="list">
            <div className="item">
              <p>Bedroom furniture</p>
              <svg width="20" height="20">
                <use xlinkHref="./static/img/icons/icons.svg#close" />
              </svg>
            </div>
            <div className="item">
              <p>Bedroom furniture</p>
              <svg width="20" height="20">
                <use xlinkHref="./static/img/icons/icons.svg#close" />
              </svg>
            </div>
          </div>
        </div>

        <button onClick={onSubmit} className="btn" disabled={isLoading}>
          Опубликовать
        </button>
      </div>
    </PostLayout>
  );
};

export default CreatePostPage;
