import React from "react";
import { PostForm } from "../_components/post-form";

const getPost = async (postId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const NewPostPage = async ({ params }: { params: any }) => {
  const { postId } = await params;
  const post = await getPost(postId);
  console.log(post);
  return (
    <div>
      <h1 className="text-2xl font-bold">Update Post</h1>
      <p className="text-sm text-muted-foreground">Update your post.</p>
      <div className="mt-4 border rounded-lg p-4">
        <PostForm post={post} />
      </div>
    </div>
  );
};

export default NewPostPage;
