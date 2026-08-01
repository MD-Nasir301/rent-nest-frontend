"use client";

import { useState } from "react";
import { Key } from "lucide-react";
import { TProperty } from "@/types/type";
import RequestRentModal from "./RequestRentModal";

interface PropertySidebarProps {
  property: TProperty;
}

export default function PropertySidebar({ property }: PropertySidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const firstLetter = property.landlord?.name
    ? property.landlord.name.charAt(0).toUpperCase()
    : "L";

  const propertyId = (property as any)._id || property.id || "";

  return (
    <>
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-5 sticky top-6">
        <h3 className="font-bold text-gray-900 border-b pb-3 text-base">
          Landlord Information
        </h3>

        {/* Landlord Profile */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg border">
            {firstLetter}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              {property.landlord?.name || "Unknown Landlord"}
            </p>
            <p className="text-xs text-gray-500">
              {property.landlord?.email || ""}
            </p>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Price Summary */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500 font-medium">Monthly Rent:</span>
          <span className="font-extrabold text-gray-900 text-base">
            ৳{property.price}
          </span>
        </div>

        {/* Request To Rent Button */}
        {property.isAvailable ? (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm transition shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Key className="w-4 h-4" />
            <span>Request to Rent</span>
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-200 text-gray-500 font-bold py-3 rounded-xl text-sm cursor-not-allowed"
          >
            Currently Rented
          </button>
        )}

        <p className="text-[11px] text-gray-400 text-center">
          Clicking request will notify the landlord to review your application.
        </p>
      </div>

      {/* Rental Request Modal */}
      <RequestRentModal
        propertyId={propertyId}
        propertyTitle={property.title}
        price={property.price}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}