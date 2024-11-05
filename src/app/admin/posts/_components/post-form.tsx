"use client";

import { handleLogout } from "@/app/auth/auth.service";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ERROR_MESSAGES } from "@/constants";
import { postSchema, PostSchema } from "@/schemas/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";

const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false });

export const PostForm = ({ post }: { post?: Post }) => {
  const router = useRouter();
  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      published: post?.published || false,
    },
  });

  const onSubmit = async (data: PostSchema) => {
    try {
      let response;
      if (post) {
        response = await fetch(`/api/posts/${post.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch("/api/posts", {
          method: "POST",
          body: JSON.stringify(data),
        });
      }

      const posts = await response.json();

      if (posts.message === ERROR_MESSAGES.JWT_EXPIRED) {
        handleLogout();
      }

      if (response.ok) {
        toast.success(
          post ? "Post updated successfully!" : "Post created successfully!"
        );
        router.push("/admin/posts");
      }
    } catch (error: any) {
      console.error(error);
      if (error.message === "Unauthorized") {
        toast.error("You are not authorized to create a post");
        router.push("/auth/login");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "indent",
    "link",
    "image",
  ];

  const handleContentChange = (content: string) => {
    form.setValue("content", content);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Title"
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="h-[400px] relative mb-4">
          <QuillEditor
            theme="snow"
            value={form.getValues("content")}
            onChange={handleContentChange}
            modules={quillModules}
            formats={quillFormats}
            className="h-[calc(100%-50px)] "
          />
        </div>
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="text-sm font-medium">Published</FormLabel>
                <FormDescription>
                  Whether the post is published or not.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={form.formState.isSubmitting}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" asChild>
            <Link href="/admin/posts">Cancel</Link>
          </Button>
          <LoadingButton
            type="submit"
            isLoading={form.formState.isSubmitting}
            label={post ? "Updating Post" : "Creating Post"}
            className="w-fit"
          >
            {post ? "Update Post" : "Create Post"}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
