import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { companies, contacts, comments } from "./schema.js";

const sqlite = new Database("crm.db");
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

const db = drizzle(sqlite);

// Create tables
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    industry TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_id INTEGER REFERENCES companies(id),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    author_name TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Seed data
const seedCompanies = [
  { name: "Acme Corp", industry: "Technology" },
  { name: "Globex Inc", industry: "Manufacturing" },
  { name: "Initech", industry: "Software" },
];

const companyIds = seedCompanies.map((company) => {
  const result = db.insert(companies).values(company).returning().get();
  return result.id;
});

const seedContacts = [
  { name: "Alice Johnson", email: "alice@acme.com", phone: "+1-555-0101", companyId: companyIds[0] },
  { name: "Bob Smith", email: "bob@globex.com", phone: "+1-555-0102", companyId: companyIds[1] },
  { name: "Carol Williams", email: "carol@initech.com", phone: null, companyId: companyIds[2] },
  { name: "Dave Brown", email: "dave@acme.com", phone: "+1-555-0104", companyId: companyIds[0] },
  { name: "Eve Davis", email: "eve@example.com", phone: null, companyId: null },
  { name: "Frank Miller", email: "frank@globex.com", phone: "+1-555-0106", companyId: companyIds[1] },
  { name: "Grace Lee", email: "grace@acme.com", phone: "+1-555-0107", companyId: companyIds[0] },
  { name: "Hank Wilson", email: "hank@initech.com", phone: "+1-555-0108", companyId: companyIds[2] },
  { name: "Ivy Chen", email: "ivy@example.com", phone: "+1-555-0109", companyId: null },
  { name: "Jack Thompson", email: "jack@globex.com", phone: null, companyId: companyIds[1] },
  { name: "Karen Martinez", email: "karen@acme.com", phone: "+1-555-0111", companyId: companyIds[0] },
  { name: "Leo Nguyen", email: "leo@initech.com", phone: null, companyId: companyIds[2] },
  { name: "Mia Patel", email: "mia@example.com", phone: "+1-555-0113", companyId: null },
  { name: "Noah Garcia", email: "noah@globex.com", phone: "+1-555-0114", companyId: companyIds[1] },
  { name: "Olivia Robinson", email: "olivia@acme.com", phone: null, companyId: companyIds[0] },
];

const contactIds = seedContacts.map((contact) => {
  const result = db.insert(contacts).values(contact).returning().get();
  return result.id;
});

const seedComments = [
  { contactId: contactIds[0], body: "Had a great intro call. Very interested in our enterprise plan.", authorName: "Sarah" },
  { contactId: contactIds[0], body: "Sent follow-up proposal. Awaiting feedback.", authorName: "Mike" },
  { contactId: contactIds[1], body: "Met at the trade show. Wants a demo next week.", authorName: "Sarah" },
  { contactId: contactIds[2], body: "Initial outreach — no response yet.", authorName: "Mike" },
  { contactId: contactIds[3], body: "Referred by Alice. Set up meeting for Thursday.", authorName: "Sarah" },
];

seedComments.forEach((comment) => {
  db.insert(comments).values(comment).run();
});

console.log("Seeded database with:");
console.log(`  ${seedCompanies.length} companies`);
console.log(`  ${seedContacts.length} contacts`);
console.log(`  ${seedComments.length} comments`);

sqlite.close();
