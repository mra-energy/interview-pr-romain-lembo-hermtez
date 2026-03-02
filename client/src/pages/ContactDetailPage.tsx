import { useParams, Link } from "react-router-dom";
import { useContact } from "../hooks/use-contact.js";
import { useComments } from "../hooks/useComments.js";
import CommentList from "../components/CommentList.js";
import { CommentForm } from "../components/CommentForm.js";

export function ContactDetailPage() {
  const { id } = useParams<{ id: string }>();
  const contactId = Number(id);
  const { data: contact, isLoading, error } = useContact(contactId);
  const {
    data: comments,
    isLoading: commentsLoading,
  } = useComments(contactId);

  if (isLoading) {
    return <p className="text-gray-500">Loading contact...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error loading contact: {error.message}</p>;
  }

  if (!contact) {
    return <p className="text-gray-500">Contact not found.</p>;
  }

  return (
    <div>
      <Link to="/" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
        &larr; Back to contacts
      </Link>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{contact.name}</h2>
        <div className="space-y-2 text-gray-600">
          <p>
            <span className="font-medium">Email:</span> {contact.email}
          </p>
          {contact.phone && (
            <p>
              <span className="font-medium">Phone:</span> {contact.phone}
            </p>
          )}
          {contact.company && (
            <p>
              <span className="font-medium">Company:</span> {contact.company.name}
            </p>
          )}
          <p className="text-sm text-gray-400">
            Created: {new Date(contact.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments</h3>

        {commentsLoading ? (
          <p className="text-gray-500 text-sm">Loading comments...</p>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-3">
              {comments.length} comment{comments.length !== 1 ? "s" : ""}
            </p>
            <CommentList comments={comments} />
          </>
        )}

        <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-md font-semibold text-gray-900 mb-3">Add a Comment</h4>
          <CommentForm contactId={contactId} />
        </div>
      </div>
    </div>
  );
}
