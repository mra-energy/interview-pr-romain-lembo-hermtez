import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../utils/trpc.js";

interface CommentFormProps {
  contactId: number;
  hideAuthorField?: boolean;
}

const commentFormSchema = z.object({
  contactId: z.number(),
  body: z.string().min(1, "Comment body is required"),
  authorName: z.string().min(1, "Author name is required"),
});

type CommentFormData = z.infer<typeof commentFormSchema>;

export function CommentForm({ contactId, hideAuthorField }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { contactId },
  });

  const createComment = api.comments.create.useMutation({
    onSuccess: () => {
      reset({ contactId, body: "", authorName: "" });
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => createComment.mutate(data))} className="space-y-3">
      <input type="hidden" {...register("contactId", { valueAsNumber: true })} />

      {!hideAuthorField && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            {...register("authorName")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter your name"
          />
          {errors.authorName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.authorName.message}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          {...register("body")}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Write a comment..."
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? "Adding..." : "Add Comment"}
      </button>
    </form>
  );
}
