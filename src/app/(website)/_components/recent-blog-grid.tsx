import React from "react";
import { BlogCard } from "./blog-card";

const RecentBlogGrid = ({ blogs }: { blogs: any[] }) => {
  return (
    <div className="max-w-screen-2xl  mx-auto px-4 my-10">
      {/* <h2 className="text-2xl font-bold mb-4">Recent Blog Posts</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogs && blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>
    </div>
  );
};

export default RecentBlogGrid;
