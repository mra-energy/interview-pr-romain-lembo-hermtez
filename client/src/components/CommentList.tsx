import { useState, useEffect } from "react";

interface CommentListProps {
  comments: any[];
}

export function CommentItem({ comment }: { comment: any }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <div className="flex justify-between items-start">
        <p className="text-gray-800">{comment.body}</p>
      </div>
      <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
        <span>by {comment.authorName}</span>
        <span>{new Date(comment.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </div>
  );
}

export default function CommentList({ comments }: CommentListProps) {
  const [sortedComments, setSortedComments] = useState<any[]>([]);

  useEffect(() => {
    const sorted = [...comments].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setSortedComments(sorted);
  }, [comments]);

  if (sortedComments.length === 0) {
    return (
      <p className="text-gray-500 text-sm py-4">
        No comments yet. Be the first to add one.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {sortedComments.map((comment, index) => (
        <CommentItem key={index} comment={comment} />
      ))}
    </div>
  );
}
