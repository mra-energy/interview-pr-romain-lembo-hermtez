import { z } from "zod";

export const companySchema = z.object({
  id: z.number(),
  name: z.string(),
  industry: z.string().nullable(),
  createdAt: z.string(),
});

export const createCompanySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  industry: z.string().nullable().optional(),
});

export const updateCompanySchema = createCompanySchema.partial().extend({
  id: z.number(),
});

export type Company = z.infer<typeof companySchema>;
export type CreateCompany = z.infer<typeof createCompanySchema>;
export type UpdateCompany = z.infer<typeof updateCompanySchema>;
