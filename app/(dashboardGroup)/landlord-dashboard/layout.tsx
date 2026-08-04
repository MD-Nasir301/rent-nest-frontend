import LandlordSidebar from "../_components/LandlordSidebar";
export const dynamic = 'force-dynamic';
export default function LandlordDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <LandlordSidebar />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
