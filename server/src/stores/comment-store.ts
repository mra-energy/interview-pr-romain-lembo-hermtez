import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { comments } from "../db/schema.js";
import type { CreateComment } from "@pr-exercise/shared";

export const commentStore = {
  findByContactId(contactId: number) {
    return db.query.comments.findMany({
      where: eq(comments.contactId, contactId),
      orderBy: (comments, { desc }) => [desc(comments.createdAt)],
    });
  },

  add(data: CreateComment) {
    return db
      .insert(comments)
      .values({
        contactId: data.contactId,
        body: data.body,
        authorName: data.authorName,
      })
      .returning()
      .get();
  },

  delete(id: number) {
    return db.delete(comments).where(eq(comments.id, id)).returning().get();
  },
};
