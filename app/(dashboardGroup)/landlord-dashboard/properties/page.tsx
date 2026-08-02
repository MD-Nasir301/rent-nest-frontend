import Link from "next/link";
import { Plus } from "lucide-react";
import { getLandlordProperties } from "@/services/landlord.service";
import LandlordPropertiesCard from "../../_components/LandlordPropertiesCard";

export default async function LandlordMyPropertiesPage() {
  const response = await getLandlordProperties();
  const properties = response?.data || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            My Properties
          </h1>
          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Manage your listed properties, update details, or delete listings.
          </p>
        </div>
        <Link
          href="/landlord-dashboard/properties/new"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add New Property
        </Link>
      </div>

      {/* Client Component */}
      <LandlordPropertiesCard initialProperties={properties} />
    </div>
  );
}
