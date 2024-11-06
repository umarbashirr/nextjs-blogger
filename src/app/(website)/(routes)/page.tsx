import React from "react";
import RecentBlogGrid from "../_components/recent-blog-grid";

const getPosts = async () => {
  const posts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
  const data = await posts.json();
  console.log(data);
  return data;
};

const WebsiteLandingPage = async () => {
  const posts = await getPosts();
  return (
    <div>
      {posts.length ? (
        <RecentBlogGrid blogs={posts} />
      ) : (
        <div className="flex justify-center items-center h-[calc(100vh-100px)]">
          <h1 className="text-2xl font-bold">No posts found</h1>
        </div>
      )}
    </div>
  );
};

export default WebsiteLandingPage;
