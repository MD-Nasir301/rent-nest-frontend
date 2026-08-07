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
    <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-3 md:p-6 flex flex-col justify-between shrink-0 md:min-h-screen">
      <div>
        {/* টাইটেল: শুধু ডেস্কটপে দেখাবে */}
        <div className="hidden md:block mb-8">
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">
            Landlord Panel
          </span>
        </div>

        {/* Mobile Horizontal and Dekstop Vertical */}
        <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3.5 py-2 md:px-4 md:py-3 rounded-xl text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`w-4 h-4 md:w-5 md:h-5 ${
                    isActive ? "text-blue-600" : "text-slate-400"
                  }`}
                />
                <span>{item.label}</span>

                {typeof item.count === "number" && item.count > 0 && (
                  <span
                    className={`inline-flex items-center justify-center min-w-[18px] h-4.5 md:min-w-[20px] md:h-5 px-1.5 text-[10px] md:text-xs font-semibold rounded-full ${
                      isActive
                        ? "bg-blue-600 text-white"
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

 
      <div className="hidden md:block pt-6 border-t border-slate-100">
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