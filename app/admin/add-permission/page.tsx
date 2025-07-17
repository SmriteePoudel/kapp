"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddPermissionPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent, resetAfter = false) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch('/api/admin/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Permission added successfully!');
        if (resetAfter) {
          setName('');
          setDescription('');
        } else {
          router.push('/admin/dashboard');
        }
      } else {
        setError(data.error || 'Failed to add permission');
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 to-amber-100 dark:from-slate-900 dark:to-slate-800">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-green-600 dark:text-green-400">Add New Permission</h1>
        <form className="flex flex-col gap-4" onSubmit={e => handleSubmit(e, false)}>
          <input
            className="p-2 rounded border"
            placeholder="Permission Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={loading}
          />
          <input
            className="p-2 rounded border"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            disabled={loading}
          />
          <div className="flex gap-2 justify-center">
            <button
              className={`bg-green-600 text-white py-2 px-4 rounded transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
              type="submit"
            >
              Save
            </button>
            <button
              className={`bg-blue-600 text-white py-2 px-4 rounded transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
              type="button"
              onClick={e => handleSubmit(e as any, true)}
            >
              Save & New
            </button>
            <button
              className="bg-gray-400 text-white py-2 px-4 rounded transition"
              type="button"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
          {success && <div className="text-green-600 mt-2">{success}</div>}
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
} 