import PropertyFilterForm from "@/components/share/PropertyFilterForm";
import { getAllCategories } from "@/services/category.service";
import { getAllProperties } from "@/services/property.service";
import { TProperty } from "@/types/type";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PropertiesPageProps {
  searchParams: Promise<{
    location?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const filters = await searchParams;

  const categoriesRes = await getAllCategories();
  const categories = categoriesRes?.data || [];

  const propertiesRes = await getAllProperties(filters);
  const properties: TProperty[] = propertiesRes?.data || [];

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6 min-h-screen">
      {/* 🔹 Reusable Filter Sidebar */}
      <div>
        <PropertyFilterForm categories={categories} />
      </div>

      {/* 🔹 Property Grid Section */}
      <div className="md:col-span-3 space-y-6">
        {/* Header Count */}
        <div className="flex justify-between items-center bg-white p-4 border rounded-xl shadow-sm">
          <p className="text-sm text-gray-600 font-medium">
            Showing{" "}
            <span className="font-bold text-gray-900">{properties.length}</span>{" "}
            Properties
            {filters?.type ? ` for ${filters.type}` : ""}
            {filters?.location ? ` in ${filters.location}` : ""}
            {filters?.minPrice || filters?.maxPrice
              ? ` within price range ${filters.minPrice || 0} - ${
                  filters.maxPrice || "∞"
                }`
              : ""}
          </p>
        </div>

        {/* Grid List */}
        {properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative h-48 w-full bg-gray-200">
                  <Image
                    src={
                      item.images &&
                      item.images.length > 0 &&
                      item.images[0].startsWith("http")
                        ? item.images[0]
                        : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
                    }
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />

                  {item.category?.name && (
                    <span className="absolute top-3 left-3 text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-sm px-2.5 py-1 rounded-md">
                      {item.category.name}
                    </span>
                  )}

                  <span
                    className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm ${
                      item.isAvailable
                        ? "bg-green-600/90 text-white"
                        : "bg-red-600/90 text-white"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Rented"}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-gray-900 text-base line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>{item.location}</span>
                    </p>

                    {item.amenities && item.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.amenities.slice(0, 2).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200"
                          >
                            ✓ {amenity}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex justify-between items-center border-t pt-3 mt-2">
                    <div>
                      <span className="text-lg font-extrabold text-blue-600">
                        ৳{item.price}
                      </span>
                      <span className="text-[11px] text-gray-400">/mo</span>
                    </div>
                    <Link
                      href={`/properties/${item.id}`}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State UI */
          <div className="text-center py-16 bg-white rounded-xl border space-y-3">
            <p className="text-gray-500 text-base font-medium">
              No properties found matching your search.
            </p>
            <p className="text-xs text-gray-400">
              Try adjusting your filters or search keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
