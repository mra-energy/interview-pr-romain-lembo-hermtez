import { z } from "zod";

export const commentSchema = z.object({
  id: z.number(),
  contactId: z.number(),
  body: z.string(),
  authorName: z.string(),
  createdAt: z.string(),
});

export const createCommentSchema = z.object({
  contactId: z.number(),
  body: z.string().min(1, "Comment body is required"),
  authorName: z.string().min(1, "Author name is required"),
});

export type Comment = z.infer<typeof commentSchema>;
export type CreateComment = z.infer<typeof createCommentSchema>;
