import { api } from "../utils/trpc.js";

export function useContact(id: number) {
  return api.contacts.getById.useQuery({ id });
}
