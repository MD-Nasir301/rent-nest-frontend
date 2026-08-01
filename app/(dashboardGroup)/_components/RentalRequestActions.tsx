"use client";

import { useState } from "react";
import ReviewModal from "./ReviewModal"; // আপনার বানানো রিভিউ মডাল

interface Props {
  requestId: string;
  propertyTitle: string;
  status: string;
}

export default function RentalRequestActions({
  requestId,
  propertyTitle,
  status,
}: Props) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  return (
    <>
      {status === "APPROVED" && (
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg font-semibold transition text-xs">
          Proceed to Pay
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
        rentalId={requestId}
        propertyTitle={propertyTitle}
      />
    </>
  );
}
