import { redirect } from "next/navigation";

export default function TenantDashboardPage() {
  redirect("/tenant-dashboard/overview");
}