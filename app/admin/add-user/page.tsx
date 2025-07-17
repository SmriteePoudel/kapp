"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, roles: [role] }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("User added successfully!");
        setName("");
        setEmail("");
        setRole("USER");
        setTimeout(() => router.push('/admin/dashboard'), 1000);
      } else {
        setMessage(data.error || "Failed to add user");
      }
    } catch {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    router.push('/admin/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-amber-100 dark:from-slate-900 dark:to-slate-800">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-rose-600 dark:text-rose-400">Add New User</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input className="p-2 rounded border" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input className="p-2 rounded border" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <select className="p-2 rounded border" value={role} onChange={e => setRole(e.target.value)} required>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="flex-1 bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition disabled:opacity-50" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
            <button type="button" className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition" onClick={handleCancel} disabled={loading}>Cancel</button>
          </div>
        </form>
        {message && <div className="mt-4 text-center text-sm text-rose-600 dark:text-rose-400">{message}</div>}
      </div>
    </div>
  );
} 