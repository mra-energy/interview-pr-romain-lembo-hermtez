import { z } from "zod";
import { publicProcedure, router } from "../middleware/trpc.js";
import { contactStore } from "../stores/contact-store.js";
import { createContactSchema, updateContactSchema } from "@pr-exercise/shared";

export const contactRouter = router({
  list: publicProcedure.query(() => {
    return contactStore.findAll();
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return contactStore.findById(input.id);
    }),

  create: publicProcedure
    .input(createContactSchema)
    .mutation(({ input }) => {
      return contactStore.create(input);
    }),

  update: publicProcedure
    .input(updateContactSchema)
    .mutation(({ input }) => {
      return contactStore.update(input);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => {
      return contactStore.delete(input.id);
    }),
});
