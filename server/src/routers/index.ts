import { router } from "../middleware/trpc.js";
import { contactRouter } from "./contact-router.js";
import { companyRouter } from "./company-router.js";

export const appRouter = router({
  contacts: contactRouter,
  companies: companyRouter,
});

export type AppRouter = typeof appRouter;
