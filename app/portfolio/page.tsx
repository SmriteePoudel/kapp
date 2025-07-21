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
    const payload = { title, description, imageUrl, email, phone };
    let res, data: any;
    if (editingId) {
      res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, id: editingId }),
      });
      data = await res.json();
      if (res.ok) {
        setPortfolios((prev) => prev.map((p) => (p.id === editingId ? data.portfolio : p)));
        setEditingId(null);
        setTitle("");
        setDescription("");
        setImageUrl("");
        setEmail("");
        setPhone("");
      } else {
        setError(data.error || "Failed to update portfolio");
      }
    } else {
      res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      data = await res.json();
      if (res.ok) {
        setPortfolios((prev) => [...prev, data.portfolio]);
        setTitle("");
        setDescription("");
        setImageUrl("");
        setEmail("");
        setPhone("");
      } else {
        setError(data.error || "Failed to add portfolio");
      }
    }
    setLoading(false);
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
    
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 py-16 px-4">
      <h1 className="text-4xl font-bold text-amber-600 dark:text-amber-500 mb-4">Portfolio </h1>
      <form onSubmit={handleSubmit} className="mb-8 w-full max-w-lg bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col gap-4">
        <input
          className="p-2 rounded border"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="p-2 rounded border"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*,application/pdf"
          className="p-2 rounded border"
          onChange={handleFileChange}
        />
        <input
          className="p-2 rounded border"
          placeholder="Email (optional)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="p-2 rounded border"
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
            className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
            disabled={loading || !title.trim() || !description.trim()}
          >
            {editingId ? "Update" : "Add"} Portfolio
          </button>
          {editingId && (
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        {loading && <div>Loading...</div>}
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="bg-white dark:bg-slate-800 rounded-xl shadow p-6 flex flex-col">
            <h2 className="text-2xl font-semibold text-rose-600 dark:text-rose-400 mb-2">{portfolio.title}</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">{portfolio.description}</p>
            {portfolio.imageUrl && (
              <img src={portfolio.imageUrl} alt={portfolio.title} className="mb-4 rounded" />
            )}
            {portfolio.email && (
              <p className="text-slate-500 dark:text-slate-400 mb-1">Email: {portfolio.email}</p>
            )}
            {portfolio.phone && (
              <p className="text-slate-500 dark:text-slate-400 mb-1">Phone: {portfolio.phone}</p>
            )}
            <div className="flex gap-2 mt-auto">
              <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(portfolio)}>
                Edit
              </button>
              <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(portfolio.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 