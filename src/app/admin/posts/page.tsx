import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";
import { PostsTable } from "./_components/post-table";
import Link from "next/link";

const PostsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">All Posts</h1>
          <p className="text-sm text-muted-foreground">
            Here you can manage all your posts. You can create, edit, and delete
          </p>
        </div>
        <div>
          <Button asChild>
            <Link className="flex items-center" href="/admin/posts/create">
              <PlusIcon className="w-4 h-4" />
              Create Post
            </Link>
          </Button>
        </div>
      </div>
      {/* Posts Table */}
      <div className="mt-4 border rounded-lg p-4 overflow-x-auto">
        <PostsTable />
      </div>
    </div>
  );
};

export default PostsPage;
