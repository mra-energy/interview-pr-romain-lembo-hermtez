import { Link } from "react-router-dom";
import type { Contact } from "@pr-exercise/shared";

interface ContactCardProps {
  contact: Contact & { company?: { name: string } | null };
}

export function ContactCard({ contact }: ContactCardProps) {
  return (
    <Link
      to={`/contacts/${contact.id}`}
      className="block bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
          <p className="text-sm text-gray-600">{contact.email}</p>
          {contact.phone && (
            <p className="text-sm text-gray-500">{contact.phone}</p>
          )}
        </div>
        {contact.company && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {contact.company.name}
          </span>
        )}
      </div>
    </Link>
  );
}
