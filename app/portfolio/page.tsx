"use client";

import { useState, useEffect } from "react";


interface Portfolio {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPortfolios();
  }, []);

  async function fetchPortfolios() {
    setLoading(true);
    const res = await fetch("/api/portfolio");
    let data: any = { portfolios: [] };
    try {
      data = await res.json();
    } catch (e) {
      setError("Failed to parse server response.");
      console.error("Raw response:", res);
    }
    setPortfolios(data.portfolios || []);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const payload = { 
        title: title.trim(), 
        description: description.trim(), 
        imageUrl: imageUrl || '', 
        email: email?.trim() || '', 
        phone: phone?.trim() || '' 
      };

      if (!payload.title || !payload.description) {
        setError("Title and description are required.");
        setLoading(false);
        return;
      }

      const url = "/api/portfolio";
      const method = editingId ? "PUT" : "POST";
      const finalPayload = editingId ? { ...payload, id: editingId } : payload;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Failed to ${editingId ? 'update' : 'create'} portfolio`);
      }

      const data = await res.json();
      
      if (editingId) {
        setPortfolios(prev => prev.map(p => p.id === editingId ? data.portfolio : p));
        setEditingId(null);
      } else {
        setPortfolios(prev => [...prev, data.portfolio]);
      }

      // Reset form
      setTitle("");
      setDescription("");
      setImageUrl("");
      setEmail("");
      setPhone("");

      // Hide form after successful submission
      const form = document.getElementById("portfolioForm");
      if (form) {
        form.classList.add("hidden");
      }

    } catch (err) {
      console.error("Submission error:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(portfolio: Portfolio) {
    setEditingId(portfolio.id);
    setTitle(portfolio.title);
    setDescription(portfolio.description);
    setImageUrl(portfolio.imageUrl || "");
    setEmail(portfolio.email || "");
    setPhone(portfolio.phone || "");
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this portfolio item?")) return;
    setLoading(true);
    const res = await fetch("/api/portfolio", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setPortfolios((prev) => prev.filter((p) => p.id !== id));
    }
    setLoading(false);
  }

  function handleCancelEdit() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setImageUrl("");
    setEmail("");
    setPhone("");
  }

  
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
    
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/portfolio/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setImageUrl(data.url);
      } else {
        setError(data.error || 'Failed to upload file.');
      }
    } catch (err) {
      setError('Failed to upload file.');
    }
  }

  return (
    <main className="min-h-screen p-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 bg-gray-800 text-white p-4 -mx-6 -mt-6 rounded-t-lg">CRUD PORTFOLIO</h1>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Portfolio</h2>
            <button
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setDescription("");
                setImageUrl("");
                setEmail("");
                setPhone("");
                const form = document.getElementById("portfolioForm");
                if (form) {
                  form.classList.remove("hidden");
                }
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              + Add Project
            </button>
          </div>

          <form
            id="portfolioForm"
            onSubmit={handleSubmit}
            className={`mb-8 bg-white rounded-lg border p-4 ${!editingId && !title ? 'hidden' : ''}`}
          >
            <div className="grid gap-4">
              <input
                className="p-2 rounded border text-gray-800"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="p-2 rounded border text-gray-800"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="file"
                accept="image/*,application/pdf"
                className="p-2 rounded border text-gray-800"
                onChange={handleFileChange}
              />
              <input
                className="p-2 rounded border text-gray-800"
                placeholder="Email (optional)"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="p-2 rounded border text-gray-800"
                placeholder="Phone (optional)"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {imageUrl && (
                <div className="mb-2">
                  {imageUrl.match(/\.pdf$/i) ? (
                    <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View PDF</a>
                  ) : (
                    <img src={imageUrl} alt="Preview" className="max-h-32 rounded" />
                  )}
                </div>
              )}
              {error && <div className="text-red-500">{error}</div>}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  disabled={loading || !title.trim() || !description.trim()}
                >
                  {editingId ? "Update" : "Add"} Project
                </button>
                <button 
                  type="button" 
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors" 
                  onClick={() => {
                    handleCancelEdit();
                    const form = document.getElementById("portfolioForm");
                    if (form) {
                      form.classList.add("hidden");
                    }
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-gray-800 font-semibold">#</th>
                  <th className="text-left py-3 px-4 text-gray-800 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 text-gray-800 font-semibold">Description</th>
                  <th className="text-left py-3 px-4 text-gray-800 font-semibold">Phone</th>
                  <th className="text-left py-3 px-4 text-gray-800 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 text-gray-800 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-600">Loading...</td>
                  </tr>
                ) : portfolios.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-600">No projects found</td>
                  </tr>
                ) : (
                  portfolios.map((portfolio, index) => (
                    <tr key={portfolio.id} className="border-b">
                      <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                      <td className="py-3 px-4 text-gray-800">{portfolio.title}</td>
                      <td className="py-3 px-4 text-gray-800">{portfolio.description}</td>
                      <td className="py-3 px-4 text-gray-800">{portfolio.phone || '-'}</td>
                      <td className="py-3 px-4 text-gray-800">{portfolio.email || '-'}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(portfolio)}
                            className="border border-gray-400 text-gray-600 px-4 py-1 rounded hover:bg-gray-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(portfolio.id)}
                            className="border border-red-400 text-red-600 px-4 py-1 rounded hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
} 