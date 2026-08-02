

import Link from "next/link";
import { Users, Building, Shield, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="px-3">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              ADMIN PANEL
            </span>
          </div>
          <nav className="space-y-1">
            <Link
              href="/admin-dashboard"
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              Overview
            </Link>
            <Link
              href="/admin-dashboard/users"
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition"
            >
              <Users className="w-4 h-4 text-slate-500" />
              User Management
            </Link>
            <Link
              href="/admin-dashboard/moderation"
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition"
            >
              <Building className="w-4 h-4 text-slate-500" />
              Content Moderation
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}