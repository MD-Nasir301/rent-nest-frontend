"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-4">
        <div className="flex justify-center text-emerald-500">
          <CheckCircle2 size={64} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Payment Successful!</h2>
        <p className="text-gray-600">
          Thank you! Your booking request has been confirmed and payment was received.
        </p>
        <div className="pt-4">
          <Link
            href="/tenant-dashboard" 
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl transition-all"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}