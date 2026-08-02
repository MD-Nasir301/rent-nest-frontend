"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Search, ShieldAlert, ShieldCheck, UserX, UserCheck, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { getAllUsers, toggleBanUser } from "@/services/admin.service";

export default function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  
  // Simple Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const res = await getAllUsers();
        const list = Array.isArray(res) ? res : res?.data || [];
        setUsers(list);
      } catch (err: any) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }
    
    loadUsers();
  }, []);



  // 🔹 await ব্যবহার করে ব্যান/আনব্যান হ্যান্ডেল করা
  const handleToggleBan = async (user: any) => {
    const targetId = user.id || user._id;
    const newStatus = !user.isBanned;

    try {
      setLoadingId(targetId);
      const res = await toggleBanUser(targetId, newStatus);

      if (res?.success || res?.data || res?.status === 200) {
        setUsers((prev) =>
          prev.map((u) => ((u.id || u._id) === targetId ? { ...u, isBanned: newStatus } : u))
        );
        toast.success(newStatus ? "User Banned successfully!" : "User Unbanned successfully!");
      } else {
        toast.error(res?.message || "Action failed");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to update user status");
    } finally {
      setLoadingId(null);
    }
  };

  // Search Filter
  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <p className="text-sm text-slate-500">
          View, search, and manage account statuses across the platform.
        </p>
      </div>

      {/* Top Bar: Search Input */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search user by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-2 rounded-xl">
          Total Users: {filteredUsers.length}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => {
                  const userId = user.id || user._id;
                  return (
                    <tr key={userId} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 font-medium text-slate-900">
                        <div>{user.name || "N/A"}</div>
                        <div className="text-xs text-slate-400 font-normal">{user.email}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-slate-100 text-slate-700">
                          {user.role || "USER"}
                        </span>
                      </td>
                      <td className="p-4">
                        {user.isBanned ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                            <ShieldAlert className="w-3 h-3" /> Banned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                            <ShieldCheck className="w-3 h-3" /> Active
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          disabled={loadingId === userId}
                          onClick={() => handleToggleBan(user)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition disabled:opacity-50 ${
                            user.isBanned
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100"
                          }`}
                        >
                          {loadingId === userId ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : user.isBanned ? (
                            <>
                              <UserCheck className="w-3.5 h-3.5" /> Unban
                            </>
                          ) : (
                            <>
                              <UserX className="w-3.5 h-3.5" /> Ban User
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40 transition"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40 transition"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}