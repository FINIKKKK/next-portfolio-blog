import { GetStaticProps, NextPage } from "next";
import { Pagination, Post, Sidebar } from "../components";
import { PostLayout } from "../layouts/PostLayout";
import { Api } from "../utils/api";
import { TPost } from "../utils/api/types";

interface HomePageProps {
  posts: TPost[];
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <PostLayout>
      <div className="posts">
        {posts.map((obj: TPost) => (
          <Post
            key={obj.id}
            id={obj.id}
            title={obj.title}
            description={obj.description}
            date={obj.createdAt}
            userId={obj.user.id}
            userName={obj.user.name}
            categoryId={obj.category.id}
            categoryName={obj.category.name}
          />
        ))}
      </div>
      {/* <Pagination /> */}
    </PostLayout>
  );
};

export const getServerSideProps = async () => {
  try {
    const posts = await Api().post.getAll();
    return {
      props: {
        posts,
      },
    };
  } catch (err) {
    console.warn(err);
    alert("Ошибка при получении постов");
  }
  return {
    props: { posts: null },
  };
};

export default HomePage;
