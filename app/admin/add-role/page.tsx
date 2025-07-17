"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AddRolePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [permissions, setPermissions] = useState<object[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/permissions')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.permissions)) {
          setPermissions(data.permissions);
        }
      });
  }, []);

  function handlePermissionChange(id: number) {
    setSelectedPermissions(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent, resetAfter = false) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, permissionIds: selectedPermissions }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Role added successfully!");
        if (resetAfter) {
          setName("");
          setDescription("");
          setSelectedPermissions([]);
        } else {
          setTimeout(() => router.push('/admin/dashboard'), 1000);
        }
      } else {
        setMessage(data.error || "Failed to add role");
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
        <h1 className="text-2xl font-bold mb-6 text-amber-600 dark:text-amber-400">Add New Role</h1>
        <form className="flex flex-col gap-4" onSubmit={e => handleSubmit(e, false)}>
          <input className="p-2 rounded border" placeholder="Role Name" value={name} onChange={e => setName(e.target.value)} required />
          <input className="p-2 rounded border" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
          <div className="text-left">
            <div className="font-semibold mb-2">Permissions:</div>
            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
              {permissions.map(perm => (
                <label key={perm.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(perm.id)}
                    onChange={() => handlePermissionChange(perm.id)}
                  />
                  {perm.name}
                </label>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <button type="submit" className="flex-1 bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition disabled:opacity-50" disabled={loading}>{loading ? "Saving..." : "Save"}</button>
            <button type="button" className="flex-1 bg-amber-400 text-white py-2 rounded hover:bg-amber-500 transition" disabled={loading} onClick={e => handleSubmit(e, true)}>Save and New</button>
            <button type="button" className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition" onClick={handleCancel} disabled={loading}>Cancel</button>
          </div>
        </form>
        {message && <div className="mt-4 text-center text-sm text-amber-600 dark:text-amber-400">{message}</div>}
      </div>
    </div>
  );
} 