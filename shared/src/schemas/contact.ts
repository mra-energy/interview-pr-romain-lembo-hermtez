import { z } from "zod";

export const contactSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  companyId: z.number().nullable(),
  createdAt: z.string(),
});

export const createContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().nullable().optional(),
  companyId: z.number().nullable().optional(),
});

export const updateContactSchema = createContactSchema.partial().extend({
  id: z.number(),
});

export type Contact = z.infer<typeof contactSchema>;
export type CreateContact = z.infer<typeof createContactSchema>;
export type UpdateContact = z.infer<typeof updateContactSchema>;
