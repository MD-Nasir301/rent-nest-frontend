import { getSingleProperty } from "@/services/property.service";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TProperty } from "@/types/type";
import PropertySidebar from "../../_components/PropertySidebar"; // 👈 সঠিক কম্পোনেন্ট ইমপোর্ট করা হয়েছে

interface PropertyDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsPageProps) {
  const { id } = await params;

  const res = await getSingleProperty(id);
  const property: TProperty | null = res?.data || null;

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto p-12 text-center my-10 bg-white rounded-xl border">
        <h2 className="text-2xl font-bold text-gray-800">
          Property Not Found!
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          The property you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/properties"
          className="mt-5 inline-block bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Back to All Properties
        </Link>
      </div>
    );
  }

  const mainImage =
    property.images &&
    property.images.length > 0 &&
    property.images[0].startsWith("http")
      ? property.images[0]
      : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800";

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 min-h-screen">
      {/* 🔹 Back Button */}
      <Link
        href="/properties"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-blue-600 transition"
      >
        ← Back to properties
      </Link>

      {/* 🔹 Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              {property.title}
            </h1>
            {property.category?.name && (
              <span className="text-xs font-semibold bg-gray-100 border text-gray-700 px-2.5 py-1 rounded-md">
                {property.category.name}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4 text-gray-400" /> {property.location}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <span className="text-2xl font-black text-blue-600">
              ৳{property.price}
            </span>
            <span className="text-xs text-gray-500"> / month</span>
          </div>
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${
              property.isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {property.isAvailable ? "Available" : "Rented"}
          </span>
        </div>
      </div>

      {/* 🔹 Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[350px] md:h-[420px]">
        {/* Main Big Image */}
        <div className="relative md:col-span-2 h-full rounded-2xl overflow-hidden bg-gray-100 border">
          <Image
            src={mainImage}
            alt={property.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover"
          />
        </div>

        {/* Small Additional Images */}
        <div className="hidden md:grid grid-rows-2 gap-4 h-full">
          {property.images && property.images.length > 1 ? (
            property.images.slice(1, 3).map((img, index) => (
              <div
                key={index}
                className="relative h-full rounded-2xl overflow-hidden bg-gray-100 border"
              >
                <Image
                  src={img}
                  alt="Property Image"
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            ))
          ) : (
            <>
              <div className="relative h-full rounded-2xl overflow-hidden bg-gray-100 border">
                <Image
                  src={mainImage}
                  alt="Property Preview"
                  fill
                  sizes="33vw"
                  className="object-cover opacity-80"
                />
              </div>
              <div className="relative h-full rounded-2xl overflow-hidden bg-gray-100 border flex items-center justify-center bg-gray-50 text-gray-400 text-xs font-semibold">
                No more photos
              </div>
            </>
          )}
        </div>
      </div>

      {/* 🔹 Details & Request Sidebar Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {/* Left Column: Description & Amenities */}
        <div className="md:col-span-2 space-y-8">
          {/* Overview / Description */}
          <div className="space-y-3 bg-white p-6 border rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
              About this property
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
              {property.description ||
                "No description provided for this property."}
            </p>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="space-y-4 bg-white p-6 border rounded-2xl shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 border-b pb-2">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 border border-gray-100 p-2.5 rounded-xl text-xs text-gray-700 font-medium"
                  >
                    <span className="text-green-600 font-bold">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Dynamic Client Component Sidebar */}
        <div className="space-y-6">
          <PropertySidebar property={property} />
        </div>
      </div>
    </div>
  );
}
