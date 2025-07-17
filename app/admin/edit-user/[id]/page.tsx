"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/admin/users?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setRoles(Array.isArray(data.user.roles) ? data.user.roles : []);
        } else {
          setMessage(data.error || "User not found");
        }
      })
      .catch(() => setMessage("Failed to fetch user"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, roles }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("User updated successfully!");
        setTimeout(() => router.push('/admin/dashboard'), 1000);
      } else {
        setMessage(data.error || "Failed to update user");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessage("User deleted successfully!");
        setTimeout(() => router.push('/admin/dashboard'), 1000);
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to delete user");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    router.push('/admin/dashboard');
  }

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setRoles([e.target.value]);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-amber-100 dark:from-slate-900 dark:to-slate-800">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-rose-600 dark:text-rose-400">Edit User</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input className="p-2 rounded border" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input className="p-2 rounded border" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <select className="p-2 rounded border" value={roles[0] || "USER"} onChange={handleRoleChange} required>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="flex-1 bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition disabled:opacity-50" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
            <button type="button" className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-700 transition" onClick={handleDelete} disabled={loading}>Delete</button>
            <button type="button" className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition" onClick={handleCancel} disabled={loading}>Cancel</button>
          </div>
        </form>
        {message && <div className="mt-4 text-center text-sm text-rose-600 dark:text-rose-400">{message}</div>}
      </div>
    </div>
  );
} 