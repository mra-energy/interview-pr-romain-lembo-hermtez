import { router } from "../middleware/trpc.js";
import { contactRouter } from "./contact-router.js";
import { companyRouter } from "./company-router.js";
import { commentRouter } from "./comment-router.js";

export const appRouter = router({
  contacts: contactRouter,
  companies: companyRouter,
  comments: commentRouter,
});

export type AppRouter = typeof appRouter;
