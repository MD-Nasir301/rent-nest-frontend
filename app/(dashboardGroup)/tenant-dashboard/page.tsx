import { getMyRentalRequests } from "@/services/rental.service";
import { FileText, CheckCircle2, Clock, Ban } from "lucide-react";
import Link from "next/link";

export default async function TenantOverviewPage() {
  const res = await getMyRentalRequests();
  const requests: any[] = res?.data || [];

  const total = requests.length;
  const pending = requests.filter((r) => r.status === "PENDING").length;
  const approved = requests.filter((r) => r.status === "APPROVED").length;
  const rejected = requests.filter((r) => r.status === "REJECTED").length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 sm:px-6 mt-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tenant Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back! Here is a summary of your rental activity.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase">
              Total Requests
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{total}</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase">
              Pending
            </p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{pending}</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase">
              Approved
            </p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {approved}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase">
              Rejected
            </p>
            <p className="text-2xl font-bold text-rose-600 mt-1">{rejected}</p>
          </div>
          <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
            <Ban className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
        <div>
          <h2 className="text-lg font-bold">Manage Your Requests</h2>
          <p className="text-xs text-blue-100 mt-1">
            Check approval status or proceed with payments for your requests.
          </p>
        </div>
        <Link
          href="/tenant-dashboard/requests"
          className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
        >
          View All Requests
        </Link>
      </div>
    </div>
  );
}
