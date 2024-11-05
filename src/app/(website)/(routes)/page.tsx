import React from "react";
import RecentBlogGrid from "../_components/recent-blog-grid";

const blogs = [
  {
    id: "1",
    title: "Blog 1",
    description: "Blog 1 description",
  },
  {
    id: "2",
    title: "Blog 2",
    description: "Blog 2 description",
  },
];

const WebsiteLandingPage = () => {
  return (
    <div>
      <RecentBlogGrid blogs={blogs} />
    </div>
  );
};

export default WebsiteLandingPage;
