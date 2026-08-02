"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Edit, Trash2, MapPin, DollarSign, Plus } from "lucide-react";
import { deleteProperty } from "@/services/landlord.service";
import EditPropertyModal from "./EditPropertyModel";


export default function LandlordPropertiesList({
  initialProperties,
}: {
  initialProperties: any[];
}) {
  const router = useRouter();
  const [properties, setProperties] = useState(initialProperties);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 🔹 Edit Modal States
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = (property: any) => {
    setSelectedProperty(property);
    setIsEditOpen(true);
  };

  const handleUpdateSuccess = (updatedData: any) => {
    setProperties((prev) =>
      prev.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      setDeletingId(id);
      const res = await deleteProperty(id);

      if (res?.success || res?.data) {
        toast.success("Property deleted successfully!");
        setProperties((prev) => prev.filter((item) => item.id !== id));
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to delete property");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setDeletingId(null);
    }
  };

  if (properties.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
        <h3 className="text-lg font-semibold text-slate-800">No properties found</h3>
        <p className="text-slate-500 text-sm mt-1 mb-6">
          You haven't listed any properties yet.
        </p>
        <Link
          href="/landlord-dashboard/properties/new"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add Your First Property
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full h-48 bg-slate-100">
                <img
                  src={
                    property.images?.[0] ||
                    property.imageUrl ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                    property.isAvailable !== false
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-500 text-white"
                  }`}
                >
                  {property.isAvailable !== false ? "Available" : "Rented / Unavailable"}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                  {property.title}
                </h3>
                <p className="text-slate-500 text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">{property.location || "N/A"}</span>
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-blue-600 flex items-center">
                    <span>Tk </span> {}
                    {property.rentAmount || property.price || 0}
                    <span className="text-xs font-normal text-slate-400 ml-1">
                      / month
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handleEditClick(property)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-3 py-2 rounded-xl text-xs font-semibold transition"
              >
                <Edit className="w-3.5 h-3.5 text-slate-500" />
                Edit
              </button>
              <button
                disabled={deletingId === property.id}
                onClick={() => handleDelete(property.id)}
                className="inline-flex items-center justify-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-3 py-2 rounded-xl text-xs font-semibold transition disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal Component */}
      <EditPropertyModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        property={selectedProperty}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </>
  );
}