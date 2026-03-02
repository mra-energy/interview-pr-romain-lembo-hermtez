import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { api } from "./trpc.js";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

export const trpcClient = api.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});
