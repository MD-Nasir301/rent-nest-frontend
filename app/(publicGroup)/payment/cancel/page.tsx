"use client";

import Link from "next/link";
import { XCircle, RefreshCw } from "lucide-react";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-4 border border-gray-100">
        <div className="flex justify-center text-rose-500">
          <XCircle size={64} />
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Payment Failed or Cancelled
        </h2>
        <p className="text-sm text-gray-600">
          Something went wrong with your transaction, or you cancelled the
          payment. No amount was deducted from your account.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/tenant-dashboard/requests"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-2.5 rounded-xl transition-all text-sm"
          >
            <RefreshCw size={16} />
            Try Again
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-xl transition-all text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
