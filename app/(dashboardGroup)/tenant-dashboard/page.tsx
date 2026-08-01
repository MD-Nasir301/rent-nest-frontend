import Link from "next/link";
import { LayoutDashboard, FileText, CreditCard, Home } from "lucide-react";

export default function TenantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-5 shrink-0">
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Tenant Panel
          </h2>
        </div>
        <nav className="space-y-1">
          <Link
            href="/tenant-dashboard/overview"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            Overview
          </Link>
          <Link
            href="/tenant-dashboard/requests"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <FileText className="w-4 h-4" />
            My Requests
          </Link>
          <Link
            href="/tenant-dashboard/payment"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <CreditCard className="w-4 h-4" />
            Payment History
          </Link>
          <div className="pt-4 mt-4 border-t border-gray-100">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
