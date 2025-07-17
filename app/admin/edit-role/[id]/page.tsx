"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditRolePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/admin/roles?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.role) {
          setName(data.role.name);
          setDescription(data.role.description);
        } else {
          setMessage(data.error || "Role not found");
        }
      })
      .catch(() => setMessage("Failed to fetch role"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/roles?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Role updated successfully!");
        setTimeout(() => router.push('/admin/dashboard'), 1000);
      } else {
        setMessage(data.error || "Failed to update role");
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
        <h1 className="text-2xl font-bold mb-6 text-amber-600 dark:text-amber-400">Edit Role</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input className="p-2 rounded border" placeholder="Role Name" value={name} onChange={e => setName(e.target.value)} required />
          <input className="p-2 rounded border" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
          <div className="flex gap-2 mt-2">
            <button type="submit" className="flex-1 bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition disabled:opacity-50" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
            <button type="button" className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition" onClick={handleCancel} disabled={loading}>Cancel</button>
          </div>
        </form>
        {message && <div className="mt-4 text-center text-sm text-amber-600 dark:text-amber-400">{message}</div>}
      </div>
    </div>
  );
} 