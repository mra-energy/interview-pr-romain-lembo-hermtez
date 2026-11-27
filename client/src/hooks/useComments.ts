import { useState, useEffect } from "react";

export function useComments(contactId: number) {
  const [data, setData] = useState<unknown[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:3000/trpc/comments.listByContact?input=${encodeURIComponent(
        JSON.stringify({ contactId })
      )}`
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json.result.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [contactId]);

  return { data, isLoading, error };
}
