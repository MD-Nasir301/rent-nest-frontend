import Image from "next/image";
import { Calendar, MapPin, Tag, Clock, AlertCircle } from "lucide-react";
import { getMyRentalRequests } from "@/services/rental.service";
import { RentalRequest } from "@/types/type";
import RentalRequestActions from "../../_components/RentalRequestActions";

export default async function TenantRentalRequestsPage() {
  const res = await getMyRentalRequests();
  const rentalRequests: RentalRequest[] = res?.data || [];

  // Helper for Status Badge Styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "REJECTED":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ACTIVE":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default: // PENDING
        return "bg-amber-100 text-amber-800 border-amber-200";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            My Rental Requests
          </h1>
          <p className="text-sm text-gray-500">
            Track and manage your property rental applications
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-semibold border border-blue-100">
          Total Requests: {rentalRequests.length}
        </div>
      </div>

      {/* Empty State */}
      {rentalRequests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-gray-400 mx-auto" />
          <h3 className="text-base font-semibold text-gray-800">
            No Rental Requests Found
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            You haven't requested to rent any property yet. Browse properties
            and send a request!
          </p>
        </div>
      ) : (
        /* Requests List / Grid */
        <div className="grid grid-cols-1 gap-5">
          {rentalRequests.map((rental) => {
            const property = rental.property;
            const propertyImage =
              property?.images?.[0] ||
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa";

            return (
              <div
                key={rental.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col md:flex-row"
              >
                {/* Property Image */}
                <div className="relative w-full md:w-64 h-48 md:h-auto shrink-0 bg-gray-100">
                  <Image
                    src={propertyImage}
                    alt={property?.title || "Property Image"}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Top Info: Status Badge & Title */}
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h2 className="text-lg font-bold text-gray-900 line-clamp-1">
                        {property?.title || "Rental Property"}
                      </h2>
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusBadge(
                          rental.status,
                        )}`}
                      >
                        {rental.status}
                      </span>
                    </div>

                    {/* Location */}
                    <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      {property?.location || "N/A"}
                    </p>

                    {/* Rental Schedule Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">
                            Duration
                          </span>
                          <span className="font-semibold">
                            {new Date(rental.startDate).toLocaleDateString()} —{" "}
                            {new Date(rental.endDate).toLocaleDateString()}
                          </span>
                          <p className="pt-1 text-violet-600 font-semibold">
                            Total days:{" "}
                            {Math.ceil(
                              (new Date(rental.endDate).getTime() -
                                new Date(rental.startDate).getTime()) /
                                (1000 * 60 * 60 * 24),
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-700">
                        <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="text-gray-400 block text-[10px] uppercase font-bold">
                            Total Rent
                          </span>
                          <span className="font-bold text-emerald-700 text-sm">
                            ৳{rental.totalPrice?.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Info: Applied Date & Action */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Requested on:{" "}
                      {new Date(rental.createdAt).toLocaleDateString()}
                    </span>

                    {/* Conditional Action Button */}
                    <RentalRequestActions
                      rentalId={rental.id}
                      propertyTitle={property?.title || "Rental Property"}
                      status={rental.status}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
