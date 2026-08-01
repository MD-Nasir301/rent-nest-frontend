"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, CreditCard, Home } from "lucide-react";

export default function TenantSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Overview",
      href: "/tenant-dashboard/",
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
    <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-5 shrink-0">
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Tenant Panel
        </h2>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-gray-400"}`}
              />
              {item.name}
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <Home className="w-4 h-4 text-gray-400" />
            Back to Home
          </Link>
        </div>
      </nav>
    </aside>
  );
}
