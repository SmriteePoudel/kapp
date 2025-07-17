"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const sections = [
  { key: 'roles', label: 'Roles' },
  { key: 'users', label: 'Users' },
  { key: 'permissions', label: 'Permissions' },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('roles');
  const router = useRouter();
  const [roles, setRoles] = useState<object[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [rolesError, setRolesError] = useState("");
  const [users, setUsers] = useState<object[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [permissions, setPermissions] = useState<object[]>([]);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [permissionsError, setPermissionsError] = useState("");

  useEffect(() => {
    if (activeSection === 'roles') {
      setRolesLoading(true);
      setRolesError("");
      fetch('/api/admin/roles')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data.roles)) {
            setRoles(data.roles);
          } else {
            setRoles([]);
            setRolesError(data.error || "Failed to fetch roles");
          }
        })
        .catch(() => setRolesError("Failed to fetch roles"))
        .finally(() => setRolesLoading(false));
    }
    if (activeSection === 'users') {
      setUsersLoading(true);
      setUsersError("");
      fetch('/api/admin/users')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data.users)) {
            setUsers(data.users);
          } else {
            setUsers([]);
            setUsersError(data.error || "Failed to fetch users");
          }
        })
        .catch(() => setUsersError("Failed to fetch users"))
        .finally(() => setUsersLoading(false));
    }
    if (activeSection === 'permissions') {
      setPermissionsLoading(true);
      setPermissionsError("");
      fetch('/api/admin/permissions')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data.permissions)) {
            setPermissions(data.permissions);
          } else {
            setPermissions([]);
            setPermissionsError(data.error || "Failed to fetch permissions");
          }
        })
        .catch(() => setPermissionsError("Failed to fetch permissions"))
        .finally(() => setPermissionsLoading(false));
    }
  }, [activeSection]);

  function handleDeleteRole(id: number) {
    if (!window.confirm('Are you sure you want to delete this role?')) return;
    fetch(`/api/admin/roles?id=${id}`, {
      method: 'DELETE',
    })
      .then(async res => {
        if (res.ok) {
          setRoles(roles => roles.filter(role => role.id !== id));
        } else {
          let data = {};
          try {
            data = await res.json();
          } catch {}
          alert(data.error || 'Failed to delete role');
        }
      })
      .catch(() => alert('Failed to delete role'));
  }

  function handleDeleteUser(id: number) {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    fetch(`/api/admin/users?id=${id}`, {
      method: 'DELETE',
    })
      .then(async res => {
        if (res.ok) {
          setUsers(users => users.filter(user => user.id !== id));
        } else {
          let data = {};
          try {
            data = await res.json();
          } catch {}
          alert((data as any).error || 'Failed to delete user');
        }
      })
      .catch(() => alert('Failed to delete user'));
  }

  function handleDeletePermission(id: number) {
    if (!window.confirm('Are you sure you want to delete this permission?')) return;
    fetch(`/api/admin/permissions?id=${id}`, {
      method: 'DELETE',
    })
      .then(async res => {
        if (res.ok) {
          setPermissions(permissions => permissions.filter(perm => perm.id !== id));
        } else {
          let data = {};
          try {
            data = await res.json();
          } catch {}
          alert((data as any).error || 'Failed to delete permission');
        }
      })
      .catch(() => alert('Failed to delete permission'));
  }

  function renderSection() {
    if (activeSection === 'roles') {
      return (
        <div className="w-full max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Roles</h2>
            <button
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
              onClick={() => router.push('/admin/add-role')}
            >
              + Add Role
            </button>
          </div>
          <table className="w-full border rounded bg-white dark:bg-slate-900">
            <thead>
              <tr>
                <th className="p-2 border-b text-left">Role Name</th>
                <th className="p-2 border-b text-left">Description</th>
                <th className="p-2 border-b text-left">Permissions</th>
                <th className="p-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rolesLoading && (
                <tr>
                  <td colSpan={3}>Loading roles...</td>
                </tr>
              )}
              {rolesError && (
                <tr>
                  <td colSpan={3} className="text-red-500">{rolesError}</td>
                </tr>
              )}
              {roles.map(role => (
                <tr key={role.id}>
                  <td className="p-2 border-b">{role.name}</td>
                  <td className="p-2 border-b">{role.description}</td>
                  <td className="p-2 border-b">{role.permissions ? role.permissions.map((p: any) => p.name).join(', ') : ''}</td>
                  <td className="p-2 border-b">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => router.push(`/admin/edit-role/${role.id}`)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteRole(role.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (activeSection === 'users') {
      return (
        <div className="w-full max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Users</h2>
            <button
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
              onClick={() => router.push('/admin/add-user')}
            >
              + Add User
            </button>
          </div>
          {usersLoading && <div>Loading users...</div>}
          {usersError && <div className="text-red-500 mb-2">{usersError}</div>}
          <table className="w-full border rounded bg-white dark:bg-slate-900">
            <thead>
              <tr>
                <th className="p-2 border-b text-left">Name</th>
                <th className="p-2 border-b text-left">Email</th>
                <th className="p-2 border-b text-left">Roles</th>
                <th className="p-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="p-2 border-b">{user.name}</td>
                  <td className="p-2 border-b">{user.email}</td>
                  <td className="p-2 border-b">{Array.isArray(user.roles) ? user.roles.join(', ') : user.roles}</td>
                  <td className="p-2 border-b">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => router.push(`/admin/edit-user/${user.id}`)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (activeSection === 'permissions') {
      return (
        <div className="w-full max-w-xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Permissions</h2>
            <button
              className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition"
              onClick={() => router.push('/admin/add-permission')}
            >
              + Add Permission
            </button>
          </div>
          {permissionsLoading && <div>Loading permissions...</div>}
          {permissionsError && <div className="text-red-500 mb-2">{permissionsError}</div>}
          <table className="w-full border rounded bg-white dark:bg-slate-900">
            <thead>
              <tr>
                <th className="p-2 border-b text-left">Permission Name</th>
                <th className="p-2 border-b text-left">Description</th>
                <th className="p-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map(perm => (
                <tr key={perm.id}>
                  <td className="p-2 border-b">{perm.name}</td>
                  <td className="p-2 border-b">{perm.description}</td>
                  <td className="p-2 border-b">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => router.push(`/admin/edit-permission/${perm.id}`)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDeletePermission(perm.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-rose-100 to-amber-100 dark:from-slate-900 dark:to-slate-800">
      
      <aside className="w-64 bg-white dark:bg-slate-900 shadow-xl p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-8">Admin Dashboard</h1>
        <nav className="flex flex-col gap-2 mb-6">
          {sections.map(section => (
            <button
              key={section.key}
              className={`text-left px-4 py-2 rounded transition font-medium ${activeSection === section.key ? 'bg-rose-200 dark:bg-rose-700 text-rose-900 dark:text-white' : 'hover:bg-rose-100 dark:hover:bg-slate-800'}`}
              onClick={() => setActiveSection(section.key)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </aside>
      
      <main className="flex-1 p-10 flex flex-col items-center justify-center">
        {renderSection()}
      </main>
    </div>
  );
} 