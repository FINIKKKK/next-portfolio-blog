import { Pagination, Post, Sidebar } from "../components";

import { PostLayout } from "../layouts/PostLayout";

const items = [{}, {}];

export default function Home() {
  return (
    <PostLayout>
      <div className="posts">
        {/* {items.map((obj: any) => (
          <Post key={obj.id} {...obj} />
        ))} */}
      </div>
      {/* <Pagination /> */}
    </PostLayout>
  );
}
