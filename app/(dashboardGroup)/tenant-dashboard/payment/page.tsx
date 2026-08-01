import { CreditCard } from "lucide-react";

export default function TenantPaymentsPage() {
  const payments: any[] = [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
        <p className="text-sm text-gray-500 mt-1">
          View all your past transaction receipts and billing history
        </p>
      </div>

      {/* Content */}
      {payments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-8 sm:p-12 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <CreditCard className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-gray-800">No Payment Records</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            You haven't made any payments yet. Once a rental request is approved and paid, it will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Table content */}
        </div>
      )}
    </div>
  );
}