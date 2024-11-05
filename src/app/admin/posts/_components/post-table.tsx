import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EyeIcon, Pencil, Trash } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "Post 1",
    description: "Description 1",
    isPublished: false,
  },
  {
    id: 2,
    title: "Post 2",
    description: "Description 2",
    isPublished: "Published",
  },
];

export function PostsTable() {
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
        {posts.map((post, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell colSpan={2}>{post.description}</TableCell>
            <TableCell>{post.isPublished ? "Published" : "Draft"}</TableCell>
            <TableCell className="flex items-center justify-end gap-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/posts/${post.id}`} target="_blank">
                  <EyeIcon className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon">
                <Pencil className="w-4 h-4" />
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
