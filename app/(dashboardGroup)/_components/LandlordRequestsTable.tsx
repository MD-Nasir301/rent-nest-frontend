"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { updateRequestStatus } from "@/services/landlord.service";
import { RentalRequest } from "@/types/type";

export default function LandlordRequestsTable({
  initialRequests,
}: {
  initialRequests: RentalRequest[];
}) {
  console.log("Initial Requests:", initialRequests); // for debugging
  const router = useRouter();
  const [requests, setRequests] = useState(initialRequests);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const hndleDateFormat = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleStatusUpdate = async (
    id: string,
    status: "APPROVED" | "REJECTED",
  ) => {
    try {
      setUpdatingId(id);
      const res = await updateRequestStatus(id, status);

      if (res?.success || res?.data) {
        toast.success(`Request ${status.toLowerCase()} successfully!`);
        setRequests((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status } : item)),
        );
        router.refresh();
      } else {
        toast.error(res?.message || "Something went wrong!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to update request status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {requests.length === 0 ? (
        <div className="p-12 text-center text-slate-500">
          No rental requests found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4 pl-6">Property</th>
                <th className="p-4">Tenant</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">End Date</th>
                <th className="p-4">Rent Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
              {requests.map((request: RentalRequest) => (
                <tr
                  key={request.id}
                  className="hover:bg-slate-50/50 transition"
                >
                  <td className="p-4 pl-6 font-semibold text-slate-900">
                    {request.property?.title || "N/A"}
                  </td>
                  <td className="p-4 text-slate-600">
                    {request.tenant?.name || "N/A"} <br />
                  </td>
                  <td className="p-4 font-semibold text-slate-900">
                    <span>{hndleDateFormat(request.startDate)}</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-900">
                    <span>{hndleDateFormat(request.endDate)}</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-900">
                    Tk {request?.totalPrice || 0}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        request.status === "PENDING"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : request.status === "APPROVED"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : request.status === "REJECTED"
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    {request.status === "PENDING" ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          disabled={updatingId === request.id}
                          onClick={() =>
                            handleStatusUpdate(request.id, "APPROVED")
                          }
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 disabled:opacity-50"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Approve
                        </button>
                        <button
                          disabled={updatingId === request.id}
                          onClick={() =>
                            handleStatusUpdate(request.id, "REJECTED")
                          }
                          className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 disabled:opacity-50"
                        >
                          <X className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        No action needed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
