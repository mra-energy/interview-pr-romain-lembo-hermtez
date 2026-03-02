import { z } from "zod";
import { publicProcedure, router } from "../middleware/trpc.js";
import { companyStore } from "../stores/company-store.js";
import { createCompanySchema, updateCompanySchema } from "@pr-exercise/shared";

export const companyRouter = router({
  list: publicProcedure.query(() => {
    return companyStore.findAll();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return companyStore.findById(input.id);
    }),

  create: publicProcedure
    .input(createCompanySchema)
    .mutation(({ input }) => {
      return companyStore.create(input);
    }),

  update: publicProcedure
    .input(updateCompanySchema)
    .mutation(({ input }) => {
      return companyStore.update(input);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return companyStore.delete(input.id);
    }),
});
