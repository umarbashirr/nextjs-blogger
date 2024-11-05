import * as z from "zod";

export const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  published: z.boolean().optional(),
});

export type PostSchema = z.infer<typeof postSchema>;
