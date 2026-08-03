"use client";

import { useState } from "react";
import ReviewModal from "./ReviewModal"; // আপনার বানানো রিভিউ মডাল
import { toast } from "sonner";
import { createPaymentSession } from "@/services/payment.service";

interface Props {
  rentalId: string;
  propertyTitle: string;
  status: string;
}

export default function RentalRequestActions({
  rentalId,
  propertyTitle,
  status,
}: Props) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const result = await createPaymentSession(rentalId);

      if (result?.success && (result?.data?.paymentUrl || result?.data?.url)) {
        const redirectUrl = result.data.paymentUrl || result.data.url;

        window.location.href = redirectUrl;
      } else {
        toast.error(result?.message || "Payment initiation failed!");
      }
    } catch (error) {
      console.error("Payment Handing Error:", error);
      toast.error("Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {status === "APPROVED" && (
        <button
          onClick={handlePayment}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg font-semibold transition text-xs"
        >
          {loading ? "Processing..." : "Proceed to Pay"}
        </button>
      )}

      {status === "COMPLETED" && (
        <button
          onClick={() => setIsReviewOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg font-semibold transition text-xs"
        >
          Leave a Review
        </button>
      )}

      {/* Review Modal Trigger */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        rentalId={rentalId}
        propertyTitle={propertyTitle}
      />
    </>
  );
}
