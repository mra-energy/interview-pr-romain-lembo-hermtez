import { useState } from "react";
import { useContacts } from "../hooks/use-contacts.js";
import { ContactCard } from "../components/ContactCard.js";
import { ContactForm } from "../components/ContactForm.js";

export function ContactListPage() {
  const { data: contacts, isLoading, error } = useContacts();
  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return <p className="text-gray-500">Loading contacts...</p>;
  }

  if (error) {
    return <p className="text-red-600">Error loading contacts: {error.message}</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Contacts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "New Contact"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Create Contact</h3>
          <ContactForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      <div className="space-y-3">
        {contacts?.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
        {contacts?.length === 0 && (
          <p className="text-gray-500 text-center py-8">No contacts yet. Create one to get started.</p>
        )}
      </div>
    </div>
  );
}
