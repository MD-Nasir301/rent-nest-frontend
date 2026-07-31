import Link from "next/link";
import Image from "next/image";
import { getAllProperties } from "@/services/property.service";
import { getAllCategories } from "@/services/category.service";

// ব্যাকএ্যান্ড ডাটা অবজেক্ট অনুযায়ী ইন্টারফেস
interface Property {
  id: string;
  title: string;
  description?: string;
  location: string;
  price: number;
  amenities?: string[];
  images?: string[];
  isAvailable: boolean;
  category?: {
    name: string;
  };
  landlord?: {
    id: string;
    name: string;
    email: string;
  };
}

export default async function HomePage() {
  const { data: properties } = await getAllProperties();
  const categories = await getAllCategories();

  // প্রথম ৬টি প্রপার্টি ফেভারিট হিসেবে দেখানো
  const featuredProperties: Property[] = properties?.slice(0, 6) || [];

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* 🔹 HERO SECTION WITH SEARCH */}
      <section className="bg-slate-900 text-white py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Find Your Next Rental Home with{" "}
            <span className="text-blue-500">RentNest</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            Browse top listings, connect with verified landlords, and request
            rentals with ease.
          </p>

          {/* 🔍 Quick Search Bar */}
          <form
            action="/properties"
            method="GET"
            className="bg-white p-3 rounded-xl shadow-lg flex flex-col md:flex-row gap-3 max-w-2xl mx-auto text-gray-800"
          >
            <input
              type="text"
              name="search"
              placeholder="Search by location or title..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <select
              name="type"
              className="px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            >
              <option value="">All Categories</option>
              {categories?.data?.map((cate: { id: string; name: string }) => (
                <option key={cate.id} value={cate.name}>
                  {cate.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* 🔹 FEATURED PROPERTIES GRID */}
      <section className="max-w-7xl mx-auto pt-14 px-6">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Properties
            </h2>
            <p className="text-sm text-gray-500">
              Handpicked places for your comfort
            </p>
          </div>
          <Link
            href="/properties"
            className="text-blue-600 hover:underline font-semibold text-sm"
          >
            See All Properties →
          </Link>
        </div>

        {/* 🖼️ Grid */}
        {featuredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((item) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                {/* Image Section & Badges */}
                <div className="relative h-52 w-full bg-gray-200">
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

                  {/* 🏷️ Top Category Badge */}
                  {item.category?.name && (
                    <span className="absolute top-3 left-3 text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-sm px-2.5 py-1 rounded-md">
                      {item.category.name}
                    </span>
                  )}

                  {/* 🟢/🔴 Availability Badge */}
                  <span
                    className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm ${
                      item.isAvailable
                        ? "bg-green-600/90 text-white"
                        : "bg-red-600/90 text-white"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Rented"}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500">📍 {item.location}</p>

                    {/* Amenities List */}
                    {item.amenities && item.amenities.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.amenities.slice(0, 3).map((amenity, idx) => (
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

                  {/* Footer Action */}
                  <div className="flex justify-between items-center border-t pt-3 mt-2">
                    <div>
                      <span className="text-xl font-extrabold text-blue-600">
                        ৳{item.price}
                      </span>
                      <span className="text-xs text-gray-400">/mo</span>
                    </div>
                    <Link
                      href={`/properties/${item.id}`}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border">
            <p className="text-gray-500 text-sm">
              No properties available right now.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
