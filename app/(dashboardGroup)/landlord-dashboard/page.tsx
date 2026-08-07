import Link from "next/link";
import { Building2, Clock, CheckCircle2 } from "lucide-react";
import { getLandlordProperties } from "@/services/landlord.service";
import { TProperty } from "@/types/type";
export const dynamic = "force-dynamic";

export default async function LandlordDashboardPage() {
  const propertiesRes = await getLandlordProperties();
  const properties: TProperty[] = propertiesRes.data || [];

  if (!propertiesRes.success) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Failed to fetch landlord properties.</p>
      </div>
    );
  }

  const totalProperties = properties.length;
  const pendingRequest = properties
    .flatMap((property) => property.rentals || [])
    .filter((rental) => rental.status === "PENDING");
  const approvedRequest = properties
    .flatMap((property) => property.rentals || [])
    .filter((rental) => rental.status === "APPROVED");
  const completedRentals = properties
    .flatMap((property) => property.rentals || [])
    .filter((rental) => rental.status === "COMPLETED");
  console.log(completedRentals, "=======================");
  const totalEarning = completedRentals.reduce(
    (sum: number, rental) => sum + (rental.totalPrice || 0),
    0,
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Landlord Dashboard
        </h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          Welcome back! Here is a summary of your property management.
        </p>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Properties */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Properties
            </p>

            <p className="text-2xl font-bold text-slate-900 mt-2">
              {totalProperties}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Requests */}
        <Link
          href="/landlord-dashboard/properties/requests"
          className="hover:scale-[1.02] transition-all"
        >
          {" "}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Pending Requests
              </p>
              <p className="text-2xl font-bold text-amber-600 mt-2">
                {pendingRequest.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Link>

        {/* Approved Rentals */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Approved Rentals
            </p>
            <p className="text-2xl font-bold text-emerald-600 mt-2">
              {approvedRequest.length}
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Total Earnings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Earnings
            </p>
            <p className="text-2xl font-bold text-purple-600 mt-2">
              Tk {totalEarning.toFixed(2)}
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
            <span className="w-6 h-6"> BDT </span>
          </div>
        </div>
      </div>

      {/* Action Banner  */}
      <div className=" from-blue-600 to-indigo-600 rounded-2xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            Manage Incoming Requests
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Check approval status or respond to pending rental requests from
            tenant.
          </p>
        </div>
        <Link
          href="/landlord-dashboard/properties/requests"
          className="bg-white text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap shadow-sm"
        >
          View All Requests
        </Link>
      </div>
    </div>
  );
}
