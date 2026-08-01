"use client";

import { useState } from "react";
import { X, Calculator } from "lucide-react";
import { toast } from "sonner";
import { createRentalRequest } from "@/services/rental.service";
import { calculateTotalRent } from "@/utils/claculateTotalRent";

interface RequestRentModalProps {
  propertyId: string;
  propertyTitle: string;
  price: number; // Monthly Rent
  isOpen: boolean;
  onClose: () => void;
}

export default function RequestRentModal({
  propertyId,
  propertyTitle,
  price,
  isOpen,
  onClose,
}: RequestRentModalProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const calculation = calculateTotalRent(startDate, endDate, price);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!calculation || !calculation.isValid) {
      toast.error("Please select a valid date range!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await createRentalRequest({
        propertyId,
        startDate,
        endDate,
        message,
        totalPrice: calculation.totalPrice,
      });
      console.log("Rental request response:", res);

      toast.success("Rental request submitted successfully!");

      setStartDate("");
      setEndDate("");
      setMessage("");
      onClose();
    } catch (error: any) {
      console.error("Failed to submit request", error);
      // 🔹 Error Toast
      toast.error(
        error?.message || "Failed to submit rental request. Please try again!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-gray-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b bg-gray-50/50">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Request to Rent</h3>
            <p className="text-xs text-gray-500 truncate max-w-[320px]">
              {propertyTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Start Date & End Date Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                required
                min={startDate || new Date().toISOString().split("T")[0]}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          {/* Rental Calculation Summary */}
          {calculation && (
            <>
              {calculation.isValid ? (
                <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Monthly Rate:</span>
                    <span className="font-semibold text-gray-900">
                      ৳{price} / month
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Selected Duration:</span>
                    <span className="font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md">
                      {calculation.totalDays} Days (~{calculation.months}{" "}
                      months)
                    </span>
                  </div>

                  <hr className="border-blue-200 my-1" />

                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-gray-800 flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-blue-600" />
                      Total Estimated Rent:
                    </span>
                    <span className="font-extrabold text-blue-700 text-lg">
                      ৳{calculation.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                  End date must be strictly after the Start date.
                </div>
              )}
            </>
          )}

          {/* Additional Message */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Message to Landlord (Optional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message to the landlord..."
              className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !calculation?.isValid}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Confirm Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
