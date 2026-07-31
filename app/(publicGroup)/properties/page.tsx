"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties`,
        );
        const data = await res.json();
        setProperties(data?.data || data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Simple real-time client filter
  const filtered = properties.filter((p: any) => {
    const matchesSearch =
      p.location?.toLowerCase().includes(search.toLowerCase()) ||
      p.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? p.propertyType === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* 🔹 Filter Sidebar */}
      <div className="border p-4 rounded-xl bg-white space-y-4 h-fit">
        <h2 className="font-bold text-lg border-b pb-2">Filter Properties</h2>
        <div>
          <label className="text-xs font-semibold text-gray-600">
            Location / Title
          </label>
          <input
            type="text"
            placeholder="Search location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border p-2 rounded text-sm mt-1"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600">
            Property Type
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded text-sm mt-1"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Sublet">Sublet</option>
          </select>
        </div>
      </div>

      {/* 🔹 Property Grid */}
      <div className="md:col-span-3">
        {loading ? (
          <p className="text-center py-10">Loading properties...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item: any) => (
              <div
                key={item._id}
                className="border rounded-xl overflow-hidden bg-white shadow-sm"
              >
                <div className="relative h-40 w-full bg-gray-100">
                  <Image
                    src={item.images?.[0] || "/placeholder.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-gray-500">📍 {item.location}</p>
                  <p className="font-bold text-blue-600 text-sm">
                    ৳{item.price}/mo
                  </p>
                  <Link
                    href={`/properties/${item._id}`}
                    className="block text-center bg-slate-900 text-white text-xs py-2 rounded"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
