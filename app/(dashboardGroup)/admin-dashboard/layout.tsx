import Link from "next/link";
import { Users, Building, LayoutDashboard } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50/50">
      {/* Sidebar / Top Navigation Bar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-4 md:p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-4 md:space-y-6">
          <div className="px-1 md:px-3 hidden md:block">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              ADMIN PANEL
            </span>
          </div>
          
          <nav className="flex flex-row md:flex-col gap-1.5 md:space-y-1 overflow-x-auto no-scrollbar">
            <Link
              href="/admin-dashboard"
              className="flex items-center gap-2.5 md:gap-3 px-3.5 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition whitespace-nowrap"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-500" />
              Overview
            </Link>
            <Link
              href="/admin-dashboard/users"
              className="flex items-center gap-2.5 md:gap-3 px-3.5 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition whitespace-nowrap"
            >
              <Users className="w-4 h-4 text-slate-500" />
              User Management
            </Link>
            <Link
              href="/admin-dashboard/moderation"
              className="flex items-center gap-2.5 md:gap-3 px-3.5 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition whitespace-nowrap"
            >
              <Building className="w-4 h-4 text-slate-500" />
              Content Moderation
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}