import { api } from "../utils/trpc.js";

export function useContacts() {
  return api.contacts.list.useQuery();
}
