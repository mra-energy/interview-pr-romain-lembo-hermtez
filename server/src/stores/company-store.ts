import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { companies } from "../db/schema.js";
import type { CreateCompany, UpdateCompany } from "@pr-exercise/shared";

export const companyStore = {
  findAll() {
    return db.query.companies.findMany({
      orderBy: (companies, { asc }) => [asc(companies.name)],
    });
  },

  findById(id: number) {
    return db.query.companies.findFirst({
      where: eq(companies.id, id),
    });
  },

  create(data: CreateCompany) {
    return db
      .insert(companies)
      .values({
        name: data.name,
        industry: data.industry ?? null,
      })
      .returning()
      .get();
  },

  update(data: UpdateCompany) {
    const { id, ...fields } = data;
    return db
      .update(companies)
      .set(fields)
      .where(eq(companies.id, id))
      .returning()
      .get();
  },

  delete(id: number) {
    return db.delete(companies).where(eq(companies.id, id)).returning().get();
  },
};
