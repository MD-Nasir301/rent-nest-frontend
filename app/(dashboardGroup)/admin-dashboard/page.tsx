import { Users, Building, Clock, CheckCircle } from "lucide-react";
import {
  getAllUsers,
  getAllProperties,
  getAllRentalRequests,
} from "@/services/admin.service";
import { TProperty, RentalRequest } from "@/types/type";

export default async function AdminDashboardPage() {
  let users = [];
  let properties: TProperty[] = [];
  let requests: RentalRequest[] = [];

try {
   
  
    const [usersRes, propertiesRes, requestsRes] = await Promise.all([
      getAllUsers(),
      getAllProperties(),
      getAllRentalRequests(),
    ]);

    users = usersRes?.data || [];
    properties = propertiesRes?.data || [];
    requests = requestsRes?.data || [];

    // কনসোল লগগুলো একবারে ক্লিয়ারভাবে আসবে
    console.log("✅ Admin Dashboard Data Fetched Successfully");
  } catch (err) {
    console.error("Error fetching overview data:", err);
  }

  // Calculating summary metrics
  const totalUsers = users.length;
  const totalProperties = properties.length;
  const pendingRequests = requests.filter((r) => r.status === "PENDING").length;
  const activeBookings = requests.filter((r) => r.status === "ACTIVE").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Admin Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Global overview of platform health and activity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 border border-slate-200 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Users
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {totalUsers}
            </p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 border border-slate-200 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Properties
            </p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {totalProperties}
            </p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Building className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 border border-slate-200 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Pending Requests
            </p>
            <p className="text-2xl font-black text-amber-600 mt-1">
              {pendingRequests}
            </p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 border border-slate-200 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Active Bookings
            </p>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {activeBookings}
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
