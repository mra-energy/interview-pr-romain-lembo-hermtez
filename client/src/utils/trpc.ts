import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@pr-exercise/server/src/routers/index.js";

export const api = createTRPCReact<AppRouter>();
