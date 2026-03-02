import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { contacts } from "../db/schema.js";
import type { CreateContact, UpdateContact } from "@pr-exercise/shared";

export const contactStore = {
  findAll() {
    return db.query.contacts.findMany({
      with: { company: true },
      orderBy: (contacts, { desc }) => [desc(contacts.createdAt)],
    });
  },

  findById(id: number) {
    return db.query.contacts.findFirst({
      where: eq(contacts.id, id),
      with: { company: true },
    });
  },

  create(data: CreateContact) {
    return db
      .insert(contacts)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        companyId: data.companyId ?? null,
      })
      .returning()
      .get();
  },

  update(data: UpdateContact) {
    const { id, ...fields } = data;
    return db
      .update(contacts)
      .set(fields)
      .where(eq(contacts.id, id))
      .returning()
      .get();
  },

  delete(id: number) {
    return db.delete(contacts).where(eq(contacts.id, id)).returning().get();
  },
};
