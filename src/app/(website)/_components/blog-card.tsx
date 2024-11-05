"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { User2 } from "lucide-react";
import { Post, User } from "@prisma/client";

type PostWithAuthor = Post & { author: User };

export const BlogCard = ({ blog }: { blog: PostWithAuthor }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Card>
      <CardHeader>
        <div className="w-full h-[250px] bg-gray-200 rounded-lg"></div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <CardTitle className="text-lg font-semibold min-h-14">
            {blog.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 flex-1">
            <div
              className="line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: blog.content?.slice(0, 200) || "",
              }}
            ></div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User2 className="w-4 h-4" />
              </div>
              <span className="text-sm text-gray-500">
                By {blog?.author?.name}
              </span>
            </div>
          </CardDescription>
          <Button variant="outline" size="sm" asChild className="mt-2">
            <Link href={`/posts/${blog?.id}`}>Read more</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
