import LandlordRequestsTable from "@/app/(dashboardGroup)/_components/LandlordRequestsTable";
import { getRentalRequests } from "@/services/landlord.service";

export default async function LandlordRequestsPage() {
  const response = await getRentalRequests();
  const requests = response?.data || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Manage Rental Requests
        </h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          Review and accept or reject rental applications from prospective
          tenants.
        </p>
      </div>

      {/* Client Component Table */}
      <LandlordRequestsTable initialRequests={requests} />
    </div>
  );
}
