import React from "react";
import RecentBlogGrid from "../_components/recent-blog-grid";

const getPosts = async () => {
  const posts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
  return await posts.json();
};

const WebsiteLandingPage = async () => {
  const posts = await getPosts();
  return <RecentBlogGrid blogs={posts} />;
};

export default WebsiteLandingPage;
