import React from "react";
import { PostForm } from "../_components/post-form";

const NewPostPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Create Post</h1>
      <p className="text-sm text-muted-foreground">
        Create a new post for your blog.
      </p>
      <div className="mt-4 border rounded-lg p-4">
        <PostForm />
      </div>
    </div>
  );
};

export default NewPostPage;
