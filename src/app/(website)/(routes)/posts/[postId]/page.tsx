import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";

const getPostById = async (postId: string) => {
  try {
    const post = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${postId}`,
      {
        cache: "no-store",
      }
    );
    return await post.json();
  } catch (error) {
    console.log(error);
  }
};

const PublicSinglePostPage = async ({ params }: { params: any }) => {
  const { postId } = await params;
  const post = await getPostById(postId);
  return (
    <div className="w-full max-w-screen-2xl mx-auto p-4">
      <article className="p-10 mt-10 bg-gray-100 rounded-lg">
        <h1 className="text-4xl font-bold text-center">{post?.title}</h1>
        <div className="text-center text-sm text-gray-500 flex items-center justify-center gap-2 mt-4 mb-10">
          <div className="flex items-center justify-center p-2 bg-gray-200 rounded-full">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm">Written by {post?.author?.name}</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm">
            Last updated at {new Date(post?.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <div
          className="unreset"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />
      </article>
    </div>
  );
};

export default PublicSinglePostPage;
