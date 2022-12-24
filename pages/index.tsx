import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { Pagination, Post, Sidebar } from "../components";
import { PostLayout } from "../layouts/PostLayout";
import { Api } from "../utils/api";
import { TPost } from "../utils/api/types";
import React from "react";

export interface HomePageProps {
  total: number;
  posts: TPost[];
}

const HomePage: NextPage = ({  }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [total, setTotal] = React.useState<number>(0);
  const [items, setItems] = React.useState<TPost[]>([]);
  const limit = 3;

  React.useEffect(() => {
    (async () => {
      try {
        window.scrollTo(0, 0);
        const params = {
          limit,
          page: currentPage,
        };
        const posts = await Api().post.getAll(params);
        setTotal(posts.total);
        setItems(posts.posts);
      } catch (err) {
        console.warn(err);
        alert("Ошибка при получении постов");
      }
    })();
  }, [currentPage]);

  return (
    <PostLayout>
      <div className="posts">
        {items.map((obj: TPost) => (
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
      <Pagination limit={limit} total={total} setCurrentPage={setCurrentPage} />
    </PostLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   try {
//     const params = {
//       limit: 2,
//       page: 1,
//     };
//     const posts = await Api().post.getAll(params);

//     return {
//       props: {
//         total: posts.total,
//         posts: posts.posts,
//       },
//     };
//   } catch (err) {
//     console.warn(err);
//     alert("Ошибка при получении постов");
//     return {
//       props: {
//         posts: null,
//       },
//     };
//   }
// };

export default HomePage;
