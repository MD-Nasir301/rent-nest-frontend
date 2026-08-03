import { getMyPaymentHistory } from "@/services/payment.service";
import { CreditCard, CheckCircle2, Clock, XCircle } from "lucide-react";

export default async function TenantPaymentsPage() {
  const res = await getMyPaymentHistory();
  const payments: any[] = res?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
        <p className="text-sm text-gray-500 mt-1">
          View all your past transaction receipts and billing history
        </p>
      </div>

      {/* Conditional Rendering: Empty State vs Table Data */}
      {payments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-8 sm:p-12 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
            <CreditCard className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-gray-800">
            No Payment Records
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
            You haven't made any payments yet. Once a rental request is approved
            and paid, it will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Transaction / Invoice ID</th>
                  <th className="p-4">Property</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700 font-medium">
                {payments.map((payment: any) => (
                  <tr
                    key={payment._id || payment.id}
                    className="hover:bg-gray-50/50 transition"
                  >
                    {/* Transaction ID */}
                    <td className="p-4 font-mono font-semibold text-gray-900">
                      #{payment.transactionId || payment._id?.slice(-8)}
                    </td>

                    {/* Property Title */}
                    <td className="p-4 font-medium text-gray-800">
                      {payment.property?.title ||
                        payment.rentalRequest?.property?.title ||
                        "N/A"}
                    </td>

                    {/* Amount */}
                    <td className="p-4 font-bold text-gray-900">
                      ৳{payment.amount}
                    </td>

                    {/* Payment Status Badge */}
                    <td className="p-4">
                      {payment.status === "SUCCESS" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-500 text-white ">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Success
                        </span>
                      ) : payment.status === "PENDING" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3.5 h-3.5" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                          <XCircle className="w-3.5 h-3.5" />
                          Failed
                        </span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="p-4 text-gray-500">
                      {new Date(payment.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
