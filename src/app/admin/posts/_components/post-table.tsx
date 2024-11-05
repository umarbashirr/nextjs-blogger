"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { handleLogout } from "@/app/auth/auth.service";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ERROR_MESSAGES } from "@/constants";
import { Post } from "@prisma/client";
import { EyeIcon, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

export default function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts/users");
      const data = await response.json();
      if (data.message === ERROR_MESSAGES.JWT_EXPIRED) {
        handleLogout();
      }
      setPosts(data);
      toast.success("Posts fetched successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Table className="whitespace-nowrap">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">S.No.</TableHead>
          <TableHead>Title</TableHead>
          <TableHead colSpan={2}>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts &&
          posts.map((post, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium ">{index + 1}</TableCell>
              <TableCell className="text-wrap">{post.title}</TableCell>
              <TableCell colSpan={2} className="text-wrap">
                <div
                  className="unreset"
                  dangerouslySetInnerHTML={{
                    __html: post.content?.slice(0, 100) + "...",
                  }}
                />
              </TableCell>
              <TableCell>
                {post.published ? (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    Published
                  </Badge>
                ) : (
                  <Badge className="bg-red-500 hover:bg-red-600">Draft</Badge>
                )}
              </TableCell>
              <TableCell className="flex items-center justify-end gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/posts/${post.id}`} target="_blank">
                    <EyeIcon className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/admin/posts/${post.id}`}>
                    <Pencil className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
