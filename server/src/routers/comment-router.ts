import { z } from "zod";
import { eq } from "drizzle-orm";
import { publicProcedure, router } from "../middleware/trpc.js";
import { commentStore } from "../stores/comment-store.js";
import { createCommentSchema } from "@pr-exercise/shared";
import type { Comment } from "@pr-exercise/shared";
import { db } from "../db/index.js";
import { comments, contacts } from "../db/schema.js";

export const commentRouter = router({
  listByContact: publicProcedure
    .input(z.object({ contactId: z.number() }))
    .query(async ({ input }) => {
      const cmts = await commentStore.findByContactId(input.contactId);

      const result = [];
      for (const c of cmts) {
        const ct = await db.query.contacts.findFirst({
          where: eq(contacts.id, c.contactId),
        });
        result.push({
          ...c,
          contactName: ct!.name,
        });
      }

      return result;
    }),

  create: publicProcedure
    .input(createCommentSchema)
    .mutation(({ input }) => {
      console.log("Creating comment:", input);
      return commentStore.add(input);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      const deleted = db
        .delete(comments)
        .where(eq(comments.id, input.id))
        .returning()
        .get();
      return deleted as Comment;
    }),
});
