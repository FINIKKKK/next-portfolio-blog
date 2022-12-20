import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import React from "react";
import Select from "react-select";
import { PostLayout } from "../layouts/PostLayout";
import { Api } from "../utils/api";
import { TCategory } from "../utils/api/types";

const Editor = dynamic(
  () => import("../components/Editor").then((m) => m.Editor),
  {
    ssr: false,
  }
);

interface CreatePostPageProps {
  categories: TCategory[];
}

const CreatePostPage: NextPage<CreatePostPageProps> = ({ categories }) => {
  const updatedCategories = categories.map((item) => {
    const newItem = { ...item };
    newItem.value = newItem.id;
    delete newItem.id;
    return newItem;
  });

  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState([]);
  const [category, setCategory] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onChangeImage = (e: any) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  // const onChangeCategory = (e: any) => {
  //   setCategory(e.target.value);
  // };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const selectedCategory = category?.value && category.value;
      const obj = {
        title,
        body,
        categoryId: selectedCategory,
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
        <Select
          className="category block"
          placeholder="Категория"
          value={category}
          onChange={setCategory}
          options={updatedCategories}
        />
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

        <button
          onClick={onSubmit}
          className={`btn ${
            isLoading || !title || body.length === 0 || !category
              ? "disabled"
              : ""
          }`}
        >
          Опубликовать
        </button>
      </div>
    </PostLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const categories = await Api().category.getAll();
    return { props: { categories } };
  } catch (err) {
    console.warn(err);
    alert("Ошибка при получении поста");
    return {
      props: {},
    };
  }
};

export default CreatePostPage;
