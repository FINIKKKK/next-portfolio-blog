import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import Select from "react-select";
import { Tag } from "../../components";
import { PostLayout } from "../../layouts/PostLayout";
import { Api } from "../../utils/api";
import { TCategory, TTag } from "../../utils/api/types";

const Editor = dynamic(
  () => import("../../components/Editor").then((m) => m.Editor),
  {
    ssr: false,
  }
);

interface CreatePostPageProps {
  categories: TCategory[];
  tags: TTag[];
}

export type TTagg = {
  text: string;
};

const CreatePostPage: NextPage<CreatePostPageProps> = ({ categories }) => {
  const updatedCategories = categories.map((item) => {
    const newItem = { ...item };
    newItem.value = newItem.id;
    newItem.label = newItem.name;
    delete newItem.id;
    delete newItem.name;
    return newItem;
  });

  const [image, setImage] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState([]);
  const [category, setCategory] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [tagsInput, setTagsInput] = React.useState("");
  const [tags, setTags] = React.useState<TTagg[]>([]);
  const router = useRouter();

  const onChangeImage = (e: any) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

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
      router.push("/");
    } catch (err) {
      console.warn(err);
      alert("Ошибка при создании поста");
    } finally {
      setIsLoading(false);
    }
  };

  const createTag = async (e: any) => {
    if (e.key === "Enter") {
      try {
        const obj = {
          text: tagsInput,
        };
        // const tag = await Api().tag.create(obj);
        setTags((prev) => [obj, ...prev]);
        setTagsInput('')
      } catch (err) {
        console.warn(err);
        alert("Ошибка при создании метки");
      }
    }
  };

  const removeTag = (text: string) => {
    setTags((prev) => prev.filter((obj) => obj.text !== text));
  }

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
          <input
            value={tagsInput}
            onChange={(e: any) => setTagsInput(e.target.value)}
            onKeyPress={createTag}
            type="text"
            placeholder="Метки"
          />
          <div className="list">
            {tags.map((obj, index) => (
              <Tag  key={index} text={obj.text} removeTag={removeTag} />
            ))}
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
    const tags = await Api().tag.getAll();
    console.log(tags);
    return { props: { categories, tags } };
  } catch (err) {
    console.warn(err);
    alert("Ошибка при получении категорий");
    return {
      props: {},
    };
  }
};

export default CreatePostPage;
