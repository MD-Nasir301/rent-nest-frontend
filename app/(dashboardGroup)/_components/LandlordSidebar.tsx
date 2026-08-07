"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Inbox,
  Home,
} from "lucide-react";

export default function LandlordSidebar({ pending }: { pending: number }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Overview", href: "/landlord-dashboard", icon: LayoutDashboard },
    {
      label: "My Properties",
      href: "/landlord-dashboard/properties",
      icon: Building2,
    },
    {
      label: "Add Property",
      href: "/landlord-dashboard/properties/new",
      icon: PlusCircle,
    },
    {
      label: "Manage Requests",
      href: "/landlord-dashboard/properties/requests",
      icon: Inbox,
      count: pending,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between hidden md:flex min-h-screen">
      <div>
        <div className="mb-8">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Landlord Panel
          </span>
        </div>

        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const count = item.count;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-slate-400"}`}
                />
                {item.label}

                {typeof item.count === "number" && item.count > 0 && (
                  <span
                    className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold rounded-full ${
                      isActive
                        ? "bg-white text-blue-600" 
                        : "bg-red-500 text-white" 
                    }`}
                  >
                    {item.count > 99 ? "99+" : item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-100">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
        >
          <Home className="w-5 h-5 text-slate-400" />
          Back to Home
        </Link>
      </div>
    </aside>
  );
}
