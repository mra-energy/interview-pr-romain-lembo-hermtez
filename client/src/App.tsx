import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContactListPage } from "./pages/ContactListPage.js";
import { ContactDetailPage } from "./pages/ContactDetailPage.js";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-xl font-bold text-gray-900">
              <a href="/">Contact CRM</a>
            </h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ContactListPage />} />
            <Route path="/contacts/:id" element={<ContactDetailPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
