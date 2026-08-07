import { getLandlordProperties } from "@/services/landlord.service";
import LandlordSidebar from "../_components/LandlordSidebar";
import { TProperty } from "@/types/type";
export const dynamic = "force-dynamic";
export default async function LandlordDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await getLandlordProperties();

  const properties : TProperty[] = response?.data || [];
  const pendingRequest = properties
    .flatMap((property) => property.rentals || [])
    .filter((rental) => rental.status === "PENDING").length;


  return (
    <div className="min-h-screen bg-slate-50 flex">
      <LandlordSidebar pending={pendingRequest} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
