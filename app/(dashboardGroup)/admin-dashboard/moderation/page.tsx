"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Search,
  Building,
  FileText,
  ChevronLeft,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import {
  getAllProperties,
  getAllRentalRequests,
} from "@/services/admin.service";
import { TProperty, RentalRequest } from "@/types/type";

export default function ContentModerationPage() {
  const [activeTab, setActiveTab] = useState<"properties" | "requests">(
    "properties",
  );
  const [properties, setProperties] = useState<TProperty[]>([]);
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [propertiesRes, requestRes] = await Promise.all([
          getAllProperties(),
          getAllRentalRequests(),
        ]);

        if (!propertiesRes.success || !requestRes.success) {
          toast.error("Failed to fetch moderation data");
        }

        setProperties(propertiesRes?.data || []);
        setRequests(requestRes?.data || []);
      } catch (err: any) {
        toast.error("Failed to fetch moderation data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Filter Properties
  const filteredProperties = properties.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.location?.toLowerCase().includes(search.toLowerCase()),
  );

  // Filter Requests
  const filteredRequests = requests.filter(
    (r) =>
      r.property?.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.tenant?.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.tenant?.email?.toLowerCase().includes(search.toLowerCase()),
  );

  // Pagination Logic
  const currentList =
    activeTab === "properties" ? filteredProperties : filteredRequests;
  const totalPages = Math.ceil(currentList.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = filteredProperties.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  const paginatedRequests = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleTabChange = (tab: "properties" | "requests") => {
    setActiveTab(tab);
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Content Moderation
        </h1>
        <p className="text-sm text-slate-500">
          Inspect and monitor all property listings and rental requests across
          the platform.
        </p>
      </div>

      {/* Tabs & Search Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Tab Buttons */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => handleTabChange("properties")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "properties"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Building className="w-4 h-4" />
            Properties ({properties.length})
          </button>
          <button
            onClick={() => handleTabChange("requests")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === "requests"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-4 h-4" />
            Rental Requests ({requests.length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder={
              activeTab === "properties"
                ? "Search by title or location..."
                : "Search by property or tenant..."
            }
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {activeTab === "properties" ? (
            /* Properties Table */
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Landlord</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                        Loading properties...
                      </div>
                    </td>
                  </tr>
                ) : paginatedProperties.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      No properties found.
                    </td>
                  </tr>
                ) : (
                  paginatedProperties.map((prop) => (
                    <tr
                      key={prop.id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="p-4 font-medium text-slate-900 max-w-xs truncate">
                        {prop.title}
                      </td>
                      <td className="p-4 text-slate-600">{prop.location}</td>
                      <td className="p-4 font-bold text-slate-900">
                        Tk {prop.price}
                      </td>
                      <td className="p-4 text-slate-600">
                        <div>{prop.landlord?.name || "N/A"}</div>
                        <div className="text-xs text-slate-400">
                          {prop.landlord?.email}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        {prop.isAvailable ? (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                            Available
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                            Rented
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            /* Rental Requests Table */
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-4">Property</th>
                  <th className="p-4">Tenant</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Dates</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                        Loading requests...
                      </div>
                    </td>
                  </tr>
                ) : paginatedRequests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      No rental requests found.
                    </td>
                  </tr>
                ) : (
                  paginatedRequests.map((req) => (
                    <tr
                      key={req.id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="p-4 font-medium text-slate-900 max-w-xs truncate">
                        {req.property?.title || "N/A"}
                      </td>
                      <td className="p-4 text-slate-600">
                        <div>{req.tenant?.name || "N/A"}</div>
                        <div className="text-xs text-slate-400">
                          {req.tenant?.email}
                        </div>
                      </td>
                      <td className="p-4 font-bold text-slate-900">
                        Tk {req.totalPrice}
                      </td>
                      <td className="p-4 text-xs text-slate-500">
                        {new Date(req.startDate).toLocaleDateString()} -{" "}
                        {new Date(req.endDate).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            req.status === "ACTIVE" || req.status === "APPROVED"
                              ? "bg-emerald-100 text-emerald-700"
                              : req.status === "PENDING"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {req.status === "ACTIVE" ||
                          req.status === "APPROVED" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : req.status === "PENDING" ? (
                            <Clock className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
            <span className="text-xs text-slate-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40 transition"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 disabled:opacity-40 transition"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
