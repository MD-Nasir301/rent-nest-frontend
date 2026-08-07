"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, CreditCard, Home } from "lucide-react";

export default function TenantSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Overview",
      href: "/tenant-dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Requests",
      href: "/tenant-dashboard/requests",
      icon: FileText,
    },
    {
      name: "Payment History",
      href: "/tenant-dashboard/payment",
      icon: CreditCard,
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-3 md:p-5 shrink-0 flex flex-col justify-between md:min-h-screen">
      <div>
        {/* Header Title: Only visible on desktop */}
        <div className="hidden md:block mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Tenant Panel
          </h2>
        </div>

        {/* 📱 Mobile Horizontal Row / 💻 Desktop Vertical Column */}
        <nav className="flex flex-row md:flex-col gap-1.5 md:space-y-1 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 md:gap-3 px-3.5 md:px-3 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition whitespace-nowrap ${
                  isActive
                    ? "bg-blue-50 text-blue-600 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Back to Home Link: Desktop Layout Bottom Section */}
      <div className="hidden md:block pt-4 mt-4 border-t border-gray-100">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
        >
          <Home className="w-4 h-4 text-gray-400" />
          Back to Home
        </Link>
      </div>
    </aside>
  );
}